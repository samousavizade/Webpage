import * as React from "react";
import {Button, Paper, TextField, Box, IconButton, Tooltip, Typography, alpha} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { useTheme } from '@mui/material/styles';

const validationSchema = yup.object({
    email: yup.string().email("Please validate your entered mail.").required("Mail is required."),
});

const SubmitToBlogComponent = () => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    console.log("theme.palette.background.paper", theme.palette.background.paper)
    return (
        <Paper
            style={{borderRadius: 0, background: alpha(theme.palette.background.paper, 0.37 )}}
            elevation={20}
            sx={{
                maxWidth: 400
            }}
            alignItems="center"
        >
            <FormikProvider value={formik} validateOnChange={false}
                            validateOnBlur={false}>
                <Form style={{width: "100%"}} value={formik}>
                    <Typography
                        textAlign={"center"}
                        padding={1}
                        bgcolor="inherit"
                        component="h4"
                        variant="h5"
                    >
                        Subscribe to My Blog
                    </Typography>
                    <Box paddingX={2} paddingBottom={2}>
                        <TextField
                            fullWidth
                            label="Mail"
                            id="email"
                            name="email"

                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            type="text"
                            InputProps={{
                                endAdornment: <Tooltip title={formik.errors.email} arrow>
                                    <IconButton
                                        color={"success"}
                                        variant="contained"

                                        type="submit"
                                    >
                                        <SendSharpIcon />
                                    </IconButton>
                                </Tooltip>
                            }}
                        />


                    </Box>
                </Form>
            </FormikProvider>
        </Paper>
    );
};

export default SubmitToBlogComponent;
