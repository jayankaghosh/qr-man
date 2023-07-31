import {Box, Button, Stack, Typography} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {sendRequest} from "util/request";
import {useDispatch} from "react-redux";
import WithHeaderLayout from "../../layouts/with-header";
import {useTranslation} from "react-i18next";
import {canShare, shareBlob} from 'util/share';
import './style.scss'

const saveFile = (url, filename) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0)
}

const BucketQrCode = () => {
    const {t} = useTranslation('common');
    const { bucket_id } = useParams();
    const [qrCode, setQrCode] = useState(null);
    const [qrCodeBlob, setQrCodeBlob] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                dispatch({type: 'LOADER_ENABLE'});
                const response = await sendRequest(
                    `/bucket/generateQR?bucket_id=${bucket_id}`,
                    'GET',
                    null,
                    {},
                    true
                );
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setQrCodeBlob(blob)
                setQrCode(objectUrl)
                dispatch({type: 'LOADER_DISABLE'});
            } catch (e) {
                console.error(e)
            }
        })()
    }, []);

    const ShareButton = () => {
        if (!canShare()) return null;
        return (
            <Button size="small" onClick={() => shareBlob(qrCodeBlob, 'QRMan Bucket QR Code')}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <ShareIcon />
                    <Typography variant="body1">{t('bucket-qr-code.share')}</Typography>
                </Stack>
            </Button>
        );
    }

    if (!qrCode) return null;
    return (
        <WithHeaderLayout>
            <div className={'BucktQrCodePage'}>
                <div className={'container'}>
                    <Box>
                        <img src={qrCode} alt={'The QR Code'} />
                    </Box>
                    <Button size="small" onClick={() => saveFile(qrCode, 'qr_code.jpg')}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <DownloadIcon />
                            <Typography variant="body1">{t('bucket-qr-code.download')}</Typography>
                        </Stack>
                    </Button>
                    <ShareButton />
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default BucketQrCode;