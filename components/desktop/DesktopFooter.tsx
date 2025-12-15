import { FaCopyright } from 'react-icons/fa';

export default function DesktopFooter() {
    return (
        <footer className="hidden lg:block bg-secondary py-4 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="text-left">
                        <span className="flex items-center gap-2 justify-start text-sm text-white/80">
                            <span className="flex items-center gap-2"><FaCopyright /> 2024 VisaOnline.</span>
                            <span>|</span>
                            <a href="#" className="border-b border-white/30 hover:text-white hover:border-white transition-colors">australiagovvisacheck.wuaze.com</a>
                            All right reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
