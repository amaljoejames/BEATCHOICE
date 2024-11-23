// Import Appbar dynamically to disable SSR
import dynamic from "next/dynamic";

const Appbar = dynamic(() => import("../COMPONENTS/Appbar"), { ssr: false });  // Corrected the path to 'components'

function YourComponent() {
    return (
        <div>
            <Appbar />
        </div>
    );
}

export default YourComponent;
