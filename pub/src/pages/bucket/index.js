import {Box, Fab, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Header from "components/header";
import {useTranslation} from "react-i18next";

const AddButton = () => {
    const styles = {
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
    return (
        <Fab color="primary" aria-label="add" sx={styles}>
            <AddIcon />
        </Fab>
    )
}

const BucketList = () => {
    const { t } = useTranslation('common');
    return (
        <div className={'NoRoute'}>
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
        </div>
    )
}

const BucketPage = () => {
    return (
        <div className={'BucketPage'}>
            <Header />
            <BucketList />
            <AddButton />
        </div>
    )
}

export default BucketPage;