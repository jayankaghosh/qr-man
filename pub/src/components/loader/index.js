import {useSelector} from "react-redux";
import {Backdrop, CircularProgress} from "@mui/material";


const Loader = () => {
    const loaderState = useSelector((state) => state.loader.isEnabled)
    return (
        <div className={'loader'}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loaderState}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loader;