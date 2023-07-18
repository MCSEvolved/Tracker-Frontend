import App from "./Components/App";
import 'mcs-navbar';
import logo from '/logo.svg?url';
export default function Layout() {
    return (
        <>
            <mcs-navbar logoSrc={logo} redirect={import.meta.env.VITE_HOST}></mcs-navbar>
            <App></App>
        </>
    )
}