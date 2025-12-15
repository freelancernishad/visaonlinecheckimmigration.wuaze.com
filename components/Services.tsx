import DesktopServices from "./desktop/DesktopServices";
import MobileServices from "./mobile/MobileServices";

export default function Services() {
    return (
        <>
            <DesktopServices />
            <MobileServices />
        </>
    );
}
