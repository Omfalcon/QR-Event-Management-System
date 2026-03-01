"""Logs retrieval service"""
from flask import request, jsonify, send_file
import tempfile
import pytz
from config import scan_logs, participants, admin_scan_counts

def format_to_ist(dt, fmt="%I:%M %p"):
    """Convert UTC/naive datetime to IST string"""
    if dt.tzinfo is None:
        dt = pytz.UTC.localize(dt)
    return dt.astimezone(pytz.timezone('Asia/Kolkata')).strftime(fmt)

def get_logs():
    """Returns scan logs with user data (Optimized)"""
    day = request.args.get("day", type=int)
    limit = request.args.get("limit", default=100, type=int)

    if not day:
        return jsonify({"error": "day is required"}), 400

    # Use Aggregation to join users and avoid N+1 queries
    pipeline = [
        {"$match": {"day": day}},
        {"$sort": {"scanned_at": -1}},
        {
            "$lookup": {
                "from": "participants",
                "localField": "uuid",
                "foreignField": "uuid",
                "as": "user_info"
            }
        },
        {"$unwind": {"path": "$user_info", "preserveNullAndEmptyArrays": True}}
    ]

    records = list(scan_logs.aggregate(pipeline))

    attendance = []
    food = []

    for r in records:
        participant = r.get("user_info", {})
        
        name = participant.get("name", "Unknown") if participant else "Unknown"
        phone = participant.get("phone", "") if participant else ""
        
        # Format time
        dt = r["scanned_at"]
        if dt.tzinfo is None:
            dt = pytz.UTC.localize(dt)
        scanned_time = dt.astimezone(pytz.timezone('Asia/Kolkata')).strftime("%I:%M %p")

        api_item = {
            "uuid": r["uuid"],
            "name": name,
            "phone": phone,
            "time": scanned_time,
            "status": "valid"
        }

        if r["type"] == "attendance":
            attendance.append({
                **api_item,
                "room": r.get("room")
            })
        else:
            food.append({
                **api_item,
                "slot": r["type"]
            })

    return jsonify({
        "day": day,
        "attendance": attendance,
        "food": food
    }), 200


