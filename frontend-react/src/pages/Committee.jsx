import { useNavigate } from 'react-router-dom';
import nangiaImg from '../assets/nangia.webp';
import avasthiImg from '../assets/avasthi.webp';
import tauseefImg from '../assets/tauseef.webp';
import pankajImg from '../assets/pankaj.webp';
import mathurImg from '../assets/mathur.webp';

export default function Committee() {
    const navigate = useNavigate();

    const members = [
        {
            name: "Prof. Ashwini Nangia",
            role: "Convener",
            img: nangiaImg,
            isIcon: false
        },
        {
            name: "Prof. D. K. Avasthi",
            role: "Convener",
            img: avasthiImg,
            isIcon: false
        },
        {
            name: "Prof. S. M. Tauseef",
            role: "Co-Convener",
            img: tauseefImg,
            isIcon: false
        },
        {
            name: "Prof. Pankaj Kumar",
            role: "Co-Convener",
            img: pankajImg,
            isIcon: false
        },
        {
            name: "Prof. Ashish Mathur",
            role: "Conference Secretary",
            img: mathurImg,
            isIcon: false
        }
    ];
    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <div className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => navigate(-1)}>
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </div>
                    <h1 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Organizing Committee</h1>
                    <div className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-4 px-4 pt-6 pb-32">
                {members.map((member, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all active:scale-95">
                        <div className="w-20 h-20 rounded-full border-2 border-primary/20 overflow-hidden">
                            {member.isIcon ? (
                                <div className="w-full h-full bg-center bg-no-repeat bg-cover flex items-center justify-center bg-primary/5">
                                    <span className="material-symbols-outlined text-primary/40 text-3xl">account_circle</span>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-center bg-no-repeat bg-cover" data-alt={`Portrait of ${member.name}`} style={{ backgroundImage: `url("${member.img}")` }}></div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="text-[#111418] dark:text-white text-[15px] font-bold leading-tight">{member.name}</p>
                            <p className="text-primary text-[10px] font-bold uppercase tracking-wider">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
