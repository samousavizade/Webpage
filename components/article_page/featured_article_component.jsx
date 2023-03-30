import * as React from "react";
import {Avatar, Box, CardHeader, Chip, Paper, Typography, useTheme,} from "@mui/material";

function FeaturedArticleComponent({article, elevationValue, borderRadius}) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                height: 500,
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    transform: "scale3d(1.02, 1.02, 1)",
                    transition: "transform 0.2s ease-out",
                }
            }}
        >

            <Paper
                style={{
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                }}
                sx={{
                    height: 0.5,
                }}
            >
                <Avatar
                    style={{
                        borderTopLeftRadius: borderRadius,
                        borderTopRightRadius: borderRadius,
                    }}
                    key={"avatar"}
                    variant="square"
                    sx={{minHeight: 1, minWidth: 1}}
                    alt="Example Alt"
                    src={article.image_link}
                />
            </Paper>

            <Box
                component="div"
                display={"flex"}
                alignItems="center"
                marginTop={1}
                // minHeight={0.1}
            >
                <Chip
                    marginY="auto"
                    color={"secondary"}
                    label={article.tag}
                />
            </Box>

            <Typography
                marginTop={1}
                variant="h5"
                color={theme.palette.text.primary}
            >
                <b>{article.title}</b>
            </Typography>

            <Typography
                variant="p"
                color={theme.palette.text.secondary}
                sx={{flexGrow: 1}}
            >
                {article.subTitle}
            </Typography>

            <CardHeader
                style={{
                    padding: 0,
                }}
                sx={{
                    marginTop: 1,
                }}
                avatar={
                    <Avatar
                        variant="rounded"
                        alt={article.author.firstName}
                        src="https://i.im.ge/2023/03/14/DdsAA9.me2.jpg"
                    />
                }
                title={
                    <Typography
                        variant="p"
                        color={theme.palette.text.primary}
                    >
                        {article.author.firstName + " " + article.author.lastName}
                    </Typography>

                }
                subheader={
                <Typography
                    color={theme.palette.text.secondary}
                    variant="subtitle2">
                    {article.date}
                </Typography>}
            />
        </Box>
    );
}

export default FeaturedArticleComponent;
