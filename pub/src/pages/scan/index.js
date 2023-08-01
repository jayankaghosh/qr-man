import WithHeaderLayout from "layouts/with-header";
import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {sendRequest} from "util/request";

import './style.scss';
import {useDispatch} from "react-redux";

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
                `/bucket/getByCode?code=${value}`,
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
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-code-scanner",
            {fps: 10, qrbox: {width: '250', height: '250'}},
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        setScanner(html5QrcodeScanner)
    }, [])
    useEffect(() => {
        return async () => {
            if (scanner) {
                await scanner.clear();
            }
        }
    }, [scanner])
    return (
        <WithHeaderLayout>
            <div className={'ScanPage'}>
                <div id={'qr-code-scanner'}></div>
            </div>
        </WithHeaderLayout>
    )
}

export default Scan;