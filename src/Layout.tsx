import App from "./Components/App";
import 'mcs-navbar';
export default function Layout() {
    return (
        <>
            <mcs-navbar logoSrc="logo.svg"></mcs-navbar>
            <App></App>
        </>
    )
}