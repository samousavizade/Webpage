import prisma, {fetchArticleLikesCountById} from "../../lib/prisma"

export default async (req, res) => {
    const id = parseInt(req.query.id)

    try {
        const result = await fetchArticleLikesCountById(id)

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
