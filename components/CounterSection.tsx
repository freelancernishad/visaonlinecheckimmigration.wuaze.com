import DesktopCounter from "./desktop/DesktopCounter";
import MobileCounter from "./mobile/MobileCounter";

export default function CounterSection() {
    return (
        <>
            <DesktopCounter />
            <MobileCounter />
        </>
    );
}
