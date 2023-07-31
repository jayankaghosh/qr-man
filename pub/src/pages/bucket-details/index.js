import {useParams} from "react-router-dom";
import WithHeaderLayout from "layouts/with-header";
import BucketDetailsCard from "components/bucket-details-card";

const BucketDetails = () => {
    const { bucket_code } = useParams();

    return (
        <WithHeaderLayout>
            <div className={'BucketDetailsPage'}>
                <BucketDetailsCard bucket_code={bucket_code} />
            </div>
        </WithHeaderLayout>
    )
}

export default BucketDetails;