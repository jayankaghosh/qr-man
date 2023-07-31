import {Button, Card, CardActions, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Field from "components/field";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {formatDate} from "util/date";
import {useEffect, useState} from "react";
import {sendRequest} from "util/request";

import './style.scss'

const BucketDetailsCard = ({ bucket_code }) => {
    const {t} = useTranslation('common');
    const navigate = useNavigate();

    const [bucket, setBucket] = useState(null);

    const onValueChange = async (data) => {
        const response = await sendRequest(`/bucket/edit`, 'POST', {
            bucket_id: bucket.id,
            ...data
        });
        fetchBucketData();
    }

    const fetchBucketData = async () => {
        setBucket(null);
        const response = await sendRequest(`/bucket/getByCode?code=${bucket_code}`);
        setBucket(response);
    }

    useEffect(() => {
        fetchBucketData();
    }, [])

    if (!bucket) {
        return null;
    }

    const BucketName = () => {
        return (
            <Field
                className={'BucketName'}
                defaultValue={bucket.name}
                isEditable={true}
                onValueChange={value => onValueChange({name: value})}
            />
        )
    }

    const BucketCreatedAt = () => {
        return (
            <span className={'CreatedAt'}>
                { t('bucket-details.created-at', {date: formatDate(bucket.created_at, 'MMMM D, YYYY')}) }
            </span>
        )
    }

    const BucketDescription = () => {
        return (
            <Field
                className={'Description'}
                defaultValue={bucket.description}
                multiline
                isEditable={true}
                onValueChange={value => onValueChange({description: value})}
            />
        )
    }

    return (
        <Card sx={{ width: '100%' }} className={'BucketDetailsCard'}>
            <CardHeader
                className={'Heading'}
                title={<BucketName />}
                subheader={<BucketCreatedAt />}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <BucketDescription />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" onClick={() => navigate(`/bucket/qrcode/${bucket.id}`)}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <QrCodeIcon />
                        <Typography variant="body1">{t('bucket.actions.qr-code')}</Typography>
                    </Stack>
                </Button>
            </CardActions>
        </Card>
    )
}

export default BucketDetailsCard;