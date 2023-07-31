import WithHeaderLayout from "../../layouts/with-header";
import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Scan = () => {
    const navigate = useNavigate();
    const onScanSuccess = (value) => {
        navigate(`/bucket/${value}`)
    }
    const onScanFailure = (error) => {
        console.log(error);
    }

    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-code-scanner",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, [])
    return (
        <WithHeaderLayout>
            <div className={'ScanPage'}>
                <div id={'qr-code-scanner'}></div>
            </div>
        </WithHeaderLayout>
    )
}

export default Scan;