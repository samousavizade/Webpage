
// 404.js

import {rgbToHex, useTheme} from "@mui/material";
import {grey} from "@mui/material/colors";


export function AnimatedBookIcon() {
    const theme = useTheme()

    return <>
        <script src="https://cdn.lordicon.com/ritcuqlt.js" defer></script>
        <lord-icon
            src="https://cdn.lordicon.com/wxnxiano.json"
            trigger="morph"
            colors={`primary:${rgbToHex(theme.palette.primary.main)},secondary:${rgbToHex(theme.palette.text.primary)}`}
            stroke="100"
            style={{
                width: "60px", height: "60px"
            }}>
        </lord-icon>
    </>
}

export function AnimatedHomeIcon() {
    const theme = useTheme()

    return <>
        <script src="https://cdn.lordicon.com/ritcuqlt.js" defer></script>
        <lord-icon
            src="https://cdn.lordicon.com/gmzxduhd.json"
            trigger="loop"
            colors={`primary:${rgbToHex(theme.palette.primary.main)},secondary:${rgbToHex(theme.palette.text.primary)}`}
            style={{
                width: "60px", height: "60px"
            }}>
        </lord-icon>
    </>
}
