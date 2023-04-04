import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    alpha,
    Avatar, Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Typography,
    useTheme,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";
import Image from "next/image";
import ResponsiveIcon from "@/components/ResponsiveIcon";

const ArticlesGridItemComponent = ({article, onClickLike}) => {

    const summaryMarkdown = article.summary;
    const fullName = `${article.author.firstName} ${article.author.lastName}`

    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                backdropFilter: "blur(1.5px)",

                '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.85),
                    transform: "scale3d(1.015, 1.015, 1)",
                    transition: "transform 0.25s ease-out",
                }
            }}
            // sx={{maxHeight: "100%"}}
        >
            <Link href={`/blog/${article.id}`}>
                <CardMedia
                    component={Image}
                    height={350}
                    image={article.imageLink}

                />
            </Link>

            <CardContent>
                <Typography
                    // marginTop={1}
                    variant="h4"
                >
                    {article.title}
                </Typography>

                <Typography
                    marginTop={1}
                    textAlign={"justify"}
                    variant="body1"
                >
                    {article.subTitle}
                </Typography>

            </CardContent>

            <CardHeader
                avatar={
                    <Avatar
                        alt={article.author.firstName}
                        src="/static/images/avatar/1.jpg"
                        width={1}
                        height={1}
                        position={"relative"}
                    >
                        <Image src={"/static/me.png"} alt={"author"} fill/>
                    </Avatar>

                }
                title={<Typography variant={"subtitle1"}> {fullName} </Typography>}
                subheader={<Typography variant={"subtitle2"}> {article.createdAt} </Typography>}
            />

            <Divider variant="middle"/>

            <CardActions disableSpacing>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ResponsiveIcon icon={ExpandMoreIcon}/>}

                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                            {summaryMarkdown}
                        </ReactMarkdown>

                        <Divider variant="middle" sx={{marginY: 1}}/>

                        <Box container display={"flex"}>
                            <Button size={'large'} sx={{marginLeft: "auto"}}>
                                <Link href={"/blog/" + article.id} legacyBehavior>
                                    Continue
                                </Link>
                            </Button>

                        </Box>
                    </AccordionDetails>
                </Accordion>
            </CardActions>
        </Card>
    );
};

export default ArticlesGridItemComponent;
