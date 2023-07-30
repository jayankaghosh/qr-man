import {Avatar, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useTranslation} from "react-i18next";
import Link from "components/link";
import {STEP_SIGN_UP} from "pages/authenticate/config";
import {FORM_TYPE_LOGIN, onFormSubmit} from "util/authenticate";

const SignIn = ({ setCurrentStep }) => {
    const { t } = useTranslation('common');
    return (
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                { t('authenticate.sign-in') }
            </Typography>
            <Box component="form" onSubmit={e => onFormSubmit(e, FORM_TYPE_LOGIN)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t('authenticate.email-address')}
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={t('authenticate.password')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {t('authenticate.sign-in')}
                </Button>
                <Box className={'Actions'} sx={{m: 2}}>
                    <Link href="#">
                        <Typography align={'center'}>{t('authenticate.forgot-password')}</Typography>
                    </Link>
                    <Box sx={{ m: 2 }} />
                    <Link href="#" onClick={() => setCurrentStep(STEP_SIGN_UP)}>
                        <Typography align={'center'}>{t('authenticate.sign-up-link')}</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default SignIn;