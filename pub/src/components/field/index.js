import {IconButton, InputAdornment, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import {useState} from "react";

const renderIcon = (isDisabled, triggerValueChange) => {
    if (isDisabled) {
        return <EditIcon />
    } else {
        return <DoneIcon onClick={triggerValueChange} />
    }
}

const renderAdornment = (isEditable, isDisabled, toggleIsDisabled, triggerValueChange) => {
    if (!isEditable) {
        return null;
    }
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={toggleIsDisabled}
                onMouseDown={null}
                edge="end"
            >
                { renderIcon(isDisabled, triggerValueChange) }
            </IconButton>
        </InputAdornment>
    )
}

const Field = (props) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [value, setValue] = useState(props.defaultValue)
    const toggleIsDisabled = () => setIsDisabled(current => !current);
    const triggerValueChange = () => {
        if (typeof props.onValueChange === 'function') {
            props.onValueChange(value);
        }
    }
    return (
        <TextField
            { ...props }
            variant="standard"
            disabled={isDisabled}
            InputLabelProps={{ shrink: props.value }}
            onChange={e => setValue(e.target.value)}
            InputProps={{
                endAdornment: renderAdornment(props.isEditable, isDisabled, toggleIsDisabled, triggerValueChange)
            }}
        />
    )
}

export default Field