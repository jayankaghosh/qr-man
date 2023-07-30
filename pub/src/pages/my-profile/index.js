import WithHeaderLayout from 'layouts/with-header';
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useTranslation} from "react-i18next";
import Field from "components/field";
import {sendRequest} from "util/request";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {formatDate} from "util/date";


const fetchProfileData = async (dispatch, setProfileData) => {
    dispatch({type: 'LOADER_ENABLE'});
    setProfileData(null);
    const response = await sendRequest('/user', 'GET');
    setProfileData(response);
    dispatch({type: 'LOADER_DISABLE'});
}

const updateProfileData = async (dispatch, setProfileData, data) => {
    dispatch({type: 'LOADER_ENABLE'});
    await sendRequest('/user/edit', 'POST', data)
    dispatch({type: 'LOADER_DISABLE'});
    fetchProfileData(dispatch, setProfileData)
}

const renderProfileForm = (profileData, dispatch, setProfileData, t) => {
    if (!profileData) return null;
    return (
        <Box
            sx={{
                m: 1,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1 }}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                { t('authenticate.my-profile') }
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Field
                    margin="normal"
                    isEditable={true}
                    label={t('authenticate.full-name')}
                    defaultValue={profileData.name}
                    fullWidth
                    onValueChange={value => updateProfileData(dispatch, setProfileData, { name: value })}
                />
                <Field
                    margin="normal"
                    isEditable={false}
                    label={t('authenticate.email-address')}
                    defaultValue={profileData.email}
                    fullWidth
                />
                <Field
                    margin="normal"
                    isEditable={false}
                    label={t('authenticate.member-since')}
                    defaultValue={formatDate(profileData.created_at)}
                    fullWidth
                />
            </Box>
        </Box>
    )
}

const MyProfile = () => {
    const { t } = useTranslation('common');
    const [profileData, setProfileData] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchProfileData(dispatch, setProfileData);
    }, []);
    return (
        <WithHeaderLayout>
            <div className={'MyProfilePage'}>
                { renderProfileForm(profileData, dispatch, setProfileData, t) }
            </div>
        </WithHeaderLayout>
    )
}

export default MyProfile;