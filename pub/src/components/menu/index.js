import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";


const MenuItems = () => {
    const { t } = useTranslation('common');
    return (
        <Box
            sx={{width: 250}}
            role="presentation"
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu.profile')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
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