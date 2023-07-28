import {Avatar, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useTranslation} from "react-i18next";
import Link from "components/link";
import {STEP_SIGN_IN} from "pages/authenticate/config";

const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
}

const SignUp = ({ setCurrentStep }) => {
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
                { t('authenticate.sign-up') }
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t('authenticate.full-name')}
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
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
                    {t('authenticate.sign-up')}
                </Button>
                <Box className={'Actions'} sx={{m: 2}}>
                    <Link href="#" onClick={() => setCurrentStep(STEP_SIGN_IN)}>
                        <Typography align={'center'}>{t('authenticate.sign-in-link')}</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;