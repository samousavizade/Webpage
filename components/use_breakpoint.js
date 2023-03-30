import {useMediaQuery, useTheme} from "@mui/material";

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */

// 	'inherit'
// | 'large'
// | 'medium'
// | 'small'
// | string

const abbrToFullBreakpointName = {
    "xs": "medium",
    "sm": "medium",
    "md": "large",
    "lg": "large",

}

const breakpointToIconSize = {
    "xs": "1.25rem",
    "sm": "1.5rem",
    "md": "1.75rem",
    "lg": "2rem",
}
export function responsiveIconSize(breakpoint) {
    return breakpointToIconSize[breakpoint];
}

export default function useBreakpoint() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();

    const result = keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs';

    return result;
}