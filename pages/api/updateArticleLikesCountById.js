import prisma from "../../lib/prisma"

export default async (req, res) => {
    let {id, increment} = req.query;

    id = parseInt(id)
    increment = parseInt(increment)

    try {
        const result = await updateArticleLikesCountById(id, increment);

        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({message: "No articles with given id found."})
        }
    }
    catch (error) {
        res.status(500).json({message: "Something went wrong: ", error})
    }

};

async function updateArticleLikesCountById(id, incrementValue) {
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


