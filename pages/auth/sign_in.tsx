// import React, {useState} from "react";
// import {
//     Box,
//     Button,
//     Checkbox,
//     Collapse,
//     Flex,
//     FormControl,
//     FormErrorMessage,
//     FormLabel,
//     Heading,
//     Input,
//     InputGroup,
//     InputRightElement,
//     Link,
//     Stack,
//     Text,
//     useColorModeValue,
//     useDisclosure,
//     VStack,
// } from "@chakra-ui/react";
// import {useForm} from "react-hook-form";
// import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
// import {signIn, useSession} from "next-auth/react";
// import {logger} from "../../lib/logger";
// import {useRouter} from "next/router";

//icons

// export default function SimpleCard() {
//     const [showPassword, setShowPassword] = useState(false);
//     const {isOpen: isOpenCollapse, onToggle: onToggleCollapse} = useDisclosure();
//     const {isOpen: isOpenEmail, onToggle: onToggleEmail} = useDisclosure();
//     const {data: session, status} = useSession();
//     const router = useRouter();
//
//     const {
//         handleSubmit,
//         register,
//         watch,
//         formState: {errors, isSubmitting},
//     } = useForm();
//
//     let defaultBody = {
//         grant_type: "",
//         username: "asdf@gmail.com",
//         password: "asdf",
//         scope: "",
//         client_id: "",
//         client_secret: "",
//     };
//
//     async function onSubmit(values) {
//         try {
//             const body = {...defaultBody, ...values};
//             console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
//             let res = await signIn("credentials", {
//                 ...body,
//                 callbackUrl: router.query.callbackUrl,
//             });
//             logger.debug(`signing:onsubmit:res`, res);
//         } catch (error) {
//             logger.error(error);
//         }
//     }
//
//     if (status === "authenticated") {
//         router.push("/", {
//             query: {
//                 callbackUrl: router.query.callbackUrl,
//             },
//         });
//     }
//
//     return (
//         <Flex
//             minH={"100vh"}
//             align={"center"}
//             justify={"center"}
//             bg={useColorModeValue("gray.50", "gray.800")}
//         >
//             <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//                 <Stack align={"center"}>
//                     <Heading fontSize={"4xl"}>Sign in to your account</Heading>
//                     <Text fontSize={"lg"} color={"gray.600"}>
//                         to enjoy all of our cool{" "}
//                         <Link color={"blue.400"}>features</Link> ✌️
//                     </Text>
//                 </Stack>
//                 <Box
//                     rounded={"lg"}
//                     bg={useColorModeValue("white", "gray.700")}
//                     boxShadow={"lg"}
//                     p={8}
//                 >
//                     <VStack>
//                         <FormPasswordlessEmail/>
//                         <Button
//                             w="full"
//                             leftIcon={<AiFillGithub/>}
//                             onClick={() =>
//                                 signIn("github", {
//                                     callbackUrl: router.query.callbackUrl.toString(),
//                                 })
//                             }
//                         >
//                             Github
//                         </Button>
//                         <Button
//                             w="full"
//                             leftIcon={<BiLockAlt/>}
//                             onClick={onToggleCollapse}
//                         >
//                             User & password
//                         </Button>
//                     </VStack>
//                     <Collapse in={isOpenCollapse}>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <Stack spacing={4} pt={10}>
//                                 <FormControl
//                                     id="email-x"
//                                     isInvalid={Boolean(router.query.error)}
//                                     isRequired
//                                 >
//                                     <FormLabel>Email</FormLabel>
//                                     <Input type="email" {...register("username")} />
//                                 </FormControl>
//                                 <FormControl
//                                     id="password"
//                                     isRequired
//                                     isInvalid={Boolean(router.query.error)}
//                                 >
//                                     <FormLabel>Password</FormLabel>
//                                     <InputGroup>
//                                         <Input
//                                             type={showPassword ? "text" : "password"}
//                                             {...register("password")}
//                                         />
//                                         <InputRightElement h={"full"}>
//                                             <Button
//                                                 variant={"ghost"}
//                                                 _hover={{bg: "transparent"}}
//                                                 _active={{bg: "transparent"}}
//                                                 onClick={() =>
//                                                     setShowPassword(
//                                                         (showPassword) => !showPassword,
//                                                     )
//                                                 }
//                                             >
//                                                 {showPassword ? (
//                                                     <ViewIcon/>
//                                                 ) : (
//                                                     <ViewOffIcon/>
//                                                 )}
//                                             </Button>
//                                         </InputRightElement>
//                                     </InputGroup>
//                                     {router.query.error &&
//                                         router.query.error === "CredentialsSignin" && (
//                                             <FormErrorMessage>
//                                                 Invalid credentials
//                                             </FormErrorMessage>
//                                         )}
//                                 </FormControl>
//                                 <Stack spacing={10}>
//                                     <Stack
//                                         direction={{base: "column", sm: "row"}}
//                                         align={"start"}
//                                         justify={"space-between"}
//                                     >
//                                         <Checkbox>Remember me</Checkbox>
//                                         <Link color={"blue.400"}>Forgot password?</Link>
//                                     </Stack>
//                                     <Button
//                                         isLoading={isSubmitting}
//                                         loadingText="Signing in..."
//                                         bg={"blue.400"}
//                                         color={"black"}
//                                         type="submit"
//                                         _hover={{
//                                             bg: "blue.500",
//                                         }}
//                                     >
//                                         Sign in
//                                     </Button>
//                                 </Stack>
//                                 <Stack pt={6}>
//                                     <Text align={"center"}>
//                                         Not a user yet?{" "}
//                                         <Link
//                                             color={"black"}
//                                             href={`signup${
//                                                 router.query.callbackUrl
//                                                     ? `?callbackUrl=${router.query.callbackUrl}`
//                                                     : ""
//                                             }`}
//                                         >
//                                             Register
//                                         </Link>
//                                     </Text>
//                                 </Stack>
//                             </Stack>
//                         </form>
//                     </Collapse>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// }
import * as React from 'react';
import {useTheme} from "@mui/material/styles";
import Head from "next/head";
import {
    alpha,
    Box,
    Button,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper
} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import LiveFeedbackTextInput from "../../components/LiveFeedbackTextInput"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import {signIn, useSession} from "next-auth/react";
import {logger} from "../../lib/logger";
import {useRouter} from "next/router";
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const validationSchema = yup.object({

    email: yup
        .string()
        .email("Enter a valid mail please.")
        .required("Mail is required."),

    password: yup
        .string()
        .min(10, "Password must be at least 10 characters.")
        .required("Password is required"),

    // title: yup.string("Enter your comment title.").required("Title is required."),
    // description: yup
    //     .string("Enter your comment description.")
    //     .min(10, "Comment description must be at least 10 characters.")
    //     .required("Description is required."),
});

