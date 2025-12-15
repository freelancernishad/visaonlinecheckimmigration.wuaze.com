import DesktopCountries from "./desktop/DesktopCountries";
import MobileCountries from "./mobile/MobileCountries";

export default function CountriesSection() {
    return (
        <>
            <DesktopCountries />
            <MobileCountries />
        </>
    );
}
