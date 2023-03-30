import * as React from "react";
import {Avatar, Box, CardHeader, Chip, Divider, Grid, Paper, Typography, useMediaQuery, useTheme,} from "@mui/material";
import FeaturedArticleComponent from "./featured_article_component";
import Head from "next/head";
import Image from "next/image";
import Tag from "@mui/icons-material/Tag";
import dynamic from 'next/dynamic'
import useBreakpoint from "@/components/use_breakpoint";
// import Ensemble from "./mdx_sources/Ensemble/ensemble_learning.mdx"
// import FinancialBars from "./mdx_sources/FinancialBars/financial_bars.mdx"
// import SampleWeights from "./mdx_sources/SampleWeights/sample_weights.mdx"
// import FeatureImportance from "./mdx_sources/FeatureImportance/feature_importance.mdx"
// import DangersOfBacktesting from "./mdx_sources/DangersOfBacktesting/dangers_of_backtesting.mdx"
// import Denoising from "./mdx_sources/Denoising/denoising.mdx"

const CrossValidation = dynamic(() => import("./mdx_sources/CrossValidation/cross_validation.mdx"),);
const DangersOfBacktesting = dynamic(() => import("./mdx_sources/DangersOfBacktesting/dangers_of_backtesting.mdx"),);
const Denoising = dynamic(() => import("./mdx_sources/Denoising/denoising.mdx"),);
const Ensemble = dynamic(() => import("./mdx_sources/Ensemble/ensemble_learning.mdx"),);
const EntropyFeatures = dynamic(() => import("./mdx_sources/EntropyFeatures/entropy_features.mdx"),);
const FeatureImportance = dynamic(() => import("./mdx_sources/FeatureImportance/feature_importance.mdx"),);
const FinancialBars = dynamic(() => import("./mdx_sources/FinancialBars/financial_bars.mdx"),);
const MicrostructuralBreaks = dynamic(() => import("./mdx_sources/MicrostructuralFeatures/microstructural_features.mdx"),);
const PortfolioConstruction = dynamic(() => import("./mdx_sources/PortfolioConstruction/portfolio_construction.mdx"),);
const SampleWeights = dynamic(() => import("./mdx_sources/SampleWeights/sample_weights.mdx"),);
const StructuralBreaks = dynamic(() => import("./mdx_sources/StructuralBreaks/structural_breaks.mdx"),);
const Labeling = dynamic(() => import("./mdx_sources/Labeling/labeling.mdx"),);

