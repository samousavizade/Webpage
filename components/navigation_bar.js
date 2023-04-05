import React, {useContext} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';

import {
    alpha,
    AppBar,
    Button,
    Divider,
    Drawer,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useScrollTrigger
} from "@mui/material";
import {SKELETON_ACTION_TYPES, SkeletonContext} from "@/pages/_app";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"

import {useTheme} from "@mui/material/styles";
import ResponsiveIcon from "@/components/ResponsiveIcon";
import {drawerMainItemsParts, drawerSecondaryItemsParts,} from "./drawer_items";
import Link from "next/link";
import {useRouter} from "next/router";
import {AppBarTitleEnum} from "@/components/app_bar_title_enum";

// function NavBarDrawerComponent(props) {
//     const theme = useTheme();
//
//     const {state, dispatch} = useContext(SkeletonContext);
//
//     const {
//         windowFunction,
//         children,
//
//         selectedTheme,
//         toggleTheme,
//
//         navBarHeight,
//         drawerWidthWhileExpanded,
//         drawerWidthWhileClosed,
//         drawerWidthInSmallScreen,
//     } = props;
//     const toggleDrawer = () => {
//         // setOpen(!open);
//         dispatch({
//             type: SKELETON_ACTION_TYPES.SET_OPEN,
//             payload: {
//                 open: !state.open,
//             }
//         })
//     };
//
//     const [windowWidth, windowHeight] = useDeviceSize();
//
//     const container =
//         windowFunction !== undefined
//             ? () => windowFunction().document.body
//             : undefined;
//
//     // useEffect(() => {
//     //
//     //     if (windowWidth < theme.breakpoints.values.sm) {
//     //         dispatch({
//     //             type: SKELETON_ACTION_TYPES.SET_DRAWER_WIDTH,
//     //             payload: {
//     //                 drawerWidth: 0,
//     //             }
//     //         })
//     //     } else {
//     //         if (state.open) {
//     //             dispatch({
//     //                 type: SKELETON_ACTION_TYPES.SET_DRAWER_WIDTH,
//     //                 payload: {
//     //                     drawerWidth: drawerWidthWhileExpanded,
//     //                 }
//     //             })
//     //         } else {
//     //             // setDrawerWidthState(drawerWidthWhileClosed)
//     //             dispatch({
//     //                 type: SKELETON_ACTION_TYPES.SET_DRAWER_WIDTH,
//     //                 payload: {
//     //                     drawerWidth: drawerWidthWhileClosed,
//     //                 }
//     //             })
//     //         }
//     //     }
//     //
//     // }, []);
//
//
//     const drawerComponent =
//         // 600 is sm in mui
//         (windowWidth > theme.breakpoints.values.sm) ? (
//             <LargeScreenDrawer
//                 drawerWidth={drawerWidthWhileExpanded}
//                 drawerWidthWhileClosed={drawerWidthWhileClosed}
//                 variant="permanent"
//                 open={state.open}
//             >
//                 <Toolbar
//                     sx={{
//                         display: "flex",
//                         height: navBarHeight,
//                         alignItems: "center",
//                         justifycontent: "flex-end",
//                         px: [1],
//                         // TODO: todo
//                     }}
//                 >
//                     <IconButton onClick={toggleDrawer}>
//                         {state.open ? <ResponsiveIcon icon={ChevronLeftIcon}/> : <></>}
//                     </IconButton>
//                 </Toolbar>
//                 <Divider/>
//                 <List component="nav">
//                     {drawerMainItemsParts.map((item) => {
//                         return (
//                             <Link
//                                 key={item.title}
//                                 legacyBehavior
//                                 href={item.to}
//                             >
//                                 <a>
//                                     <ListItemButton
//                                         key={item.title}
//                                         data={item}
//                                         onClick={(e) => {
//                                             dispatch({
//                                                 type: SKELETON_ACTION_TYPES.SET_NAVBAR_TITLE,
//                                                 payload: {
//                                                     navBarTitle: item.title,
//                                                 }
//                                             })
//                                         }}
//                                     >
//                                         <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
//                                         <ListItemText primary={item.title}/>
//                                     </ListItemButton>
//                                 </a>
//                             </Link>
//                         );
//                     })}
//
//                     <Divider sx={{my: 1}}/>
//
//                     {drawerSecondaryItemsParts.map((item) => {
//                         return (
//                             <Link
//                                 key={item.title}
//                                 legacyBehavior
//                                 href={item.to}
//                             >
//                                 <a>
//                                     <ListItemButton key={item.title}>
//                                         <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
//                                         <ListItemText primary={item.title}/>
//                                     </ListItemButton>
//                                 </a>
//                             </Link>
//                         );
//                     })}
//                 </List>
//             </LargeScreenDrawer>
//
//         ) : (
//             <Drawer
//                 container={container}
//                 variant="temporary"
//                 open={state.open}
//                 onClose={toggleDrawer}
//                 ModalProps={{
//                     keepMounted: true,
//                 }}
//                 sx={{
//                     display: {xs: "block", sm: "none"},
//                     "& .MuiDrawer-paper": {
//                         boxSizing: "border-box",
//                         width: drawerWidthWhileExpanded,
//                     },
//                 }}
//             >
//                 <Toolbar
//                     sx={{
//                         display: "flex",
//                         minHeight: navBarHeight,
//                         alignItems: "center",
//                         justifycontent: "flex-end",
//                     }}
//                 />
//                 <Divider/>
//                 <List component="nav">
//                     {drawerMainItemsParts.map((item) => {
//                         return (
//                             <ListItem key={item.title} disablePadding>
//
//                                 <Link legacyBehavior href={item.to}>
//                                     <a>
//                                         <ListItemButton
//                                             data={item}
//                                             onClick={(e) => {
//                                                 dispatch({
//                                                     type: SKELETON_ACTION_TYPES.SET_NAVBAR_TITLE,
//                                                     payload: {
//                                                         navBarTitle: item.title,
//                                                     }
//                                                 })
//                                             }}
//                                         >
//                                             <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
//                                             <ListItemText primary={item.title}/>
//                                         </ListItemButton>
//                                     </a>
//                                 </Link>
//                             </ListItem>
//
//                         );
//                     })}
//
//                     <Divider sx={{my: 1}}/>
//
//                     <ListSubheader component="div" inset>
//                         Links
//                     </ListSubheader>
//
//                     {drawerSecondaryItemsParts.map((item) => {
//                         return (
//                             <ListItemButton key={item.title}>
//                                 <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
//                                 <ListItemText primary={item.title}/>
//                             </ListItemButton>
//                         );
//                     })}
//                 </List>
//
//                 <Divider/>
//             </Drawer>
//         );
//
//
//     return (
//         <Box sx={{display: "flex"}}>
//             <LargeScreenAppBar
//                 style={{
//                     background: theme.palette.primary.main,
//                 }}
//
//                 open={state.open}
//                 drawerWidth={drawerWidthWhileExpanded}
//             >
//                 <Toolbar
//                     sx={{
//                         height: navBarHeight
//                     }}
//                 >
//                     <IconButton
//                         edge="start"
//                         aria-label="open drawer"
//                         onClick={toggleDrawer}
//                         sx={{
//                             marginRight: "0.5rem",
//                             ...(state.open && {display: "none"}),
//                         }}
//                     >
//                         {<ResponsiveIcon icon={MenuIcon}/>}
//                     </IconButton>
//                     <Typography
//                         component="h1"
//                         variant="h4"
//                         color={"text.primary"}
//                         noWrap
//                         sx={{flexGrow: 1}}
//                     >
//                         {state.navBarTitle}
//                     </Typography>
//                     <Typography
//                         component="h1"
//                         variant="subtitle1"
//                         color={"text.primary"}
//                         noWrap
//                     >
//                         {useBreakpoint()}
//                     </Typography>
//
//
//                     <IconButton
//                         onClick={toggleTheme}
//                         color="inherit"
//                     >
//                         {selectedTheme === "dark" ? (
//                             <ResponsiveIcon icon={Brightness4Icon} sx={{color: theme.palette.text.primary}}/>
//                         ) : (
//                             <ResponsiveIcon icon={Brightness7Icon} sx={{color: theme.palette.text.primary}}/>
//                         )}
//                     </IconButton>
//                 </Toolbar>
//             </LargeScreenAppBar>
//
//             {drawerComponent}
//
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     width: 1,
//                     height: windowHeight,
//                     overflow: "auto",
//                 }}
//             >
//                 <Toolbar
//                     sx={{
//                         // pr: "32px",
//                         width: 1,
//                         height: navBarHeight
//                     }}
//                 />
//                 {children}
//             </Box>
//         </Box>
//     );
// }
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function ScrollTop(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    );
}

