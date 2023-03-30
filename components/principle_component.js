import {alpha, Box, Paper, Typography, useTheme} from "@mui/material";
import * as React from "react";
import {navBarHeight} from "@/pages/_app";
import Hegel from "../public/static/philosephors/hegel.jpg"
import SocrateImage from "@/public/static/soc_wallpaper.jpg";
import * as url from "url";

const PrincipleComponent = ({principleTitle, imageLink, text, author}) => {
    const theme = useTheme();

    // const imglink = "../public/static/philosephors/hegel.jpg";

    return (

        <Box
            container
            style={{
                backgroundImage: `url(${imageLink})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",

            }}
            margin={0}
            padding={0}
        >
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                    height: `calc( 100vh -  ${navBarHeight} - 6vh )`
                }}
                style={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.1),
                    backdropFilter: "blur(7px)",
                    borderColor: alpha(theme.palette.background.paper, 0.15),
                    borderStyle: "solid",
                    borderWidth: 20,
                }}
                variant={"outlined"}
            >
                <Typography
                    variant={"body1"} component={"h4"}
                    paddingRight={8}
                    paddingLeft={8}
                    paddingTop={8}

                    sx={{
                        flexGrow: 1,
                        alignItems: "center",
                    }}
                    style={{
                        alignContent: "center",
                        fontFamily: "Fondamento",
                        // textAlignLast: "center",
                    }}
                    textAlign={"justify"}

                >
                    <i>{"❝ " + text + " ❞"}</i>
                </Typography>

                <Typography
                    sx={{display: ""}}
                    // color={"white"}
                    variant={"h6"} component={"h6"}
                    paddingRight={8}
                    paddingLeft={8}
                    paddingBottom={8}
                    style={{
                        alignContent: "center",
                    }}
                    textAlign={"right"}
                    fontFamily={"Parisienne "}
                >
                    {author}
                </Typography>
            </Paper>
        </Box>
    )
}

export default PrincipleComponent;
