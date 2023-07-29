import { Route } from "react-router-dom";
import BucketPage from 'pages/bucket';
import MyProfile from 'pages/my-profile';
import AuthenticatePage from "pages/authenticate";
import NoRoutePage from 'pages/no-route';

export const routes = [
    <Route path="/" Component={BucketPage} key='bucket-page' />,
    <Route path="/profile" Component={MyProfile} key='my-profile' />,
    <Route path="/authenticate" Component={AuthenticatePage} key='authenticate-page' />,
    <Route path='*' Component={NoRoutePage} key='no-route-page' />
]