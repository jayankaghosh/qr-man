import { Box, Button, Typography } from '@mui/material'
import Link from 'components/link';

const NoRoute = () => {
    return (
        <div className={'NoRoute'}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h6">
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Box sx={{ m: 2 }} />
                <Link to={'/'}>Take me back</Link>
            </Box>
        </div>
    )
}

export default NoRoute;