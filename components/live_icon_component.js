import React, {useState} from "react";
import {Button, Stack} from "@mui/material";
import Link from "next/link";

import styles from "./LiveIconComponent.module.css"
import useBreakpoint, {responsiveIconSize} from "./use_breakpoint";

const LiveIconComponent = ({text, icon, to, showText, sx}) => {
    const [hover, setHoverState] = useState(false);

    return (<Button
        className={styles.liveIcon}
        onMouseOver={() => setHoverState(true)}
        onMouseOut={() => setHoverState(false)}
        variant={hover ? "contained" : "outlined"}
        raised={hover.raised}
        zdepth={50}
    >
        <Link href={to} legacyBehavior>
            <Stack direction={"rows"}>
                {React.createElement(icon, {sx: {fontSize: responsiveIconSize(useBreakpoint()), ...sx}})}
            </Stack>
        </Link>
    </Button>);
};

export default LiveIconComponent;
