import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Card, Typography, CardContent, CardActions, Button, Divider, Stack, Fab} from "@mui/material";
import {sendRequest} from "util/request";
import ItemList from "components/item-list";
import {useDispatch} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import AlertDialog from "../alert-dialog";
import AddIcon from "@mui/icons-material/Add";

const Item = ({ data, refreshList }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('common');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const onDeleteDialogClose = async isDelete => {
        if (isDelete) {
            await sendRequest('/bucket/item/delete', 'POST', {bucket_item_id: data.id});
            refreshList();
            dispatch({
                type: 'SHOW_NOTIFICATION',
                message: t('bucket-items.delete-successful')
            })
        }
    }
    const DeleteConfirmDialog = () => {
        if (!isDeleteDialogOpen) return null;
        return (
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                title={t('bucket-items.delete-title')}
                description={t('bucket-items.delete-description')}
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
                        { data.value }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setIsDeleteDialogOpen(true)}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <DeleteIcon />
                            <Typography variant="body1">{t('bucket-items.actions.delete')}</Typography>
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
                { t('bucket-items.no-bucket-items-found') }
            </Typography>
        </Box>
    );
}

const BucketItemsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {bucket_code} = useParams();

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
                    sortDirection: 'DESC',
                    bucket_code
                });
                const response = await sendRequest(`/bucket/item/list?${params.toString()}`, 'GET')
                const totalPages = Math.ceil(response.total_count/pageSize);
                setItems([ ...items, ...response.items])
                setHasMorePages(currentPage < totalPages);
                dispatch({type: 'LOADER_DISABLE'});
            } catch {}
        })();
    }

    const AddButton = ({ onclick }) => {
        const styles = {
            position: 'fixed',
            bottom: 30,
            right: 30,
        }
        return (
            <Fab color="primary" aria-label="add" sx={styles}>
                <AddIcon onClick={onclick} />
            </Fab>
        )
    }

    return (
        <div className={'BucketItemsList'}>
            <ItemList
                fetchItems={(...args) => fetchItems(dispatch, ...args)}
                noItemsFoundComponent={NoItems}
                itemRenderer={Item}
            />
            <AddButton onclick={() => navigate(`/bucket/${bucket_code}/list/add`)} />
        </div>
    )
}

export default BucketItemsList;