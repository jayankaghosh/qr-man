import {useTranslation} from "react-i18next";
import { useNavigate } from 'react-router-dom';
import {Box, Card, Typography, CardContent, CardActions, Button, Divider, Stack} from "@mui/material";
import {sendRequest} from "util/request";
import ItemList from "components/item-list";
import {useDispatch} from "react-redux";
import DataArrayIcon from '@mui/icons-material/DataArray';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import {useState} from "react";
import AlertDialog from "components/alert-dialog";

const Item = ({ data, refreshList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const onDeleteDialogClose = async isDelete => {
        if (isDelete) {
            await sendRequest('/bucket/delete', 'POST', {bucket_id: data.id});
            refreshList();
            dispatch({
                type: 'SHOW_NOTIFICATION',
                message: t('bucket.delete-successful')
            })
        }
    }
    const DeleteConfirmDialog = () => {
        if (!isDeleteDialogOpen) return null;
        return (
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                title={t('bucket.delete-title')}
                description={t('bucket.delete-description')}
                onClose={onDeleteDialogClose}
            />
        )
    }
    return (
        <>
            <DeleteConfirmDialog />
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
                    <Button size="small" onClick={() => navigate(`/bucket/${data.code}`)}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <DataArrayIcon />
                            <Typography variant="body1">{t('bucket.actions.view')}</Typography>
                        </Stack>
                    </Button>
                    <Button size="small" onClick={() => setIsDeleteDialogOpen(true)}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <DeleteIcon />
                            <Typography variant="body1">{t('bucket.actions.delete')}</Typography>
                        </Stack>
                    </Button>
                    <Button size="small" onClick={() => navigate(`/bucket/qrcode/${data.id}`)}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <QrCodeIcon />
                            <Typography variant="body1">{t('bucket.actions.qr-code')}</Typography>
                        </Stack>
                    </Button>
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