const BlogArticleComponent = ({intendedArticle, featuredArticles}) => {

    const elevationValue = 3;
    const borderRadius = 20;

    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const midToLarge = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const xSmallToSmall = useMediaQuery(theme.breakpoints.between("xs", "sm"));

    let nFeaturedArticles = 0
    let headerHeight = 0;
    let headerHeightWhileScreenGreaterThanMD = 0;
    let blogArticleImageHeight = 0
    if (xSmallToSmall) {
        nFeaturedArticles = 1;
        headerHeight = 450;
        blogArticleImageHeight = 250


    } else if (smallToMid) {
        nFeaturedArticles = 2;
        headerHeight = 350;
        blogArticleImageHeight = 400


    } else if (midToLarge) {
        nFeaturedArticles = 3;
        headerHeight = 400;
        blogArticleImageHeight = headerHeight

    } else if (greaterThanLarge) {
        nFeaturedArticles = 4;
        headerHeight = 325;
        blogArticleImageHeight = headerHeight

    }

    console.log("intendedArticle.content_md_file", intendedArticle.title)

    let MDXComponent = undefined;
    switch (intendedArticle.content_md_file) {
        case "./mdx_sources/CrossValidation/cross_validation.mdx":
            MDXComponent = CrossValidation;
            break;
        case "./mdx_sources/DangersOfBacktesting/dangers_of_backtesting.mdx":
            MDXComponent = DangersOfBacktesting;
            break;
        case "./mdx_sources/Denoising/denoising.mdx":
            MDXComponent = Denoising;
            break;
        case "./mdx_sources/Ensemble/ensemble_learning.mdx":
            MDXComponent = Ensemble;
            break;
        case "./mdx_sources/EntropyFeatures/entropy_features.mdx":
            MDXComponent = EntropyFeatures;
            break;
        case "./mdx_sources/FeatureImportance/feature_importance.mdx":
            MDXComponent = FeatureImportance;
            break;
        case "./mdx_sources/FinancialBars/financial_bars.mdx":
            MDXComponent = FinancialBars;
            break;
        case "./mdx_sources/Labeling/labeling.mdx":
            MDXComponent = Labeling;
            break;
        case "./mdx_sources/MicrostructuralFeatures/microstructural_features.mdx":
            MDXComponent = MicrostructuralBreaks;
            break;
        case "./mdx_sources/PortfolioConstruction/portfolio_construction.mdx":
            MDXComponent = PortfolioConstruction;
            break;
        case "./mdx_sources/SampleWeights/sample_weights.mdx":
            MDXComponent = SampleWeights;
            break;
        case "./mdx_sources/StructuralBreaks/structural_breaks.mdx":
            MDXComponent = StructuralBreaks;
            break;

    }


    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
                    integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Pacifico"
                    rel="stylesheet"
                />
            </Head>
            <Grid
                container
                bgcolor={theme.palette.background.paper}
                padding={3}
                marginTop={0.0}
                paddingTop={0}
                spacing={3}
            >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper
                        variant="outlined"
                        style={{
                            borderRadius: borderRadius,
                        }}
                        sx={{
                            height: blogArticleImageHeight,
                        }}
                    >
                        <Avatar
                            style={{
                                borderRadius: borderRadius,
                            }}
                            key={"avatar"}
                            variant="square"
                            sx={{minHeight: 1, minWidth: 1}}
                        >
                            <Image
                                src={intendedArticle.image_link}
                                alt={intendedArticle.title}
                                fill
                            />
                        </Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box
                        sx={{
                            height: (xSmallToSmall || smallToMid) ? "100%" : headerHeight,
                            display: "flex",
                            marginTop: 0,
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            component="div"
                            alignItems="center"
                        >
                            <Chip
                                marginY="auto"
                                style={{
                                    backgroundColor: theme.palette.secondary.main,
                                }}
                                label={intendedArticle.tag}
                            />
                        </Box>

                        <Typography
                            alignItems="center"
                            marginTop={1}
                            color={theme.palette.text.primary}
                            variant="h3"
                        >
                            <b>{intendedArticle.title}</b>
                        </Typography>


                        <Typography
                            color={theme.palette.text.secondary}
                            sx={(xSmallToSmall || smallToMid) ? {} : {flexGrow: 1}}
                            variant="subtitle1"
                        >
                            {intendedArticle.subTitle}
                        </Typography>

                        <Box marginY={1}>
                            {intendedArticle.keywords.map((item) => (
                                <Chip
                                    // padding={5}
                                    sx={{
                                        margin: 0.25,
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

                        <CardHeader
                            style={{
                                padding: 1,
                            }}
                            avatar={
                                <Avatar
                                    alt={intendedArticle.author.firstName}
                                    variant="rounded"
                                    sx={{minHeight: 1, minWidth: 1}}
                                >
                                    <Image
                                        src={"/static/me.png"}
                                        alt={intendedArticle.title}
                                        fill
                                    />
                                </Avatar>
                            }
                            title={
                                <Typography
                                    variant="p"
                                    color={theme.palette.text.primary}
                                >
                                    {intendedArticle.author.firstName + " " + intendedArticle.author.lastName}
                                </Typography>
                            }
                            subheader={
                                <Typography
                                    color={theme.palette.text.secondary}
                                    variant="subtitle2"
                                >
                                    {intendedArticle.date}
                                </Typography>
                            }
                        />
                    </Box>
                </Grid>

                {nFeaturedArticles > 0 &&
                    <Grid key={"featured_articles"} item xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            textAlign={"center"}
                            color={theme.palette.text.primary}
                            style={{borderRadius: borderRadius}}
                            sx={{
                                marginX: "auto",
                                backgroundColor: theme.palette.secondary.main,
                            }}
                            variant="h5"
                        >
                            Featured Articles
                        </Typography>
                    </Grid>
                }
                {nFeaturedArticles > 0 && featuredArticles.slice(0, nFeaturedArticles).map((article) => (
                    <Grid key={article.title} item xs={12} sm={6} md={4} lg={3}>
                        <FeaturedArticleComponent
                            key={article.title}
                            article={article}
                            elevationValue={elevationValue}
                            borderRadius={borderRadius}
                        />
                    </Grid>
                ))}

                {nFeaturedArticles === 0 && <Box bgcolor={"gold"} sx={{
                    minHeight: 100,
                    minWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}> </Box>}

                <Grid item key={"left-column"} xs={12} sm={12} md={12} lg={12}>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                            paddingRight: 2,
                            "& .markdown": {
                                py: 3,
                            },
                        }}
                    >
                        <Divider/>

                        <div
                            style={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                // fontFamily: "Apple, cursive",
                                textAlign: "justify"
                            }}
                        >
                            {/*<Ensemble/>*/}
                            {/*<FinancialBars />*/}
                            {/*<SampleWeights />*/}
                            {/*<FeatureImportance />*/}
                            {/*<DangersOfBacktesting />*/}
                            {/*<Denoising />*/}
                            <MDXComponent/>
                        </div>

                    </Grid>
                </Grid>


            </Grid>
        </>
    );
};

export default BlogArticleComponent;

