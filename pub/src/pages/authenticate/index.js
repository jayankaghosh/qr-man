import {
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'components/link';

const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
}

const Authenticate = () => {
    return (
        <div className={'Authenticate'}>
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Box className={'Actions'} sx={{m: 2}}>
                        <Link href="#" fullWidth>
                            <Typography align={'center'}>Forgot password?</Typography>
                        </Link>
                        <Box sx={{ m: 2 }} />
                        <Link href="#" fullWidth>
                            <Typography align={'center'}>Don't have an account? Sign Up</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Authenticate;