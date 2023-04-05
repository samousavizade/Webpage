// import React, {useContext, useEffect, useState} from "react";
// import {styled, useTheme,} from "@mui/material/styles";
// import MuiDrawer from "@mui/material/Drawer";
// import Drawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
//
// import {ListItemButton, ListItemIcon, ListItemText, ListSubheader,} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//
// import {AppBarTitleEnum} from "@/components/app_bar_title_enum";
// import {drawerMainItemsParts, drawerSecondaryItemsParts,} from "./drawer_items";
//
// import PropTypes from "prop-types";
// import ListItem from "@mui/material/ListItem";
// import useDeviceSize from "@/components/use_device_size";
// import Link from "next/link"
//
//
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import useBreakpoint from "@/components/use_breakpoint";
// import ResponsiveIcon from "@/components/ResponsiveIcon";
// import {SKELETON_ACTION_TYPES, SkeletonContext} from "@/pages/_app";
//
// const LargeScreenAppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({theme, open, drawerWidth}) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100vw - ${drawerWidth})`,
//         transition: theme.transitions.create(["width", "margin"], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));
//
// const LargeScreenDrawer = styled(MuiDrawer, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({theme, open, drawerHeight, drawerWidth, drawerWidthWhileClosed}) => ({
//     "& .MuiDrawer-paper": {
//         position: "relative",
//         whiteSpace: "nowrap",
//         width: drawerWidth,
//         height: drawerHeight,
//         maxHeight: drawerHeight,
//         transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         boxSizing: "border-box",
//         ...(!open && {
//             overflowX: "hidden",
//             transition: theme.transitions.create("width", {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//             width: theme.spacing(7),
//             [theme.breakpoints.up("sm")]: {
//                 width: theme.spacing(drawerWidthWhileClosed),
//             },
//         }),
//     },
// }));
//
//
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
//
// NavBarDrawerComponent.propTypes = {
//     windowFunction: PropTypes.func,
// };
//
// export default NavBarDrawerComponent;
