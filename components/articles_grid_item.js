import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    alpha,
    Avatar,
    Badge,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";
import Image from "next/image";
import useBreakpoint from "@/components/use_breakpoint";
import ResponsiveIcon from "@/components/ResponsiveIcon";

const ArticlesGridItemComponent = ({article, onClickLike}) => {
    const summaryMarkdown = article.summary;
    const fullName = `${article.author.firstName} ${article.author.lastName}`

    const theme = useTheme();

    const currentBreakpointAbbr = useBreakpoint();

    return (
        <Card
            // className={styles.articleItem}
            sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(1.5px)",

                '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    transform: "scale3d(1.02, 1.02, 1)",
                    transition: "transform 0.25s ease-out",
                }
            }}
            // sx={{maxHeight: "100%"}}
        >
            <Link href={`/blog/${article.id}`}>
                <CardMedia
                    component="img"
                    height="350"
                    image={article.image_link}
                    alt="Paella "

                />

            </Link>

            <Typography
                paddingLeft={2}
                marginTop={1}
                variant="h4"
            >
                <b>{article.title}</b>
            </Typography>
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
                subheader={<Typography variant={"subtitle2"}> {article.date} </Typography>}
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
                            children={summaryMarkdown}
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        />

                        <Divider variant="middle" sx={{marginY: 1}}/>

                        <Grid container>
                            <Grid item key={"like-button"} xs={2} sm={2} md={2} lg={2}>
                                <Badge color="primary" badgeContent={article.nLikes}>
                                    <IconButton
                                        aria-label="like"
                                        onClick={(e) => {
                                            onClickLike(article);
                                        }}
                                    >
                                        {article.doesCurrentUserLike ? (
                                            <FavoriteIcon color={"error"}/>
                                        ) : (
                                            <FavoriteBorderIcon color={"error"}/>
                                        )}
                                    </IconButton>
                                </Badge>
                            </Grid>
                            <Grid
                                item
                                key={"[index].id"}
                                xs={"auto"}
                                sm={"auto"}
                                md={"auto"}
                                lg={"auto"}
                                marginLeft={"auto"}
                            >
                                <Button size={'large'}>
                                    <Link href={"/blog/" + article.id} legacyBehavior>
                                        Continue
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </CardActions>
        </Card>
    );
};

export default ArticlesGridItemComponent;
