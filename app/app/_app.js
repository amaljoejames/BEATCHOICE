import { SessionProvider } from "next-auth/react";
import Home from "./Home"; // Adjust the path as needed

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
