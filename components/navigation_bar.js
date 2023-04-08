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
    Avatar,
    Button,
    ButtonGroup,
    Divider,
    Drawer,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    useScrollTrigger
} from "@mui/material";
import {SKELETON_ACTION_TYPES, SkeletonContext} from "../pages/_app";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Person2Icon from '@mui/icons-material/Person2';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Logout from "@mui/icons-material/Logout"

import {useTheme} from "@mui/material/styles";
import ResponsiveIcon from "./ResponsiveIcon";
import {drawerMainItemsParts, drawerSecondaryItemsParts,} from "./drawer_items";
import Link from "next/link";
import {useRouter} from "next/router";
import {AppBarTitleEnum} from "./app_bar_title_enum";
import {signOut, useSession} from "next-auth/react";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import {grey} from "@mui/material/colors";
import useBreakpoint from "./use_breakpoint";


const drawerWidth = 240;

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

// functi`on ElevationScroll(props) {
//     const {children, window, theme} = props;
//     // Note that you normally won't need to set the window ref as useScrollTrigger
//     // will default to window.
//     // This is only being set here because the demo is in an iframe.
//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 50,
//         target: window ? window() : undefined,
//     });
//
//     return React.cloneElement(children, {
//         style: {
//             backgroundColor: trigger ? theme.palette.primary.main : `rgba(255, 255, 255, 0)`,
//         }
//     });
// }

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

function dateDiff(d1, d2) {
    const diff = d1 - d2;
    const parts = {
        diff: diff,
        ms: Math.floor(diff % 1000),
        s: Math.floor(diff / 1000 % 60),
        m: Math.floor(diff / 60000 % 60),
        h: Math.floor(diff / 3600000 % 24),
        d: Math.floor(diff / 86400000)
    };

    return `${parts.h}:${parts.m}:${parts.s}`
}

function NavBarDrawerComponent(props) {
    const {data: session, status} = useSession();

    const {state, dispatch} = useContext(SkeletonContext);
    const theme = useTheme();

    // auth
    const router = useRouter();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    // main logic

    const currentTabTitle = getCurrentTabTitle(router);

    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2, ml: 2.5}} textalign={"left"}>
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
                <Typography variant="body1" sx={{my: 2, ml: 2.5}} textalign={"left"}>
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

    //////////////////// Elevation Effect /////////////////////

    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined,
    });

    const currentBreakpoint = useBreakpoint();
    const isMobileSizeScreen = ["xs", "sm"].includes(currentBreakpoint);

    ////////////////////////// Login Register / User Avatar ////////////////////////
    let element = null;
    if (status === 'loading') {
        element = (
            <>
                <Typography
                    color={theme.palette.text.primary}
                >
                    Validating session...
                </Typography>
            </>
        );
    } else if (status === 'unauthenticated') {
        element = (
            <>
                {/*"/api/auth/signin"*/}
                <ButtonGroup>

                    <Button
                        component={Link}
                        href={"/auth/sign_up"}
                        variant={trigger ? "contained" : "outlined"}
                        color={"success"}
                        size={isMobileSizeScreen ? "small" : "medium"}
                        endIcon={<AppRegistrationIcon fontSize={"small"}/>}
                        sx={{
                            '&:hover': {
                                color: trigger ? theme.palette.background.default : theme.palette.success.main
                            }
                        }}
                    >
                        Register
                    </Button>

                    <Button
                        component={Link}
                        // href={"/api/auth/signin"}
                        href={"/auth/sign_in"}
                        variant={"outlined"}
                        size={isMobileSizeScreen ? "small" : "medium"}
                        // onClick={() => signIn()}
                        endIcon={<LoginIcon fontSize={"small"}/>}
                        sx={{
                            color: trigger ? theme.palette.background.default : theme.palette.primary.main,
                            '&:hover': {
                                color: trigger ? theme.palette.background.default : theme.palette.primary.main
                            }
                        }}
                    >
                        Login
                    </Button>

                </ButtonGroup>

            </>

        );
    } else if (status === 'authenticated') {
        element = (
            <>
                <Box marginRight={1}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt={session.user.name} src={session.user.image}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <Person2Icon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                {session.user.name}
                            </ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <EmailIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                {session.user.email}
                            </ListItemText>
                        </MenuItem>
                        <Divider/>
                        <MenuItem>
                            <ListItemIcon>
                                <ChatBubbleIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                Comments
                            </ListItemText>
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => signOut()}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText style={{textDecoration: 'none'}}>
                                Logout
                            </ListItemText>
                        </MenuItem>

                    </Menu>
                </Box>
                {/*<Typography>*/}
                {/*    {session.user.name} ({session.user.email}) {session.user.image}*/}
                {/*</Typography>*/}
                {/*<Link href={pathname} key={pathname}>*/}
                {/*    <Button*/}
                {/*        sx={{*/}
                {/*            "&:hover": {*/}
                {/*                backgroundColor: "grey",*/}
                {/*            }*/}
                {/*        }}*/}
                {/*        style={{*/}
                {/*            borderBottomWidth: 3,*/}
                {/*            borderBottomColor: isActive(pathname) ? theme.palette.text.primary : `rgba(255, 255, 255, 0)`,*/}
                {/*            borderStyle: "solid",*/}
                {/*            borderRadius: 0,*/}
                {/*            color: isActive(pathname) ? theme.palette.text.primary : alpha(theme.palette.text.primary, 0.7),*/}
                {/*        }}*/}
                {/*        onClick={(e) => {*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Typography*/}
                {/*            color={theme.palette.text.primary}*/}
                {/*        >*/}
                {/*            Drafts*/}
                {/*        </Typography>*/}
                {/*    </Button>*/}
                {/*</Link>*/}
            </>
        );
    }
    ////////////////////////////////////////////////////////////////////////////////

    return (
        <React.Fragment>
            <AppBar enableColorOnDark sx={{backgroundColor: trigger ? theme.palette.primary : `rgba(255, 255, 255, 0)`}}
                    elevation={0}
                    component="nav">
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
                                                backgroundColor: trigger ? theme.palette.primary.dark : grey.A400,
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

                    <Box sx={{flexGrow: 1}}>
                    </Box>

                    {element}

                    <Tooltip title="Change theme">
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
                    </Tooltip>
                </Toolbar>
            </AppBar>
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