const SignInComponent = () => {

    const theme = useTheme();
    const {data: session, status} = useSession();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const body = {
                    // grant_type: "",
                    username: values.email,
                    password: values.password,
                    // scope: "",
                    // client_id: "",
                    // client_secret: "",
                };

                logger.debug(`POSTing ${JSON.stringify(body, null, 2)}`);
                let res = await signIn("credentials", {
                    ...body,
                    // redirect: false,
                    callbackUrl: "/home"
                });
            } catch (error) {
                logger.error(error);
            }

        },
    });


    if (status === "authenticated") {
        router.push("/home");
    } else {
        // handle error
    }

    const borderRadius = 10;

    ///////////////////////// show / hide passowrd /////////////////////////////////////
    // const [showPassword, setShowPassword] = React.useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };
    ////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Box
                style={{
                    position: "fixed",
                    top: "53%",
                    left: "50%",

                    /* bring your own prefixes */
                    transform: "translate(-50%, -50%)",
                }}

                sx={{
                    width: {
                        xs: "95%",
                        sm: "65%",
                        md: "55%",
                        lg: "50%"
                    },
                }}
            >
                <Paper
                    elevation={12}
                    style={{
                        alignItems: "center",
                        background: alpha(theme.palette.background.default, 0.55),
                        backdropFilter: "blur(9.5px)",
                        borderWidth: "5.5px",
                        borderRadius: borderRadius,
                        border: "solid",
                        borderColor: alpha(theme.palette.background.paper, 0.3),
                    }}
                >
                    <FormikProvider value={formik}>
                        <Form
                            style={{
                                borderRadius: borderRadius,
                            }}
                        >
                            <Grid
                                container
                                sx={{padding: 2}}
                            >
                                <Grid padding={1} item xs={12} sm={12} md={12} lg={12}>
                                    <LiveFeedbackTextInput
                                        fullWidth
                                        variant={"outlined"}
                                        required={true}

                                        label="Mail"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        formik={formik}
                                        helperText="Enter your mail address here."
                                        type="email"

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <MailOutlineIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid padding={1} item xs={12} sm={12} md={12} lg={12}>
                                    <LiveFeedbackTextInput
                                        fullWidth
                                        variant={"outlined"}
                                        required={true}

                                        label="Password"
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        formik={formik}
                                        helperText="Enter your desired password here."
                                        type="password"

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                {/*<Grid padding={1} item xs={12} sm={12} md={12} lg={12}>*/}
                                {/*    <LiveFeedbackTextInput*/}
                                {/*        fullWidth*/}
                                {/*        multiline*/}
                                {/*        rows={5}*/}
                                {/*        label="Description"*/}
                                {/*        id="description"*/}
                                {/*        name="description"*/}
                                {/*        value={formik.values.description}*/}
                                {/*        formik={formik}*/}
                                {/*        helperText="Feel free to ask me anything."*/}
                                {/*        type="text"*/}
                                {/*    />*/}
                                {/*</Grid>*/}

                                <Grid
                                    padding={1}
                                    sx={{marginX: "auto"}}
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                >
                                    <Button
                                        color={"primary"}
                                        variant="outlined"
                                        fullWidth
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </Paper>

                <Paper
                    elevation={12}
                    style={{
                        alignItems: "center",
                        backgroundColor: alpha(theme.palette.background.default, 0.3),
                        backdropFilter: "blur(9.5px)",
                        borderWidth: "5.5px",
                        borderRadius: borderRadius,
                        border: "solid",
                        borderColor: alpha(theme.palette.background.paper, 0.3),
                        marginTop: "1rem"
                    }}
                >

                    <List
                        style={{}}
                        subheader={
                            <ListSubheader
                                sx={{
                                    borderTopLeftRadius: borderRadius - 2,
                                    borderTopRightRadius: borderRadius - 2,
                                    backgroundColor: alpha(theme.palette.background.paper, 0.3),
                                }}
                            >
                                Sign in via:
                            </ListSubheader>
                        }
                    >
                        <ListItemButton onClick={() => {
                            signIn("google", {callbackUrl: 'http://localhost:3030/blog'}).then(r => r)
                        }}>
                            <ListItem>
                                <ListItemIcon>
                                    <GoogleIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Google"
                                />
                            </ListItem>
                        </ListItemButton>


                        <ListItemButton disabled onClick={() => {
                            signIn("github", {callbackUrl: "/home"}).then(r => r)
                        }}>
                            <ListItem>
                                <ListItemIcon>
                                    <GitHubIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="GitHub"/>
                            </ListItem>
                        </ListItemButton>


                        <ListItemButton disabled onClick={() => {
                            signIn("linkedin", {callbackUrl: "/home"}).then(r => r)
                        }}>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkedInIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="LinkedIn"/>
                            </ListItem>
                        </ListItemButton>

                    </List>
                </Paper>


            </Box>

        </>
    )

}

export default SignInComponent;