function ElevationScroll(props) {
    const {children, window, theme} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        style: {
            backgroundColor: trigger ? theme.palette.primary.main : `rgba(255, 255, 255, 0)`,
        }
    });
}

function getCurrentTabTitle(router) {
    const pathname = router.pathname;
    switch (pathname) {
        case "/home":
            return AppBarTitleEnum.HOME

        case "/blog":
            return AppBarTitleEnum.BLOG

        case "/principles":
            return AppBarTitleEnum.PRINCIPLES

        case "/about":
            return AppBarTitleEnum.ABOUT_ME

        case "/projects":
            return AppBarTitleEnum.PROJECTS

        case "/courses":
            return AppBarTitleEnum.COURSES

        default:
            if (pathname.startsWith("/blog")) {
                return AppBarTitleEnum.BLOG
            } else {
                return AppBarTitleEnum.Others
            }
    }
}

function NavBarDrawerComponent(props) {

    console.log("mamad")

    const {state, dispatch} = useContext(SkeletonContext);
    const theme = useTheme();
    const router = useRouter();

    const currentTabTitle = getCurrentTabTitle(router);

    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2, ml: 2.5}} textAlign={"left"}>
                Sections
            </Typography>
            <Divider/>
            <List component="nav">
                {drawerMainItemsParts.map((item) => {
                    return (
                        <ListItem key={item.title} disablePadding>
                            <Link legacyBehavior href={item.to}>
                                <a>
                                    <ListItemButton
                                        data={item}
                                        onClick={(e) => {
                                            dispatch({
                                                type: SKELETON_ACTION_TYPES.SET_NAVBAR_TITLE,
                                                payload: {
                                                    navBarTitle: item.title,
                                                }
                                            })
                                        }}
                                    >
                                        <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
                                        <ListItemText primary={item.title}/>
                                    </ListItemButton>
                                </a>
                            </Link>
                        </ListItem>

                    );
                    ``
                })}

                <Divider sx={{my: 1}}/>
                <Typography variant="body1" sx={{my: 2, ml: 2.5}} textAlign={"left"}>
                    Links
                </Typography>
                <Divider/>

                {drawerSecondaryItemsParts.map((item) => {
                    return (
                        <ListItemButton key={item.title}>
                            <ListItemIcon><ResponsiveIcon icon={item.icon}/></ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    );
                })}
            </List>

        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <React.Fragment>
            <ElevationScroll theme={theme} {...props}>
                <AppBar elevation={0} component="nav">
                    <Toolbar sx={{height: props.navBarHeight}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{display: {md: 'none'}}}
                        >
                            {<ResponsiveIcon style={{color: theme.palette.text.primary}} icon={MenuIcon}/>}
                        </IconButton>
                        <Typography
                            color={theme.palette.text.primary}
                            sx={{mr: 1, display: {md: 'none'}}}
                        >
                            {currentTabTitle}
                        </Typography>

                        <Icon
                            sx={{
                                mr: 2.5,
                                display: {sm: 'none', xs: 'none', md: 'block'},
                            }}
                        >
                            <img style={{
                                display: 'flex',
                                height: 'inherit',
                                width: 'inherit'
                            }} src="/favicon.svg"/>
                        </Icon>

                        <Box sx={{display: {sm: 'none', xs: 'none', md: 'block'}}}>
                            {drawerMainItemsParts.map((item) => {

                                let isActiveTab = currentTabTitle === item.title;

                                return (
                                    <Link href={item.to} key={item.title}>
                                        <Button
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "grey",
                                                }
                                            }}
                                            style={{
                                                borderBottomWidth: 3,
                                                borderBottomColor: isActiveTab ? theme.palette.text.primary : `rgba(255, 255, 255, 0)`,
                                                borderStyle: "solid",
                                                borderRadius: 0,
                                                color: isActiveTab ? theme.palette.text.primary : alpha(theme.palette.text.primary, 0.7),
                                            }}
                                            onClick={(e) => {
                                                dispatch({
                                                    type: SKELETON_ACTION_TYPES.SET_NAVBAR_TITLE,
                                                    payload: {
                                                        navBarTitle: item.title,
                                                    }
                                                })
                                            }}
                                        >
                                            <Typography
                                                color={theme.palette.text.primary}
                                            >
                                                {item.title}
                                            </Typography>
                                        </Button>
                                    </Link>
                                );
                            })}

                        </Box>
                        <IconButton
                            onClick={props.toggleTheme}
                            sx={{
                                alignSelf: "right",
                                marginLeft: "auto",
                            }}
                        >
                            {props.selectedTheme === "dark" ? (
                                <ResponsiveIcon icon={Brightness4Icon} sx={{color: theme.palette.text.primary}}/>
                            ) : (
                                <ResponsiveIcon icon={Brightness7Icon} sx={{color: theme.palette.text.primary}}/>
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {sm: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* id is important for query selector */}
            <Toolbar id="back-to-top-anchor"/>
            <Box display={"flex"} sx={{overflow: "auto", p: state.padding}}>
                {props.children}
            </Box>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default NavBarDrawerComponent;
