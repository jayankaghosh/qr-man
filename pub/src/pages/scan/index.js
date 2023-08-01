import WithHeaderLayout from "../../layouts/with-header";
import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {sendRequest} from "util/request";

import './style.scss';
import {useDispatch} from "react-redux";

let html5QrcodeScanner = null;

const Scan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scanner, setScanner] = useState(null);
    const onScanSuccess = async (value) => {
        try {
            scanner.pause();
        } catch {}
        dispatch({type: 'LOADER_ENABLE'});
        try {
            await sendRequest(
                `http://qrman.local/api/rest/bucket/getByCode?code=${value}`,
                'GET',
                null,
                {},
                false,
                false
            );
            navigate(`/bucket/${value}`)
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: 'LOADER_DISABLE'});
            try {
                scanner.resume();
            } catch {}
        }
    }
    const onScanFailure = (error) => {}

    useEffect(() => {
        if (!scanner) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-code-scanner",
                {fps: 10, qrbox: {width: '250', height: '250'}},
                /* verbose= */ false);
            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
            setScanner(html5QrcodeScanner)
        }
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