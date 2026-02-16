from config import keynotes
from keynotes_service import seed_keynotes_db

# Static data (copied from frontend-react/src/pages/Keynotes.jsx)
schedule_data = {
    1: {
        "title": "Day 1: Thursday, 26th Feb 2026",
        "rooms": {
            1: {
                "title": "Energy & Environment",
                "location": "Room 1005",
                "chair": "Dr. Nilanjana Banerjee",
                "coChair": "Dr. Bikarama Prasad Yadav",
                "live": {
                    "speaker": "Dr. Sangeeta Semwal",
                    "topic": "Scientist, MeitY",
                    "image": "https://via.placeholder.com/150",
                },
                "sessions": [
                    { "name": "Dr. Sangeeta Semwal", "topic": "Invited Talk", "id": "IT-01", "time": "02:00 PM", "status": "Upcoming", "active": True },
                    { "name": "Dr. Brijesh Kumar Yadav", "topic": "Invited Talk", "id": "IT-02", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Dr. Prabhat Dwivedi", "topic": "Invited Talk", "id": "IT-03", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Dr. Lokesh Tribedi", "topic": "Invited Talk", "id": "IT-04", "time": "03:30 PM", "status": None, "active": False },
                    { "name": "Oral Presentation", "topic": "OP 3", "id": "OP-03", "time": "03:45 PM", "status": None, "active": False }
                ]
            },
            2: {
                "title": "Advanced Materials",
                "location": "Room 1006",
                "chair": "Dr. Piyush Kuchhal",
                "coChair": "Dr. Ranjeet Brijpuriya",
                "live": {
                    "speaker": "Dr. Ashish Swaroop",
                    "topic": "IIT Mandi",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Dr. Ashish Swaroop", "topic": "Invited Talk", "id": "IT-05", "time": "02:00 PM", "status": "Upcoming", "active": True },
                    { "name": "Dr. Shihabudheen M. Maliyekkal", "topic": "Invited Talk", "id": "IT-06", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Invited Talk", "topic": "TBA", "id": "IT-07", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Oral Presentation", "topic": "OP 2", "id": "OP-02", "time": "03:30 PM", "status": None, "active": False },
                    { "name": "Oral Presentation", "topic": "OP 4", "id": "OP-04", "time": "03:45 PM", "status": None, "active": False }
                ]
            },
            3: {
                "title": "SEED",
                "location": "AB1 Board Room",
                "chair": "Dr. Vikas Saxena, Dr. Mukesh Kumar",
                "coChair": "Dr. Vikram Kumar",
                "live": {
                    "speaker": "Faculty Session",
                    "topic": "Interactive Session",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-01", "time": "02:00 PM", "status": "Ongoing", "active": True },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-02", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-03", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-04", "time": "03:30 PM", "status": None, "active": False }
                ]
            },
            4: {
                "title": "PhD Flash Talks - BUZZ",
                "location": "Europe, MDC",
                "chair": "Dr. Meenakshi Munshi, Dr. Kanchan Bahukhandi",
                "coChair": "Dr. Siddharth Jain, Dr. K. Asokan",
                "live": {
                    "speaker": "Ph.D. Spotlight",
                    "topic": "Research Showcase",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Ph.D. Spotlight Session", "topic": "Spotlight Presentations", "id": "PHD-01", "time": "02:00 PM", "status": "Upcoming", "active": True },
                    { "name": "Ph.D. Spotlight Session", "topic": "Spotlight Presentations", "id": "PHD-02", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-03", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-04", "time": "03:30 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-05", "time": "03:45 PM", "status": None, "active": False }
                ]
            }
        }
    },
    2: {
        "title": "Day 2: Friday, 27th Feb 2026",
        "rooms": {
            1: {
                "title": "Healthcare & AI",
                "location": "Room 1005",
                "chair": "Dr. Kuldeep Kumar Roy",
                "coChair": "Dr. Tanupriya Chaudhary",
                "live": {
                    "speaker": "Dr. Sudhir Nambiar",
                    "topic": "Invited Talk",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Dr. Sudhir Nambiar", "topic": "Invited Talk", "id": "IT-08", "time": "10:30 AM", "status": "Upcoming", "active": True },
                    { "name": "Dr. Soodkhet Pojprapai", "topic": "Invited Talk", "id": "IT-09", "time": "11:00 AM", "status": None, "active": False },
                    { "name": "Mr. Sujan Sekhar", "topic": "Invited Talk", "id": "IT-10", "time": "12:00 PM", "status": None, "active": False },
                    { "name": "Mr. Prateek Kanaujia", "topic": "Invited Talk", "id": "IT-11", "time": "12:30 PM", "status": None, "active": False },
                    { "name": "Dr. Kushboo Bharat", "topic": "Invited Talk", "id": "IT-12", "time": "02:00 PM", "status": None, "active": False },
                    { "name": "Oral Presentation", "topic": "OP", "id": "OP-05", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Oral Presentation", "topic": "OP", "id": "OP-06", "time": "03:00 PM", "status": None, "active": False }
                ]
            },
            2: {
                "title": "Online Sessions",
                "location": "Trust Hubble",
                "chair": "TBA",
                "coChair": "TBA",
                "live": {
                    "speaker": "Dr. Uday Saxena",
                    "topic": "Invited Talk",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Dr. Uday Saxena", "topic": "Invited Talk", "id": "IT-13", "time": "10:30 AM", "status": "Upcoming", "active": True },
                    { "name": "Dr. Arvind Bansal", "topic": "Invited Talk", "id": "IT-14", "time": "11:00 AM", "status": None, "active": False },
                    { "name": "Invited Talk", "topic": "TBA", "id": "IT-15", "time": "12:00 PM", "status": None, "active": False },
                    { "name": "Invited Talk", "topic": "TBA", "id": "IT-16", "time": "12:30 PM", "status": None, "active": False },
                    { "name": "Dr. Anna Slater", "topic": "Invited Talk", "id": "IT-17", "time": "02:00 PM", "status": None, "active": False },
                    { "name": "Invited Talk", "topic": "Top 2%", "id": "IT-18", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Invited Talk", "topic": "Top 2%", "id": "IT-19", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Dr. Ajeet Kaushik", "topic": "Invited Talk", "id": "IT-20", "time": "03:30 PM", "status": None, "active": False }
                ]
            },
            3: {
                "title": "SEED",
                "location": "AB1 Board Room",
                "chair": "Dr. Vikas Saxena, Dr. Mukesh Kumar",
                "coChair": "Dr. Vikram Kumar",
                "live": {
                    "speaker": "Faculty Session",
                    "topic": "Interactive Session",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-05", "time": "10:30 AM", "status": "Ongoing", "active": True },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-06", "time": "11:00 AM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-07", "time": "12:00 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-08", "time": "12:30 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-09", "time": "02:00 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-10", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-11", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Faculty Session", "topic": "Roundtable Discussion", "id": "FAC-12", "time": "03:30 PM", "status": None, "active": False }
                ]
            },
            4: {
                "title": "PhD Flash Talks - BUZZ",
                "location": "Europe, MDC",
                "chair": "Dr. K Asokan, Dr. Himanshi, Dr. Tridib Sinha",
                "coChair": "Dr. Meenakshi Munshi, Dr. S. Manna",
                "live": {
                    "speaker": "Ph.D. Scholar Session",
                    "topic": "Scholar Presentations",
                    "image": "https://via.placeholder.com/150"
                },
                "sessions": [
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-06", "time": "10:30 AM", "status": "Upcoming", "active": True },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-07", "time": "11:00 AM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-08", "time": "12:00 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-09", "time": "12:30 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-10", "time": "02:00 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-11", "time": "02:30 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-12", "time": "03:00 PM", "status": None, "active": False },
                    { "name": "Ph.D. Scholar Session", "topic": "Scholar Presentations", "id": "PHD-13", "time": "03:30 PM", "status": None, "active": False }
                ]
            }
        }
    }
}

print("🌱 Seeding Keynotes DB...")
seed_keynotes_db(schedule_data)
print("🚀 Done!")
