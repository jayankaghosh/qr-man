import { Box, Button, Typography } from '@mui/material'
import Link from 'components/link';
import {useTranslation} from "react-i18next";

const NoRoute = () => {
    const { t } = useTranslation('common');
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
                    {t('no-route.heading')}
                </Typography>
                <Typography variant="h6">
                    {t('no-route.message')}
                </Typography>
                <Box sx={{ m: 2 }} />
                <Link to={'/'}>{t('no-route.home-button-text')}</Link>
            </Box>
        </div>
    )
}

export default NoRoute;