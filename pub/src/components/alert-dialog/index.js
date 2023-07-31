import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


const AlertDialog = ({ isOpen, setIsOpen, title, description, onClose }) => {
    const onDialogClose = (action) => {
        setIsOpen(false)
        onClose(action);
    }
    return (
        <Dialog
            open={isOpen}
            onClose={() => onDialogClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { description }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onDialogClose(false)}>No</Button>
                <Button onClick={() => onDialogClose(true)} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog;