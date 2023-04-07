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

