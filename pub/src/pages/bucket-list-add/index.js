import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import DataArrayIcon from "@mui/icons-material/DataArray";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import WithHeaderLayout from "layouts/with-header";
import {sendRequest} from "util/request";

const BucketListAdd = () => {
    const {t} = useTranslation('common');
    const navigate = useNavigate();
    const {bucket_code} = useParams();
    const dispatch = useDispatch();

    const onFormSubmit = async e => {
        e.preventDefault();
        try {
            dispatch({type: 'LOADER_ENABLE'});
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            data.type = '2';
            data.bucket_code = bucket_code;
            await sendRequest('/bucket/item/add', 'POST', data);
            navigate(`/bucket/${bucket_code}`);
        } catch (e) {
        } finally {
            dispatch({type: 'LOADER_DISABLE'});
        }
    }

    return (
        <WithHeaderLayout>
            <div className={'BucketListAddPage'}>
                <Box
                    sx={{
                        m: 1,
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <DataArrayIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        { t('bucket-item-add.title') }
                    </Typography>
                    <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('bucket-item-add.fields.name')}
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="value"
                            label={t('bucket-item-add.fields.value')}
                            multiline
                            rows={4}
                            id="value"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t('bucket-item-add.actions.add')}
                        </Button>
                    </Box>
                </Box>
            </div>
        </WithHeaderLayout>

    );
}

export default BucketListAdd;