import {useTranslation} from "react-i18next";
import {Box, Card, Typography, CardContent, CardActions, Button, Divider} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {sendRequest} from "util/request";

const Bucket = ({ data }) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { data.name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { data.description }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            <Divider variant={'middle'} />
        </>
    )
}

const Buckets = ({ items }) => {
    const { t } = useTranslation('common');
    return (
        <div>
            { items.map((item, index) => <Bucket key={index} data={item} />) }
        </div>
    )
}

const NoBuckets = () => {
    const { t } = useTranslation('common');
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
            }}
        >
            <Typography variant="h6">
                { t('bucket.no-bucket-found') }
            </Typography>
        </Box>
    );
}

const renderBucketList = (items) => {
    if (!items) {
        return null;
    } else if (items.length) {
        return <Buckets items={items} />;
    } else {
        return <NoBuckets />
    }
}

const BucketList = () => {
    const [items, setItems] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            dispatch({type: 'LOADER_ENABLE'});
            try {
                const response = await sendRequest('/bucket/list', 'GET')
                setItems(response.items)
                dispatch({type: 'LOADER_DISABLE'});
            } catch {

            }
        })();
    }, [])
    return (
        <div className={'BucketList'}>
            { renderBucketList(items) }
        </div>
    )
}

export default BucketList;