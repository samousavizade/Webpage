// pages/index.tsx
import prisma from "../../lib/prisma"

export default async (req, res) => {

    // const feed = await prisma.article.create({
    //     data:
    //         {
    //             "imageLink": "/static/articles_images/feature_importance.jpg",
    //             "title": "Feature Importance",
    //             "subTitle": "Why repeating of backtest may fail? and how to prevent it. Why repeating a test over and over on the same data will likely lead to a  discovery?",
    //             "author": {
    //                 connect: {
    //                     id: 0
    //                 }
    //             },
    //             "createdAt": "2022-03-05T20:30:00.000Z",
    //             "tag": "Financial ML.",
    //             "keywords": [
    //                 "MDA",
    //                 "MDI",
    //                 "SFI",
    //                 "Orthogonal Features",
    //                 "Substitution Effect",
    //                 "Backtesting",
    //                 "Parallelized FI",
    //                 "Stacked FI"
    //             ],
    //             "contentMDFile": "./mdx_sources/FeatureImportance/feature_importance.mdx",
    //             "summary": "One of the most common errors in financial research is taking some data, running it through an ML algorithm, backtesting the predictions, and repeating the process until a nice-looking backtest appears. Such pseudo-discoveries abound in academic journals, and even significant hedge funds are prone to falling into this trap. It makes no difference if the backtest is an out-of-sample walk-forward. The fact that we are repeating a test on the same data will almost certainly result in a  discovery. This methodological error is so well-known among statisticians that the American Statistical Association warns against it in its ethical guidelines (American Statistical Association [2016], Discussion #4). It usually takes around 20 iterations to find a () investment strategy with a standard significance level ( positive rate) of 5%.",
    //             "nLikes": 4
    //         }
    //
    //
    // })
    //
    //
    // // const feed = await prisma.author.createMany({
    // //     data: authors,
    // //     skipDuplicates: true,
    // // })
    //
    // res.json({feed: feed})

};
