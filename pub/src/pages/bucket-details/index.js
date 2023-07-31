import {Divider} from "@mui/material";
import {useParams} from "react-router-dom";
import WithHeaderLayout from "layouts/with-header";
import BucketDetailsCard from "components/bucket-details-card";
import BucketItemsList from "../../components/bucket-items-list";

const BucketDetails = () => {
    const { bucket_code } = useParams();

    return (
        <WithHeaderLayout>
            <div className={'BucketDetailsPage'}>
                <BucketDetailsCard bucket_code={bucket_code} />
                <Divider />
                <BucketItemsList bucket_code={bucket_code} />
            </div>
        </WithHeaderLayout>
    )
}

export default BucketDetails;