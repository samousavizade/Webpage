import React, {useState} from "react";

import {Box, Grid, Stack,} from "@mui/material";
import {fetchArticles} from "@/lib/fetch_articles";
import ArticlesGridItemComponent from "@/components/articles_grid_item";
import useBreakpoint from "@/components/use_breakpoint";


export async function getStaticProps(context) {
    return {
        props: {
            articlesList: fetchArticles(),
        }
    }
}

export default function ArticlesGridComponent({articlesList, authorsList, onClickLike, ...props}) {

    // come from static props function that defined above.
    // console.log("articles list: \n", articlesList)

    const [articlesListState, setArticlesListState] = useState(articlesList);
    const [authorsListState, setAuthorsListState] = useState(articlesList);

    const handleClickLike = (article) => {
        const articlesListNextState = [...articlesListState];
        const index = articlesListNextState.indexOf(article);
        const toGetChangedArticle = articlesListNextState[index];

        if (toGetChangedArticle !== undefined) {
            switch (toGetChangedArticle.doesCurrentUserLike) {
                case true:
                    toGetChangedArticle.doesCurrentUserLike = false;

                    toGetChangedArticle.nLikes = toGetChangedArticle.nLikes - 1;
                    setArticlesListState(articlesListNextState);
                    break;

                case false:
                    toGetChangedArticle.doesCurrentUserLike = true;

                    toGetChangedArticle.nLikes = toGetChangedArticle.nLikes + 1;
                    setArticlesListState(articlesListNextState);
                    break;

                default:
                    break;
            }
        } else {
            // handling error
        }
    };

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

    const columnsItems = Array(nColumns);
    for (let columnIndex = 0; columnIndex < nColumns; columnIndex++) {
        columnsItems[columnIndex] = []
    }

    for (let articleIndex = 0; articleIndex < articlesList.length; articleIndex++) {
        columnsItems[articleIndex % nColumns].push(articlesList[articleIndex])
    }



    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: "auto",
            }}
            padding={3}
        >
            <Stack direction={"row"} spacing={2}>
                {
                    columnsItems.map( (items, columnIndex) => {
                        return (
                            <Stack direction={"column"} spacing={2} width={1/nColumns} key={columnIndex}>
                                {
                                    items.map( (item, rowIndex) => {
                                        return (
                                            <ArticlesGridItemComponent
                                                key={item.article_ida}
                                                article={item}
                                                onClickLike={handleClickLike}
                                            />
                                        )
                                    } )
                                }
                            </Stack>
                        )
                    } )
                }
            </Stack>

            {/*<Grid container >*/}
            {/*    {Object.keys(articlesList).map((index) => {*/}
            {/*        return (*/}
            {/*            <Grid*/}
            {/*                item*/}
            {/*                key={articlesList[index].id}*/}
            {/*                xs={12}*/}
            {/*                sm={12}*/}
            {/*                md={6}*/}
            {/*                lg={4}*/}
            {/*                padding={1}*/}
            {/*            >*/}
            {/*                <ArticlesGridItemComponent*/}
            {/*                    article={articlesList[index]}*/}
            {/*                    onClickLike={handleClickLike}*/}
            {/*                />*/}
            {/*            </Grid>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</Grid>*/}
        </Box>
    );
}
