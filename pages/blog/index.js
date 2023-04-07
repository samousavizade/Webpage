import React from "react";

import {alpha, Paper, Stack, Typography, useTheme,} from "@mui/material";
import ArticlesGridItemComponent from "../../components/articles_grid_item";
import useBreakpoint from "../../components/use_breakpoint";
import Head from "next/head";

import {fetchArticles} from "../../lib/prisma";
import {useSession} from "next-auth/react";

export async function getStaticProps(context) {
    const articles = await fetchArticles();
    return {
        props: {
            articlesList: articles,
        }
    }
}

function getArticlesAsColumns(articlesList, nColumns) {

    const columnsItems = Array(nColumns);
    console.log(columnsItems, nColumns)
    for (let columnIndex = 0; columnIndex < nColumns; columnIndex++) {
        columnsItems[columnIndex] = []
    }

    for (let articleIndex = 0; articleIndex < articlesList.length; articleIndex++) {
        columnsItems[articleIndex % nColumns].push(articlesList[articleIndex])
    }

    return columnsItems;
}

export default function ArticlesGridComponent({articlesList, authorsList, onClickLike, ...props}) {
    // come from static props function that defined above.
    // console.log("articles list: \n", articlesList)

    const {data: session, status} = useSession();
    const someoneIsSignedIn = session?.user !== undefined;

    const theme = useTheme();


    // const handleClickLike = (article) => {
    //     const articlesListNextState = [...articlesListState];
    //     const index = articlesListNextState.indexOf(article);
    //     const toGetChangedArticle = articlesListNextState[index];
    //
    //     // if (toGetChangedArticle !== undefined) {
    //     //     switch (toGetChangedArticle.doesCurrentUserLike) {
    //     //         case true:
    //     //             toGetChangedArticle.doesCurrentUserLike = false;
    //     //
    //     //             toGetChangedArticle.nLikes = toGetChangedArticle.nLikes - 1;
    //     //             setArticlesListState(articlesListNextState);
    //     //             break;
    //     //
    //     //         case false:
    //     //             toGetChangedArticle.doesCurrentUserLike = true;
    //     //
    //     //             toGetChangedArticle.nLikes = toGetChangedArticle.nLikes + 1;
    //     //             setArticlesListState(articlesListNextState);
    //     //             break;
    //     //
    //     //         default:
    //     //             break;
    //     //     }
    //     // } else {
    //     //     // handling error
    //     // }
    // };

    const currentBreakpoint = useBreakpoint();

    let nColumns = 0
    switch (currentBreakpoint) {
        case "xs":
            nColumns = 1;
            break;
        case "sm":
            nColumns = 1;
            break;
        case "md":
            nColumns = 2;
            break;
        case "lg":
            nColumns = 3;

            break;
        case "xl":
            nColumns = 4;
            break;

        default:
            nColumns = 1;
    }

    let defaultColumnsItems;
    let likedColumnsItems;
    if (!someoneIsSignedIn)
        defaultColumnsItems = getArticlesAsColumns(articlesList, nColumns)

    else {
        const likedArticlesIds = session.user.likedArticles;

        let defaultArticles = []
        let likedArticles = []
        articlesList.forEach((item, index, array) => {
            if (likedArticlesIds.includes(item.id))
                likedArticles.push(item)
            else
                defaultArticles.push(item)
        })

        defaultColumnsItems = getArticlesAsColumns(defaultArticles, nColumns)
        likedColumnsItems = getArticlesAsColumns(likedArticles, nColumns)
    }

    // console.log("defaultColumnsItems ids: ", defaultArticles.map(item => item.id))


    const borderRadius = "0.75rem";
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <Stack direction={"column"} spacing={2}>
                {someoneIsSignedIn &&
                    <Paper
                        textalign={"left"}

                        style={{
                            color: theme.palette.text.primary,
                            padding: "1rem",
                            backgroundColor: alpha(theme.palette.background.default, 0.3),
                            backdropFilter: "blur(9.5px)",
                            borderRadius: borderRadius,
                        }}
                    >
                        <Typography variant={"h3"}>
                            Liked articles
                        </Typography>
                    </Paper>
                }

                {someoneIsSignedIn && <Stack direction={"row"} spacing={2}>
                    {likedColumnsItems.map((items, columnIndex) => {
                        return (
                            <Stack direction={"column"} spacing={2} width={1 / nColumns} key={columnIndex}> {
                                items.map((item, rowIndex) => {
                                    return (
                                        <ArticlesGridItemComponent
                                            key={item.article_id}
                                            article={item}
                                        />
                                    )
                                })}
                            </Stack>
                        )
                    })}
                </Stack>}

                {someoneIsSignedIn &&
                    <Paper
                        textalign={"left"}

                        style={{
                            color: theme.palette.text.primary,
                            padding: "1rem",
                            backgroundColor: alpha(theme.palette.background.default, 0.3),
                            backdropFilter: "blur(9.5px)",
                            borderRadius: borderRadius,
                        }}
                    >
                        <Typography variant={"h3"}>
                            Other articles
                        </Typography>
                    </Paper>
                }


                <Stack direction={"row"} spacing={2}>
                    {defaultColumnsItems.map((items, columnIndex) => {
                        return (
                            <Stack direction={"column"} spacing={2} width={1 / nColumns} key={columnIndex}> {
                                items.map((item, rowIndex) => {
                                    return (
                                        <ArticlesGridItemComponent
                                            key={item.article_id}
                                            article={item}
                                        />
                                    )
                                })}
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>

        </>

    );
}
