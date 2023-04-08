import * as React from "react";
import {Avatar, Box, Chip, Paper, Typography, useTheme,} from "@mui/material";
import Image from "next/image";
import Tag from "@mui/icons-material/Tag";
import Link from "next/link";

function FeaturedArticleComponent({article, elevationValue, borderRadius}) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    transform: "scale3d(1.015, 1.015, 1)",
                    transition: "transform 0.2s ease-out",
                }
            }}
        >
            <Link href={`/blog/${article.id}`}>

                <Paper
                    style={{
                        borderTopLeftRadius: borderRadius,
                        borderTopRightRadius: borderRadius,
                    }}
                    sx={{
                        height: 250,
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
                    >
                        <Image
                            src={article.imageLink}
                            alt={article.title}
                            fill
                        />
                    </Avatar>
                </Paper>


                <Box
                    component="div"
                    display={"flex"}
                    style={{
                        alignItems: "center",
                        marginTop: '0.5rem'
                    }}
                >
                    <Chip
                        marginY="auto"
                        color={"secondary"}
                        label={article.tag}
                    />
                </Box>

                <Typography
                    marginTop={'0.25rem'}
                    variant="h5"
                    color={theme.palette.text.primary}
                >
                    <b>{article.title}</b>
                </Typography>

                <Typography
                    variant="caption"
                    color={theme.palette.text.secondary}
                    sx={{flexGrow: 1}}
                >
                    {article.subTitle}
                </Typography>

                <Box marginY={1}>
                    {article.keywords.map((item) => (
                        <Chip
                            // padding={5}
                            sx={{
                                margin: '0.2rem',
                            }}
                            variant="outlined"
                            key={item}
                            size={"small"}
                            label={<Typography variant={"caption"}>{item}</Typography>}
                            icon={<Tag/>}
                            // size={}
                            color={"primary"}
                            onClick={() => console.log("click on " + item)}
                        />
                    ))}
                </Box>


                {/*<CardHeader*/}
                {/*    style={{*/}
                {/*        padding: 0,*/}
                {/*    }}*/}
                {/*    sx={{*/}
                {/*        marginTop: 1,*/}
                {/*    }}*/}
                {/*    avatar={*/}
                {/*        // <Avatar*/}
                {/*        //     variant="rounded"*/}
                {/*        //     alt={article.author.firstName}*/}
                {/*        //     src="https://i.im.ge/2023/03/14/DdsAA9.me2.jpg"*/}
                {/*        // />*/}

                {/*        <Avatar*/}
                {/*            variant="rounded"*/}
                {/*            sx={{minHeight: 1, minWidth: 1}}*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                src={"/static/me.png"}*/}
                {/*                alt={article.title}*/}
                {/*                fill*/}
                {/*            />*/}
                {/*        </Avatar>*/}
                {/*    }*/}
                {/*    title={*/}
                {/*        <Typography*/}
                {/*            variant="p"*/}
                {/*            color={theme.palette.text.primary}*/}
                {/*        >*/}
                {/*            {article.author.firstName + " " + article.author.lastName}*/}
                {/*        </Typography>*/}

                {/*    }*/}
                {/*    subheader={*/}
                {/*        <Typography*/}
                {/*            color={theme.palette.text.secondary}*/}
                {/*            variant="subtitle2">*/}
                {/*            {article.date}*/}
                {/*        </Typography>}*/}
                {/*/>*/}
            </Link>
        </Box>

    );
}

export default FeaturedArticleComponent;
