// pages/index.tsx
import prisma from "../../lib/prisma"

export default async (req, res) => {
    const id = parseInt(req.query.id)

    try {
        const result = await prisma.article.findFirst({
            where: {
                id: id
            },
            include: {
                author: true
            }
        })

        res.statusCode(200).json(result)
    }
    catch (error) {
        console.log("There is an error in getArticleById api: ", error)
        res.statusCode(500).json({message: "Something went wrong: ", error})

    }



};
