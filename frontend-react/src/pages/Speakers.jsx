import { useNavigate } from 'react-router-dom';

export default function Speakers() {
    const navigate = useNavigate();

    const speakers = [
        {
            id: 1,
            name: "Dr. LS Shashidhara",
            university: "NCBS-TIFR",
            title: "Director",
            isIcon: true
        },
        {
            id: 2,
            name: "Dr. SK Sopory",
            university: "Jawaharlal Nehru University",
            title: "Former Vice Chancellor",
            isIcon: true
        },
        {
            id: 3,
            name: "Dr. Gobardhan Das",
            university: "IISER Bhopal",
            title: "Director",
            isIcon: true
        },
        {
            id: 4,
            name: "Dr. Sangeeta Semwal",
            university: "Ministry of Electronics and IT, Govt. of India",
            title: "Scientist",
            isIcon: true
        },
        {
            id: 5,
            name: "Dr. Ashish Swaroop",
            university: "IIT Mandi",
            title: "Professor, School of Computing",
            isIcon: true
        },
        {
            id: 7,
            name: "Dr. Brijesh Kumar Yadav",
            university: "IIT Roorkee",
            title: "Professor, Dept. of Hydrology",
            isIcon: true
        },
        {
            id: 8,
            name: "Dr. Shihabudheen M. Maliyekkal",
            university: "IIT Tirupati",
            title: "Professor, Civil & Env. Engineering",
            isIcon: true
        },
        {
            id: 9,
            name: "Dr. Sudhir Nambiar",
            university: "Syngene International Limited",
            title: "CMC Head Small Molecules",
            isIcon: true
        },
        {
            id: 10,
            name: "Dr. Uday Saxena",
            university: "Dr Reddy Institute, Hyderabad",
            title: "Subject Expert: Drug Discovery",
            isIcon: true
        },
        {
            id: 11,
            name: "Dr. Vivek Polshettiwar",
            university: "TIFR Mumbai",
            title: "Professor & Bhatnagar Awardee",
            isIcon: true
        },
        {
            id: 12,
            name: "Dr. Arvind Bansal",
            university: "NIPER Mohali",
            title: "Professor, Pharmaceutics",
            isIcon: true
        },
        {
            id: 13,
            name: "Mr. Sujan Sekhar",
            university: "American Chemical Society",
            title: "Manager, Business Development",
            isIcon: true
        },
        {
            id: 14,
            name: "Mr. Prateek Kanaujia",
            university: "XLSCOUT",
            title: "GTM Consultant",
            isIcon: true
        },
        {
            id: 16,
            name: "Dr. Prabhat Dwivedi",
            university: "IIT Kanpur",
            title: "Principal Scientific Officer",
            isIcon: true
        },
        {
            id: 17,
            name: "Dr. Anna Slater",
            university: "University of Liverpool, UK",
            title: "Professor of Chemistry",
            isIcon: true
        },
        {
            id: 18,
            name: "Dr. Soodkhet Pojprapai",
            university: "Suranaree University of Technology, Thailand",
            title: "Professor",
            isIcon: true
        },
        {
            id: 19,
            name: "Dr. Ajeet Kaushik",
            university: "Florida Polytechnic University, USA",
            title: "Associate Professor of Chemistry",
            isIcon: true
        }
    ];

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark">
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center cursor-pointer" onClick={() => navigate(-1)}>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Expert Speakers</h2>
                        <p className="text-[10px] text-primary font-bold tracking-widest uppercase">IYRC 4th Edition</p>
                    </div>
                    <div className="flex w-12 items-center justify-end">
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#111418] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 bg-white dark:bg-background-dark">
                <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                        <div className="text-[#617289] dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-full placeholder:text-[#617289] dark:placeholder:text-gray-500 px-4 pl-2 text-base font-normal leading-normal" placeholder="Search by name, university or field" />
                    </div>
                </label>
            </div>

            <div className="px-4 pt-4 pb-2 bg-white dark:bg-background-dark">
                <h3 className="text-xs font-semibold text-[#617289] dark:text-gray-400 uppercase tracking-wider">All Speakers</h3>
            </div>

            <div className="flex flex-col bg-white dark:bg-background-dark pb-32">
                {speakers.map((speaker) => (
                    <div key={speaker.id} className="flex gap-4 bg-white dark:bg-background-dark px-4 py-4 justify-between border-b border-gray-50 dark:border-gray-800/50">
                        <div className="flex items-center gap-4">
                            <div className="shrink-0 rounded-full h-[64px] w-[64px] border-2 border-primary/10 overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                {speaker.isIcon ? (
                                    <span className="material-symbols-outlined text-gray-400 text-3xl">person</span>
                                ) : (
                                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${speaker.img}")` }}></div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                                <p className="text-[#111418] dark:text-white text-base font-semibold leading-tight flex items-center gap-2">
                                    {speaker.name}
                                    {speaker.role && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{speaker.role}</span>}
                                </p>
                                <p className="text-primary text-xs font-medium leading-normal mb-1">{speaker.university}</p>
                                <p className="text-[#617289] dark:text-gray-400 text-xs font-normal leading-normal">{speaker.title}</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex items-center">
                            <button className="flex min-w-[90px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-3 bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white text-sm font-medium leading-normal transition-colors hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => navigate(`/speaker/${speaker.id}`)}>
                                <span className="truncate">View Profile</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center p-8 bg-white dark:bg-background-dark mb-16">
                <p className="text-sm text-[#617289] dark:text-gray-500">Showing {speakers.length} speakers</p>
            </div>
        </div>
    );
}
