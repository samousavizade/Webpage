// 404.js

import {AnimatedHomeIcon} from "@/components/AnimatedIcons";
import * as React from 'react';
import {
    alpha,
    Box,
    Grid,
    ListItem,
    ListItemButton,
    CircularProgress,
    ListItemIcon,
    ListItemText,
    Typography,
    Stack
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import Head from "next/head";
import Link from "next/link";

import {padding} from "./_app"
export default function Loading(props) {
    const {
        navBarHeight,
        drawerWidthState,
    } = props;

    const theme = useTheme();

    return (
        <>
            <Head>
                <title>Loading ...</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <Box
                width={`calc( 100vw - ${drawerWidthState} - 40vw)  `}
                sx={{
                    overflow: "auto",
                    mx: "auto",
                }}
                padding={`calc(4*${padding})`}
            >

                <Grid
                    container
                    height={1}
                >
                    <Grid
                        item
                        padding={2}
                        margin={1}

                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            background: alpha(theme.palette.background.default, 0.35),
                            backdropFilter: "blur(10.5px)",
                            borderWidth: 50,
                            border: "solid",
                            borderColor: alpha(theme.palette.background.paper, 0.2),
                        }}
                    >
                        <ListItem sx={{height: "12vh", flexGrow: 1}} style={{backgroundColor: theme.palette.primary.main}} alignSelf={"center"} alignItems={"center"} alignContent={"center"}>
                            <ListItemIcon>
                                <CircularProgress color="secondary"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography color={theme.palette.text.primary} variant={"h5"} component={"h1"} >
                                    Loading ...
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <Box >

                        </Box>

                        <Link
                            legacyBehavior
                            href={"/home"}
                        >
                            <a>
                                <ListItemButton
                                    sx={{height: "12vh"}}
                                    key={"backtohome"}
                                >
                                    <ListItemIcon><AnimatedHomeIcon/></ListItemIcon>
                                    <ListItemText padding={10} primary={
                                        <Typography
                                            color={theme.palette.text.primary}
                                            variant={"body1"}
                                        >
                                            Back To Home
                                        </Typography>}
                                    />
                                </ListItemButton>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}