import { useNavigate } from 'react-router-dom';

export default function SpeakerProfile() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto min-h-screen max-w-[480px] bg-white dark:bg-[#1a2430] flex flex-col shadow-xl">
            <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-[#1a2430]/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-gray-800 transition-colors" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
                <div className="flex items-center gap-3">
                    <button
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-[#111418] dark:text-white"
                        onClick={() => navigate(-1)}
                    >
                        <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight text-[#111418] dark:text-white">Speaker Profile</h2>
                </div>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-[#111418] dark:text-white">
                    <span className="material-symbols-outlined text-[24px]">share</span>
                </button>
            </header>

            <main className="flex-1">
                <section className="flex flex-col items-center px-4 py-8 bg-gradient-to-b from-white to-background-light dark:from-[#1a2430] dark:to-background-dark">
                    <div className="relative">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl min-h-40 w-40 shadow-2xl border-4 border-white dark:border-gray-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCV9Ql8C4coNWPOhxOIm8fBlXyfGprtsx2g_8lLyOitw3BooHrFx7Bmzt9mPVZ3Ituky7Ptt0YCP__VsPN6_nXsWOZRt6t0yd4_hCWzjr7VVpOZpfOkL-hswiQiOrm-3KeeyAAzqncHL_N2PETLo7hjhx_M8ZZquaroBYYUhE--tWZzLeetWOEOE-W0ojHKDCCNRrogEi1pR1yJ9hF7ubnB-iQSUmg-Jxs51ItcEngakNNXS7dTGZ5ya5MZYGaRNZbdb5n96CCLz0')" }}>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-[#111418] dark:text-white">Dr. Jane Smith</h1>
                        <p className="mt-1 text-primary font-semibold text-base uppercase tracking-wider text-sm">Keynote Speaker</p>
                        <p className="mt-2 text-[#617289] dark:text-gray-400 font-medium leading-relaxed">
                            Associate Professor of Computer Science<br />
                            UPES University, Dehradun
                        </p>
                    </div>
                </section>

                <section className="px-4 py-2">
                    <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight pb-2 pt-4">About</h3>
                    <p className="text-[#111418] dark:text-gray-300 text-base font-normal leading-relaxed">
                        Dr. Jane Smith is a leading researcher in Sustainable Development and AI. She has contributed over 50 papers to international journals and is a recipient of several academic awards. Her work at IYRC focuses on the intersection of technology and ethics in young research circles, driving the conversation on responsible innovation.
                    </p>
                </section>

                <section className="px-4 py-6">
                    <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight pb-3">Research Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium">Sustainable AI</span>
                        <span className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium">Ethics in Tech</span>
                        <span className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium">Cloud Computing</span>
                        <span className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium">Data Privacy</span>
                        <span className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium">ML in Healthcare</span>
                    </div>
                </section>

                <section className="px-4 py-6 mb-10 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight pb-4">Connect</h3>
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98]">
                            <span className="material-symbols-outlined">send</span>
                            Send a Message
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111418] dark:text-white font-semibold py-3.5 rounded-xl transition-all">
                                <span className="material-symbols-outlined text-[20px]">description</span>
                                <span className="text-sm">Papers</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#0077b5] hover:bg-[#00669c] text-white font-semibold py-3.5 rounded-xl transition-all">
                                <span className="material-symbols-outlined text-[20px]">person_add</span>
                                <span className="text-sm">LinkedIn</span>
                            </button>
                        </div>
                        <button className="flex items-center justify-center gap-2 w-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617289] dark:text-gray-400 font-semibold py-3 rounded-xl transition-all mt-1">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                            Schedule a Meeting
                        </button>
                    </div>
                </section>
            </main>
            <div className="h-8 bg-white dark:bg-[#1a2430]"></div>
        </div>
    );
}
