// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   HStack,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Link,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { useForm } from "react-hook-form";
// import { logger } from "lib/logger";
// import { useRouter } from "next/router";
// import { resetLevel } from "loglevel";
//
// export default function SignupCard() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     handleSubmit,
//     register,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm();
//
//   async function onSubmit(values) {
//     try {
//       const body = { ...values };
//       console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
//       const res = await fetch(`/api/user/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       logger.debug(`res`, res);
//       reset();
//       router.push(
//         `signin${
//           router.query.callbackUrl
//             ? `?callbackUrl=${router.query.callbackUrl}`
//             : ""
//         }`,
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   }
//
//   return (
//     <Flex
//       minH={"100vh"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack
//         spacing={8}
//         mx={"auto"}
//         w={{ md: "md" }}
//         maxW={"lg"}
//         py={12}
//         px={6}
//       >
//         <Stack align={"center"}>
//           <Heading fontSize={"4xl"} textalign={"center"}>
//             Sign up
//           </Heading>
//           <Text fontSize={"lg"} color={"gray.600"}>
//             to enjoy all of our cool features ✌️
//           </Text>
//         </Stack>
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("white", "gray.700")}
//           boxShadow={"lg"}
//           p={8}
//         >
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={4}>
//               <Box>
//                 <FormControl id="fullName" isRequired>
//                   <FormLabel>Full name</FormLabel>
//                   <Input type="text" {...register("name")} />
//                 </FormControl>
//               </Box>
//               <FormControl id="email" isRequired>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" {...register("email")} />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <InputGroup>
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     {...register("password")}
//                   />
//                   <InputRightElement h={"full"}>
//                     <Button
//                       variant={"ghost"}
//                       _hover={{ bg: "transparent" }}
//                       _active={{ bg: "transparent" }}
//                       onClick={() =>
//                         setShowPassword(
//                           (showPassword) => !showPassword,
//                         )
//                       }
//                     >
//                       {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={10} pt={2}>
//                 <Button
//                   loadingText="Submitting"
//                   size="lg"
//                   type="submit"
//                   isLoading={isSubmitting}
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "blue.500",
//                   }}
//                 >
//                   Sign up
//                 </Button>
//               </Stack>
//               <Stack pt={6}>
//                 <Text align={"center"}>
//                   Already a user?{" "}
//                   <Link color={"blue.400"} href="signin">
//                     Sign in
//                   </Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </form>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// }

import * as React from 'react';
import {useContext, useState} from 'react';
import {useTheme} from "@mui/material/styles";
import Head from "next/head";
import {
    Alert,
    alpha,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    InputAdornment,
    Paper,
    Snackbar,
    Typography
} from "@mui/material";
import {SkeletonContext} from "../../pages/_app"
import {Form, FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import LiveFeedbackTextInput from "../../components/LiveFeedbackTextInput"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useSession} from "next-auth/react";
import {logger} from "../../lib/logger";
import {useRouter} from "next/router";
import Fade from "@mui/material/Fade";
import LoadingButton from '@mui/lab/LoadingButton';

const validationSchema = yup.object({
    name: yup
        .string()
        .required("Name is required."),

    email: yup
        .string()
        .email("Enter a valid mail please.")
        .required("Mail is required."),

    password: yup
        .string()
        .min(10, "Password must be at least 10 characters.")
        .required("Password is required."),

    confirm: yup.boolean().required("Agreement is required.")
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const SignUpComponent = () => {

    const theme = useTheme();
    const {state, dispatch} = useContext(SkeletonContext);
    const {data: session, status} = useSession();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm: false,
        },
        initialStatus: {
            ok: false,
            statusCode: "",
            statusText: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm, setSubmitting, setStatus, setErrors}) => {
            try {
                setSubmitting(true)
                const body = {...values};
                logger.debug(`POSTing ${JSON.stringify(body, null, 2)}`);

                const res = await fetch(
                    '/api/user/sign_up_api_logic',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body),
                    },
                );

                if (!res.ok) {
                    const message = await res.json()

                    console.log("res.text()", message)

                    setStatus({
                        ok: false,
                        statusCode: res.status,
                        statusText: message.statusText,
                    })

                    setSnackBarOpen(true)
                    setSubmitting(false)

                } else {
                    const user = await res.json()

                    setStatus({
                        ok: true,
                        statusCode: res.status,
                        statusText: "Registration is complete and You will redirect to login page in seconds."
                    })


                    sleep(2500).then(async () => {
                            setSubmitting(false)
                            await router.push("/auth/sign_in")
                        }
                    )

                    setSnackBarOpen(true)


                    sleep(2500).then(async () => {
                            setSubmitting(false)
                            await router.push("/auth/sign_in")
                        }
                    )

                }

                // resetForm()


            } catch (error) {
                console.error(error);
            }
        },
    });


    if (status === "authenticated") {
        router.push("/", {
            query: {
                callbackUrl: router.query.callbackUrl,
            },
        });
    } else {
        // handle error
    }

    const borderRadius = 10;

    const [snackBarOpen, setSnackBarOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Box
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    /* bring your own prefixes */
                    transform: "translate(-50%, -50%)",
                }}

                sx={{
                    width: {
                        xs: "95%",
                        sm: "80%",
                        md: "65%",
                        lg: "50%"
                    }
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
                                container={"true"}

                                sx={{padding: 2}}

                            >
                                <Grid padding={1} item xs={12} sm={12} md={4} lg={4}>
                                    <LiveFeedbackTextInput
                                        fullWidth
                                        variant={"outlined"}
                                        required={true}

                                        label="Full name"
                                        id="fullname"
                                        name="name"
                                        value={formik.values.name}
                                        formik={formik}
                                        helperText="Enter your full name here."
                                        type="text"

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonOutlineIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid padding={1} item xs={12} sm={12} md={8} lg={8}>
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
                                <Grid
                                    padding={1}
                                    item
                                    xs={7}
                                    sm={8}
                                    md={8}
                                    lg={8}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name={"confirm"}
                                                required={true}
                                                checked={formik.values.confirm}
                                                onChange={formik.handleChange}
                                                size={"small"}
                                            />
                                        }
                                        label={<Typography variant={"caption"}>Agree to terms and
                                            conditions.</Typography>}
                                    />
                                </Grid>

                                <Grid
                                    padding={1}
                                    item
                                    xs={5}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                >
                                    <LoadingButton
                                        disabled={formik.isSubmitting}
                                        loading={formik.isSubmitting}
                                        color={"success"}
                                        variant="outlined"
                                        fullWidth
                                        type="submit"
                                    >
                                        <span>Sign up</span>
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </Paper>
            </Box>
            <Snackbar
                open={snackBarOpen}
                transitionDuration={1250}
                TransitionComponent={TransitionLeft}
            >
                <Alert onClose={(e) => {
                    setSnackBarOpen(false)
                }} severity={formik.status.ok ? "success" : "error"} sx={{width: '100%'}}>
                    <strong>{formik.status.statusCode}</strong> {formik.status.statusText}
                </Alert>
            </Snackbar>
        </>
    )

}


function TransitionLeft(props) {
    return <Fade {...props} direction="left"/>;
}

export default SignUpComponent;
