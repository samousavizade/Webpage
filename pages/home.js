import * as React from 'react';
import {alpha, Box, Grid, Typography} from "@mui/material";
import SubmitToBlogComponent from "@/components/submit_comment";
import {useTheme} from '@mui/material/styles';
import Head from "next/head";
import SocrateImage from "../public/static/soc_wallpaper.jpg";
import Image from "next/image";

export default function Home(props) {
    const {
        navBarHeight,
        drawerWidthState,
        padding,
    } = props;

    const theme = useTheme();
    const themeMode = theme.palette.mode;

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Box
                width={`calc( 100vw - ${drawerWidthState})`}
                height={`calc( 100vh - ${navBarHeight})`}
                sx={{
                    overflow: "auto",
                }}
                padding={padding}
            >

                <Grid
                    container
                    style={{
                        // backgroundImage: `url(${SocrateImage.src})`,
                        // backgroundRepeat: "no-repeat",
                        // backgroundPosition: "center",
                        // backgroundSize: "cover",
                        borderRadius: 10,
                        width: '100%',
                        height: '100%',
                        position: "relative",
                    }}
                    // className={styles.leftSideImage}
                >
                    <Image
                        src={SocrateImage.src}
                        fill
                        style={{
                            borderRadius: 10
                        }}
                    />

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
                        md={"auto"}
                        lg={"auto"}
                        style={{
                            background: alpha(theme.palette.background.default, 0.15),
                            backdropFilter: "blur(4.5px)",
                            borderWidth: "5px",
                            border: "solid",
                            borderColor: alpha(theme.palette.background.default, 0.1),
                            borderRadius: "10px"


                        }}
                    >
                        <Typography variant={"h3"} component={"h1"}>
                            <span style={{color: theme.palette.text.primary}}><b>Welcome</b> </span><br/>
                            To My Page
                        </Typography>
                        <Typography
                            sx={{flexGrow: 1, marginTop: 1, maxWidth: 400}}
                            color={"white"}
                            textAlign={"justify"}
                            variant={"body1"} component={"h2"}
                        >
                            “If you don't get what you want, you suffer; if you get what you don't want, you suffer;
                            even when you get exactly what you want, you still suffer because you can't hold on to
                            it
                            forever. Your mind is your predicament. It wants to be free of change. Free of pain,
                            free of
                            the obligations of life and death. But change is law and no amount of pretending will
                            alter
                            that reality.” <b style={{color: theme.palette.secondary.main}}> - Socrates </b>
                        </Typography>

                        <SubmitToBlogComponent/>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}