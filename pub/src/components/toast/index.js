import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";


const Toast = () => {
    const { isVisible, message } = useSelector((state) => state.notification)
    const dispatch = useDispatch();
    const hideToast = () => {
        dispatch({
            type: 'HIDE_NOTIFICATION'
        });
    }
    return (
        <Snackbar
            open={isVisible}
            autoHideDuration={6000}
            onClose={hideToast}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={hideToast} severity="success" sx={{ width: '100%' }}>
                { message ? message.toUpperCase(): '' }
            </Alert>
        </Snackbar>
    );
}

export default Toast;