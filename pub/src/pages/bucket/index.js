import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Header from "components/header";
import BucketList from "components/bucket-list";

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
        <div className={'BucketPage'}>
            <Header />
            <BucketList />
            <AddButton />
        </div>
    )
}

export default BucketPage;