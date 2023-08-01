import WithHeaderLayout from "layouts/with-header";
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import DataArrayIcon from '@mui/icons-material/DataArray';
import {useTranslation} from "react-i18next";
import {sendRequest} from "util/request";
import {useNavigate} from "react-router-dom";

const BucketAdd = () => {
    const {t} = useTranslation('common');
    const navigate = useNavigate();

    const onFormSubmit = async e => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            const response = await sendRequest('/bucket/add', 'POST', data);
            navigate(`/bucket/${response.code}`);
        } catch (e) {}
    }

    return (
        <WithHeaderLayout>
            <div className={'BucketPage'}>
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
                        { t('bucket-add.title') }
                    </Typography>
                    <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('bucket-add.fields.name')}
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label={t('bucket-add.fields.description')}
                            multiline
                            rows={4}
                            id="description"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t('bucket-add.actions.add')}
                        </Button>
                    </Box>
                </Box>
            </div>
        </WithHeaderLayout>
    )
}

export default BucketAdd;