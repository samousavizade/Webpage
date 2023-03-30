import {useRouter} from "next/router";
import {fetchArticles} from "@/lib/fetch_articles";
import BlogArticleComponent from "@/components/article_page/blog_article_component";
import {CircularProgress, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Loading from "@/pages/loading";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const articles = fetchArticles();
    const intendedArticleId = parseInt(params.article_id)

    const article = articles.find((item) => {
        // be aware that item.id is number where params.article_id is string
        return item.id === intendedArticleId // dynamic page id
    });

    console.log("currentArticle: ", article.title)

    const featuredArticles = articles.filter((item) => {
        let n = (Math.abs(item.id - intendedArticleId) % articles.length)
        return n >= 1 && n <= 3;
    })

    return {
        props: {
            intendedArticle: article,
            featuredArticles: featuredArticles,
        }
    }
}

export function getStaticPaths() {

    const articles = fetchArticles();

    return {
        paths: articles.map((item) => {
            return {params: {article_id: `${item.article_id}`}}
        }),
        fallback: true
    }

    // return {
    //     paths: [
    //         {params: {article_id: "0"}},
    //         {params: {article_id: "1"}},
    //         {params: {article_id: "2"}},
    //     ],
    //     fallback: true
    // }
}

const ArticleComponent = ({intendedArticle, featuredArticles}) => {

    const router = useRouter();

    if (router.isFallback) {
        // return <ListItem>
        //     <CircularProgress color="secondary" />
        //     <Typography ml={3} variant={"h5"} component={"h1"}>
        //         Loading ...
        //     </Typography>
        // </ListItem>
        return <Loading />

    }

    console.log("currentArticle In Client", intendedArticle.title)

    return (
        // <>
        //     <Head>
        //         <title>{article.title}</title>
        //     </Head>
        //     <h1>
        //         Article with id: {router.query.article_id}
        //     </h1>
        //     <h2>
        //         Article Title: {article.title}
        //     </h2>
        //     {Object.values(data).map((item) => {
        //         return <div key={item.title}>
        //             <h1>{item.title}</h1>
        //             <p>{item.body}</p>
        //         </div>
        //     })
        //     }
        // </>
        <BlogArticleComponent
            intendedArticle={intendedArticle}
            featuredArticles={featuredArticles}
        />
    )
}

export default ArticleComponent;