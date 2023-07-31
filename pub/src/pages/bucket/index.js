import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BucketList from "components/bucket-list";
import WithHeaderLayout from 'layouts/with-header';

const AddButton = ({ onclick }) => {
    const styles = {
        position: 'fixed',
        bottom: 30,
        right: 30,
    }
    return (
        <Fab color="primary" aria-label="add" sx={styles}>
            <AddIcon onClick={onclick} />
        </Fab>
    )
}

const BucketPage = () => {
    const navigate = useNavigate();
    return (
        <WithHeaderLayout>
            <div className={'BucketPage'}>
                <BucketList />
                <AddButton onclick={() => navigate('/bucket/add')} />
            </div>
        </WithHeaderLayout>
    )
}

export default BucketPage;