def download_logs():
    """Downloads all scan logs as a formatted Excel file.

    Sheet layout:
      - One sheet per (day, room) for attendance logs       → "Day1 - MAC", "Day1 - Room 1005", …
      - One sheet per (day, slot) for food/beverage logs    → "Day1 - Morning Tea", …
      - A "Summary" sheet at the end with total counts
    """
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.utils import get_column_letter
    import os

    # ── helpers ────────────────────────────────────────────────────────────────
    ROOM_LABELS = {
        "Mac":        "MAC",
        "1005":       "Room 1005",
        "1006":       "Room 1006",
        "Trust Room": "Trust Room",
        "AB1":        "AB1",
        "BUZZ":       "BUZZ",
    }
    FOOD_LABELS = {
        "morning-tea":   "Morning Tea",
        "lunch":         "Lunch",
        "afternoon-tea": "Afternoon Tea",
    }
    DAYS = [1, 2, 3]

    def room_label(raw):
        if raw is None:
            return "Unknown Room"
        if raw in ROOM_LABELS:
            return ROOM_LABELS[raw]
        raw_str = str(raw)
        if raw_str in ROOM_LABELS:
            return ROOM_LABELS[raw_str]
        if raw_str.startswith("Room"):
            return raw_str
        return f"Room {raw_str}"

    def thin_border():
        s = Side(style="thin", color="CCCCCC")
        return Border(left=s, right=s, top=s, bottom=s)

    HEADER_FILL  = PatternFill("solid", fgColor="1E3A5F")   # dark navy
    TOTAL_FILL   = PatternFill("solid", fgColor="E8F0FE")   # light blue
    ALT_ROW_FILL = PatternFill("solid", fgColor="F7F9FC")   # very light grey

    def style_header_row(ws, col_count):
        for col in range(1, col_count + 1):
            cell = ws.cell(row=1, column=col)
            cell.font      = Font(bold=True, color="FFFFFF", size=11)
            cell.fill      = HEADER_FILL
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
            cell.border    = thin_border()
        ws.row_dimensions[1].height = 20

    def style_data_row(ws, row_idx, col_count, is_alt):
        for col in range(1, col_count + 1):
            cell = ws.cell(row=row_idx, column=col)
            cell.alignment = Alignment(vertical="center")
            cell.border    = thin_border()
            if is_alt:
                cell.fill = ALT_ROW_FILL

    def style_total_row(ws, row_idx, col_count):
        for col in range(1, col_count + 1):
            cell = ws.cell(row=row_idx, column=col)
            cell.font      = Font(bold=True, size=11)
            cell.fill      = TOTAL_FILL
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border    = thin_border()
        ws.row_dimensions[row_idx].height = 18

    def auto_width(ws, headers):
        for idx, h in enumerate(headers, 1):
            col_letter = get_column_letter(idx)
            max_len = len(str(h))
            for row in ws.iter_rows(min_row=2, min_col=idx, max_col=idx):
                for cell in row:
                    try:
                        max_len = max(max_len, len(str(cell.value or "")))
                    except Exception:
                        pass
            ws.column_dimensions[col_letter].width = min(max_len + 4, 40)

    # ── fetch & build participant lookup ──────────────────────────────────────
    raw_logs = list(scan_logs.find({}).sort("scanned_at", 1))

    uuid_set  = {r["uuid"] for r in raw_logs}
    part_map  = {}
    for p in participants.find({"uuid": {"$in": list(uuid_set)}}):
        part_map[p["uuid"]] = p

    def enrich(r):
        p = part_map.get(r["uuid"], {})
        scanned_time = format_to_ist(r["scanned_at"], "%Y-%m-%d %I:%M %p")
        return {
            "name":  p.get("name",  "Unknown"),
            "email": p.get("email", ""),
            "phone": p.get("phone", ""),
            "type":  r["type"],
            "day":   r.get("day"),
            "time":  scanned_time,
            "room":  r.get("room"),
        }

    enriched = [enrich(r) for r in raw_logs]

    # bucket by (day, kind, key)
    attendance_buckets = {}   # (day, room_raw) → [row, …]
    food_buckets       = {}   # (day, slot)     → [row, …]

    for e in enriched:
        day = e["day"]
        if e["type"] == "attendance":
            key = (day, e["room"])
            attendance_buckets.setdefault(key, []).append(e)
        elif e["type"] in FOOD_LABELS:
            key = (day, e["type"])
            food_buckets.setdefault(key, []).append(e)

    # ── build workbook ────────────────────────────────────────────────────────
    wb = openpyxl.Workbook()
    wb.remove(wb.active)   # remove default blank sheet

    ATT_HEADERS  = ["#", "Name", "Email", "Phone", "Time"]
    FOOD_HEADERS = ["#", "Name", "Email", "Phone", "Time"]
    summary_rows = []   # (sheet_name, count)

    # ── attendance sheets ─────────────────────────────────────────────────────
    room_keys_seen = set()
    for day in DAYS:
        # collect distinct rooms for this day (preserve logical order)
        ordered_rooms = ["Mac", "1005", "1006", "Trust Room", "AB1", "BUZZ"]
        for room_raw in ordered_rooms:
            key = (day, room_raw)
            rows = attendance_buckets.get(key, [])
            if not rows:
                continue
            r_label   = room_label(room_raw)
            sheet_name = f"Day{day} - {r_label}"[:31]   # Excel 31-char limit
            ws = wb.create_sheet(title=sheet_name)

            ws.append(ATT_HEADERS)
            style_header_row(ws, len(ATT_HEADERS))

            for i, e in enumerate(rows, 1):
                ws.append([i, e["name"], e["email"], e["phone"], e["time"]])
                style_data_row(ws, i + 1, len(ATT_HEADERS), i % 2 == 0)

            # totals row
            total_row = ws.max_row + 1
            ws.cell(total_row, 1, "TOTAL")
            ws.cell(total_row, 2, len(rows))
            style_total_row(ws, total_row, len(ATT_HEADERS))
            ws.freeze_panes = "A2"
            auto_width(ws, ATT_HEADERS)
            summary_rows.append((sheet_name, len(rows)))

    # ── food sheets ───────────────────────────────────────────────────────────
    for day in DAYS:
        for slot_raw, slot_label in FOOD_LABELS.items():
            key  = (day, slot_raw)
            rows = food_buckets.get(key, [])
            if not rows:
                continue
            sheet_name = f"Day{day} - {slot_label}"[:31]
            ws = wb.create_sheet(title=sheet_name)

            ws.append(FOOD_HEADERS)
            style_header_row(ws, len(FOOD_HEADERS))

            for i, e in enumerate(rows, 1):
                ws.append([i, e["name"], e["email"], e["phone"], e["time"]])
                style_data_row(ws, i + 1, len(FOOD_HEADERS), i % 2 == 0)

            total_row = ws.max_row + 1
            ws.cell(total_row, 1, "TOTAL")
            ws.cell(total_row, 2, len(rows))
            style_total_row(ws, total_row, len(FOOD_HEADERS))
            ws.freeze_panes = "A2"
            auto_width(ws, FOOD_HEADERS)
            summary_rows.append((sheet_name, len(rows)))

    # ── Summary sheet ─────────────────────────────────────────────────────────
    ws_sum = wb.create_sheet(title="Summary", index=0)   # put first
    SUM_HEADERS = ["Sheet / Category", "Total Count"]
    ws_sum.append(SUM_HEADERS)
    style_header_row(ws_sum, len(SUM_HEADERS))

    grand_total = 0
    for i, (name, cnt) in enumerate(summary_rows, 1):
        ws_sum.append([name, cnt])
        style_data_row(ws_sum, i + 1, len(SUM_HEADERS), i % 2 == 0)
        grand_total += cnt

    total_row = ws_sum.max_row + 1
    ws_sum.cell(total_row, 1, "GRAND TOTAL")
    ws_sum.cell(total_row, 2, grand_total)
    style_total_row(ws_sum, total_row, len(SUM_HEADERS))
    ws_sum.freeze_panes = "A2"
    auto_width(ws_sum, SUM_HEADERS)

    # ── write to temp file & send ─────────────────────────────────────────────
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")
    tmp.close()
    wb.save(tmp.name)

    return send_file(
        tmp.name,
        as_attachment=True,
        download_name="Event_Logs.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


def get_admin_counts():
    """Returns admin scan counts grouped by day and slot type"""
    records = list(admin_scan_counts.find({}, {"_id": 0}))

    # Group into { "1": { "morning-tea": 3, "lunch": 5 }, "2": {...}, "3": {...} }
    result = {}
    for r in records:
        day_key = str(r.get("day", ""))
        slot_type = r.get("type", "")
        count = r.get("count", 0)
        if day_key not in result:
            result[day_key] = {}
        result[day_key][slot_type] = count

    return jsonify({"admin_counts": result}), 200
