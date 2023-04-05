import {useTheme} from "@mui/material/styles";

const CyanSpan = ({children}) => {
    const theme = useTheme();
    return <span style={{color: theme.palette.secondary.main}}>
        {children}
    </span>
}

export default CyanSpan;