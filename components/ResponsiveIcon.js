import React from "react";
import useBreakpoint, {responsiveIconSize} from "./use_breakpoint";

const ResponsiveIcon = ({icon, sx, ...props}) => {
    const currentBreakpoint = useBreakpoint();
    const fontSize = responsiveIconSize(currentBreakpoint)

    return React.createElement(icon, {
        sx: {
            ...sx,
            fontSize: fontSize
        },
        ...props
    })
}

export default ResponsiveIcon;