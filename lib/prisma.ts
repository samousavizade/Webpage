// lib/prisma.ts
import {PrismaClient} from '@prisma/client';
import {logger} from "./logger";

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;

export async function fetchArticles() {
    let result = await prisma.article.findMany({
        include: {
            author: true
        }
    })

    return result.map(item => {
        return {...item, updatedAt: item.updatedAt.toDateString(), createdAt: item.createdAt.toDateString()};
    })
}

export async function fetchArticleLikesCountById(id) {
    const result = await prisma.article.findFirst({
        where: {
            id: id
        },
        select: {
            nLikes: true,
        }
    })

    return result;
}

export async function updateArticleLikesCountById(id, incrementValue) {
    const result = await prisma.article.update({
        where: {
            id: id
        },
        data: {
            nLikes: {
                increment: incrementValue,
            }
        }
    })

    return result;
}

export async function updateUserLikedArticles(user, article, pushOrPop) {


    logger.debug("Hello")

    // const likedArticles = await prisma.user.findUnique({
    //     where: {
    //         id: user.id,
    //         email: user.email,
    //     },
    //     select: {
    //         likedArticles: true,
    //     }
    // }).then(r => r.likedArticles)

    // logger.debug("likedArticles", likedArticles)

    // let likedArticlesIds;
    // if (pushOrPop == "push") {
    //     likedArticlesIds = likedArticles.map((item) => item.id)
    //     likedArticlesIds.push(article.id)
    // } else {
    //     likedArticlesIds = likedArticles.filter((item) => item.id !== article.id)
    // }
    // logger.debug("likedArticles after", likedArticles)

    let result;

    if (pushOrPop === "push")
        result = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                likedArticles: {
                    connect: [{id: article.id}],
                }
            }
        })

    else if (pushOrPop === "pop")
        result = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                likedArticles: {
                    disconnect: [{id: article.id}],
                }
            }
        })
    else
        throw Error(`pushOrPop invalid value: ${pushOrPop}`)

    return result;
}