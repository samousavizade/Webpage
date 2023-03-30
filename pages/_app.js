import '@/styles/globals.css'
import NavigationBarComponent from "@/components/navigation_bar";
import {MDXProvider} from '@mdx-js/react'
import React, {useEffect, useState} from "react";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import Head from "next/head";
import {LazyPlot} from "@/components/article_page/plotly_figure";
import "@code-hike/mdx/dist/index.css"
import useBreakpoint, {responsiveIconSize} from "@/components/use_breakpoint";
import lightThemeBackground from "../public/static/bg_light.png"
import darkThemeBackground from "../public/static/bg_dark.png"

export const navBarHeight = "12vh";
export const padding = "2vw";

export default function App({Component, pageProps}) {

    const drawerWidthWhileExpanded = "225px";
    const drawerWidthWhileClosed = `calc(2*${responsiveIconSize(useBreakpoint())} + 0.4rem)`;
    const drawerWidthInSmallScreen = "0px";

    let lightTheme = createTheme({
        palette: {
            mode: "light", primary: {
                main: '#2196f3',
            }, secondary: {
                main: '#ffc400',
            }, neutral: {
                main: '#64748B', contrastText: '#fff',
            }, text: {
                primary: '#000000',
                secondary: '#4e5052',
                disabled: '#d0d0d0',

            }
        },
    });

    lightTheme = responsiveFontSizes(lightTheme);

    let darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: '#2196f3',

            }, secondary: {
                main: '#ffc400',

            }, neutral: {
                main: '#64748B', contrastText: '#fff',
            },
            text: {
                primary: '#ffffff',
                secondary: '#939698',
                disabled: '#565555',

            }
        },
    });

    darkTheme = responsiveFontSizes(darkTheme);

    const [activeTheme, setActiveTheme] = useState(lightTheme);
    const [activeThemeName, setActiveThemeName] = useState('light'); // either light or dark

    const toggleTheme = () => {
        const desiredThemeName = activeThemeName === 'light' ? 'dark' : 'light';

        setActiveThemeName(desiredThemeName);
    };

    useEffect(() => {
        setActiveTheme(activeThemeName === "dark" ? darkTheme : lightTheme);
    }, [activeThemeName]);


    //.........................................................

    const [drawerWidthState, setDrawerWidthState] = useState(drawerWidthWhileClosed);
    const [open, setOpen] = React.useState(false);

    pageProps.navBarHeight = navBarHeight;
    pageProps.drawerWidthState = drawerWidthState;
    pageProps.padding = padding;


    const themeBackground = activeThemeName === "dark" ? darkThemeBackground : lightThemeBackground;
    const components = {
        table: props => <table
            className={`table table-borderless table-sm table-striped table-${activeThemeName} table-hover`}
            {...props}
        />,

        // img: ResponsiveImage,
        // Header Row Styling
        thead: props => <thead {...props} />,
        th: props => <th style={{background: activeTheme.palette.secondary.main}} {...props} />,

        LazyPlot,
    }

    return (<>
            <Head>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossOrigin="anonymous"
                />

                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossOrigin="anonymous"
                    defer
                >
                </script>
            </Head>


            <ThemeProvider theme={activeTheme}>

                <CssBaseline/>
                <style jsx global>{`
                  body {
                    background: url(${themeBackground.src});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                  }
                `}</style>
                <NavigationBarComponent
                    selectedTheme={activeThemeName}
                    toggleTheme={toggleTheme}

                    navBarHeight={navBarHeight}
                    drawerWidthWhileExpanded={drawerWidthWhileExpanded}
                    drawerWidthWhileClosed={drawerWidthWhileClosed}
                    drawerWidthInSmallScreen={drawerWidthInSmallScreen}

                    drawerWidthState={drawerWidthState}
                    setDrawerWidthState={setDrawerWidthState}

                    open={open}
                    setOpen={setOpen}
                >
                    <MDXProvider components={components}>
                        <Component {...pageProps} />
                    </MDXProvider>


                    {/*<footer>*/}
                    {/*    <Box minHeight={100} bgcolor={"red"}>*/}
                    {/*        Salam*/}
                    {/*    </Box>*/}
                    {/*</footer>*/}
                </NavigationBarComponent>

            </ThemeProvider>
        </>
    )
}
