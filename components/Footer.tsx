import { FaCopyright } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-secondary py-4 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <span className="flex items-center gap-2 justify-center md:justify-start">
                            <FaCopyright />
                            <a href="#" className="border-b border-white hover:text-gray-200">australiagovvisacheck.wuaze.com</a>
                            All right reserved.
                        </span>
                    </div>
                    {/* Image Placeholder if needed, or just keep it simple as per HTML structure */}
                    {/* <div className="text-center md:text-right">
                <img src="/img/payment.jpg" alt="Payment" className="h-8" />
            </div> */}
                </div>
            </div>
        </footer>
    );
}
