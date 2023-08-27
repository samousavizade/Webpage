import '../styles/globals.css'
import NavigationBarComponent from "../components/navigation_bar";
import {MDXProvider} from '@mdx-js/react'
import React, {createContext, useEffect, useReducer, useState} from "react";
import {Box, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import Head from "next/head";
import {LazyPlot} from "../components/article_page/plotly_figure";
import "@code-hike/mdx/dist/index.css"
import useBreakpoint, {responsiveIconSize} from "../components/use_breakpoint";

import Image from "next/image"
import lightThemeBackground from "../public/static/bg_light.png"
import darkThemeBackground from "../public/static/bg_dark.png"
import {AppBarTitleEnum} from "../components/app_bar_title_enum";

import {SessionProvider, useSession} from 'next-auth/react';
import Protected from "../pages/protected";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export const SKELETON_ACTION_TYPES = {
    SET_NAVBAR_HEIGHT: "SET_NAVBAR_HEIGHT",
    SET_PADDING: "SET_PADDING",
    SET_DRAWER_WIDTH: "SET_DRAWER_WIDTH",
    SET_OPEN: "SET_OPEN",
    SET_NAVBAR_TITLE: "SET_NAVBAR_TITLE",
}


const skeletonReducer = (state, action) => {
    switch (action.type) {
        case SKELETON_ACTION_TYPES.SET_NAVBAR_TITLE: {
            return {...state, navBarTitle: action.payload.navBarTitle}
        }
        case SKELETON_ACTION_TYPES.SET_NAVBAR_HEIGHT: {
            return {...state, navBarHeight: action.payload.navBarHeight}
        }
        case SKELETON_ACTION_TYPES.SET_DRAWER_WIDTH: {
            return {...state, drawerWidth: action.payload.drawerWidth}
        }
        case SKELETON_ACTION_TYPES.SET_PADDING: {
            return {...state, padding: action.payload.padding}
        }
        case SKELETON_ACTION_TYPES.SET_OPEN: {
            return {...state, open: action.payload.open}
        }
        default: {
            throw new Error(`Unhandled action type ${action.type} received.`)
        }
    }
}

export const SkeletonContext = createContext();

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


export default function App({
                                Component,
                                emotionCache = clientSideEmotionCache,
                                pageProps
                            }) {

    const drawerWidthWhileClosed = `calc(2*${responsiveIconSize(useBreakpoint())} + 0.4rem)`;


    const [activeTheme, setActiveTheme] = useState(lightTheme);
    const [activeThemeName, setActiveThemeName] = useState('light'); // either light or dark

    const toggleTheme = () => {
        const desiredThemeName = activeThemeName === 'light' ? 'dark' : 'light';
        setActiveThemeName(desiredThemeName);

        // localStorage.setItem("mode", desiredThemeName)

    };

    useEffect(() => {

        // if (localStorage.getItem("mode")) {
        //     setActiveTheme(localStorage.getItem("mode") === "dark" ? darkTheme : lightTheme);
        // } else {
        setActiveTheme(activeThemeName === "dark" ? darkTheme : lightTheme);
        // }

    }, [activeThemeName]);


    //.........................................................

    const navBarHeight = "10vh";
    const padding = "2vw";
    const open = false;

    const SkeletonProvider = ({children}) => {

        const initialState = {
            navBarHeight: navBarHeight,
            drawerWidth: drawerWidthWhileClosed,
            open: open,
            padding: padding,
            navBarTitle: AppBarTitleEnum.HOME
        }


        const [state, dispatch] = useReducer(skeletonReducer, initialState,);

        return (
            <SkeletonContext.Provider value={{state, dispatch}}>
                {children}
            </SkeletonContext.Provider>
        )
    }

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
            <CacheProvider value={emotionCache}>

                <Head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                          rel="stylesheet"
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
                    <div
                        style={{
                            zIndex: -1,
                            position: "fixed",
                            width: "100vw",
                            height: "100vh",
                        }}
                    >
                        <Image
                            src={themeBackground.src}
                            alt={"background"}
                            quality={88}
                            fill
                        />
                    </div>
                    <SkeletonProvider>
                        <SessionProvider session={pageProps.session}>
                            <NavigationBarComponent
                                selectedTheme={activeThemeName}
                                toggleTheme={toggleTheme}

                                navBarHeight={navBarHeight}
                            >

                                <MDXProvider components={components}>
                                    {/*{Component.auth ? (*/}
                                    {/*    <Auth>*/}
                                    <Component {...pageProps} />
                                    {/*</Auth>*/}
                                    {/*) : (*/}
                                    {/*    <Component {...pageProps} />*/}
                                    {/*)}*/}
                                </MDXProvider>


                            </NavigationBarComponent>
                        </SessionProvider>
                    </SkeletonProvider>
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

function Auth({children}) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const {status} = useSession({required: true})

    if (status === "loading") {
        return <Protected/>
    }

    return children
}
