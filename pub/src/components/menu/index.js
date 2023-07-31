import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DataArrayIcon from '@mui/icons-material/DataArray';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useTranslation } from "react-i18next";
import {logout} from "util/authenticate";
import {useNavigate} from "react-router-dom";
import {getMode, MODE_DARK, MODE_LIGHT, setMode} from 'util/mode';

const ToggleDarkMode = () => {
    let mode = getMode();
    const { t } = useTranslation('common');
    const toggle = () => {
        if (mode === MODE_LIGHT) {
            mode = MODE_DARK;
        } else {
            mode = MODE_LIGHT;
        }
        setMode(mode);
    }

    if (mode === MODE_LIGHT) {
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={toggle}>
                    <ListItemIcon>
                        <DarkModeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('menu.set-dark-mode')}/>
                </ListItemButton>
            </ListItem>
        );
    } else {
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={toggle}>
                    <ListItemIcon>
                        <LightModeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('menu.set-light-mode')}/>
                </ListItemButton>
            </ListItem>
        );
    }
}

const MenuItems = ({setMenuState}) => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    return (
        <Box
            sx={{width: 300}}
            role="presentation"
            onClick={() => setMenuState(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.profile')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <DataArrayIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.my-buckets')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/scan')}>
                        <ListItemIcon>
                            <QrCodeScannerIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.scan')} />
                    </ListItemButton>
                </ListItem>
                <ToggleDarkMode />
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
            <MenuItems setMenuState={setMenuState} />
        </Drawer>
    )
}

export default Menu;