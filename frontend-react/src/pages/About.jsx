import { useNavigate } from 'react-router-dom';
import coverImage from '../assets/unnamed.jpg';

export default function About() {
    const navigate = useNavigate();

    return (
        <>
            <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
                <div className="text-primary flex size-12 shrink-0 items-center cursor-pointer" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined text-3xl">chevron_left</span>
                </div>
                <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-display">About UPES</h2>
            </div>

            <div className="@container">
                <div className="@[480px]:px-4 @[480px]:py-3 pt-2 px-0">
                    <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-gray-200 @[480px]:rounded-xl min-h-72 shadow-lg"
                        style={{ backgroundImage: `url(${coverImage})` }}
                    >
                    </div>
                </div>
            </div>

            <div className="px-4 pt-6">
                <h1 className="text-primary tracking-tight text-[32px] font-bold leading-tight font-display">A Legacy of Innovation</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1 uppercase">Established 2003 • Dehradun, India</p>
            </div>

            <div className="px-4 pt-4">
                <p className="text-[#111418] dark:text-gray-200 text-base font-normal leading-relaxed font-display">
                    Established in 2003 through the UPES Act, 2003 of the State Legislature of Uttarakhand, UPES is a specialized university focused on providing industry-aligned education. It has grown into a prestigious hub for multidisciplinary research and academic excellence.
                </p>
                <p className="text-[#111418] dark:text-gray-200 text-base font-normal leading-relaxed font-display pt-4">
                    The university is recognized by the University Grants Commission (UGC) and is accredited with an 'A' grade by NAAC. It is the first Indian university to specialize in Energy and Core sectors.
                </p>
            </div>

            <div className="flex flex-wrap gap-3 p-4">
                <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm">
                    <span className="material-symbols-outlined text-primary mb-1">school</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Established</p>
                    <p className="text-[#111418] dark:text-white tracking-tight text-xl font-bold font-display">2003</p>
                </div>
                <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm">
                    <span className="material-symbols-outlined text-primary mb-1">workspace_premium</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">NIRF Rank</p>
                    <p className="text-[#111418] dark:text-white tracking-tight text-xl font-bold font-display">#43 Overall</p>
                </div>
                <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm">
                    <span className="material-symbols-outlined text-primary mb-1">public</span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">QS Rating</p>
                    <p className="text-[#111418] dark:text-white tracking-tight text-xl font-bold font-display">5 Stars</p>
                </div>
            </div>

            <div className="px-4 pb-10">
                <div className="rounded-xl bg-primary/10 dark:bg-primary/5 p-6 border border-primary/20">
                    <h3 className="text-primary text-xl font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined">rocket_launch</span>
                        Mission &amp; Vision
                    </h3>
                    <p className="text-[#111418] dark:text-gray-200 text-base italic leading-relaxed font-display">
                        "To develop industry-focused professionals with a global outlook by fostering outcome-based education and research, instilling lifelong learning through an integrative thought process, and promoting professional ethics in harmony with the environment and society."
                    </p>
                </div>
            </div>

            <div className="px-4 pb-12">
                <h4 className="text-[#111418] dark:text-white text-lg font-bold mb-3 font-display">Host of IYRC 2026</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-display">
                    UPES is proud to host the 4th International Young Researchers Conclave, providing a platform for bright minds to explore sustainable development and technological advancement in the heart of the Himalayas.
                </p>
                <div className="mt-6 flex items-center justify-center">
                    <div className="h-1 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </>
    );
}
