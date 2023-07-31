import { Route } from "react-router-dom";
import BucketPage from 'pages/bucket';
import BucketQrCode from "pages/bucket-qr-code";
import MyProfile from 'pages/my-profile';
import AuthenticatePage from "pages/authenticate";
import NoRoutePage from 'pages/no-route';
import BucketDetails from "pages/bucket-details";

export const routes = [
    <Route path="/" Component={BucketPage} key='bucket-page' />,
    <Route path="/bucket/:bucket_code" Component={BucketDetails} key='bucket-details-page' />,
    <Route path="/bucket/qrcode/:bucket_id" Component={BucketQrCode} key='bucket-qr-code' />,
    <Route path="/profile" Component={MyProfile} key='my-profile' />,
    <Route path="/authenticate" Component={AuthenticatePage} key='authenticate-page' />,
    <Route path='*' Component={NoRoutePage} key='no-route-page' />
]