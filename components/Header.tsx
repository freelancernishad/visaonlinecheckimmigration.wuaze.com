import DesktopHeader from "./desktop/DesktopHeader";
import MobileHeader from "./mobile/MobileHeader";
import MobileBottomNav from "./mobile/MobileBottomNav";

export default function Header() {
    return (
        <header className="font-poppins sticky top-0 z-50 bg-white">
            <DesktopHeader />
            <MobileHeader />
            <MobileBottomNav />
        </header>
    );
}
