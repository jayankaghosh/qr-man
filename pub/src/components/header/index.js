import {AppBar, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useTranslation } from "react-i18next";
import Menu from "components/menu";
import {useState} from "react";

const Header = () => {
    const { t } = useTranslation('common');
    const [menuState, setMenuState] = useState(false);
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setMenuState(true)}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <QrCodeIcon />
                        <Typography variant="body1">{ t('app.name') }</Typography>
                    </Stack>
                </Typography>
                <Menu menuState={menuState} setMenuState={setMenuState} />
            </Toolbar>
        </AppBar>
    )
}

export default Header;