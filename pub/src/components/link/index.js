import { Link as ReactRouterLink } from "react-router-dom";
import { Link as MaterialLink } from '@mui/material';

const Link = (props) => {
    return (
        <div className={'Link'}>
            <MaterialLink component={ReactRouterLink} { ...props }>{ props.children }</MaterialLink>
        </div>
    )
}

export default Link;