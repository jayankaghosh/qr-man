import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BucketList from "components/bucket-list";
import WithHeaderLayout from 'layouts/with-header';

const AddButton = () => {
    const styles = {
        position: 'fixed',
        bottom: 30,
        right: 30,
    }
    return (
        <Fab color="primary" aria-label="add" sx={styles}>
            <AddIcon />
        </Fab>
    )
}

const BucketPage = () => {
    return (
        <WithHeaderLayout>
            <div className={'BucketPage'}>
                <BucketList />
                <AddButton />
            </div>
        </WithHeaderLayout>
    )
}

export default BucketPage;