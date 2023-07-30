import {useTranslation} from "react-i18next";
import {Box, Card, Typography, CardContent, CardActions, Button, Divider} from "@mui/material";
import {sendRequest} from "util/request";
import ItemList from "components/item-list";
import {useDispatch} from "react-redux";

const Item = ({ data }) => {
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

const NoItems = () => {
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

const fetchItems = (
    dispatch,
    items,
    setItems,
    setHasMorePages,
    currentPage = 1,
    pageSize = 10
) => {
    (async () => {
        if (!items) {
            items = [];
        }
        dispatch({type: 'LOADER_ENABLE'});
        try {
            const params = new URLSearchParams({
                pageSize,
                currentPage,
                sortField: 'created_at',
                sortDirection: 'DESC'
            });
            const response = await sendRequest(`/bucket/list?${params.toString()}`, 'GET')
            const totalPages = Math.ceil(response.total_count/pageSize);
            setItems([ ...items, ...response.items])
            setHasMorePages(currentPage < totalPages);
            dispatch({type: 'LOADER_DISABLE'});
        } catch {}
    })();
}
const BucketList = () => {
    const dispatch = useDispatch();
    return (
        <div className={'BucketList'}>
            <ItemList
                fetchItems={(...args) => fetchItems(dispatch, ...args)}
                noItemsFoundComponent={NoItems}
                itemRenderer={Item}
            />
        </div>
    )
}

export default BucketList;