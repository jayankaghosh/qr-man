import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useTranslation } from "react-i18next";
import {logout} from "util/authenticate";
import {useNavigate} from "react-router-dom";
const MenuItems = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    return (
        <Box
            sx={{width: 300}}
            role="presentation"
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <DataArrayIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.my-buckets')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.profile')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.logout')} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

const Menu = ({ menuState, setMenuState }) => {
    const { t } = useTranslation('common');
    return (
        <Drawer
            anchor={'left'}
            open={menuState}
            onClose={() => setMenuState(false)}
        >
            <MenuItems />
        </Drawer>
    )
}

export default Menu;