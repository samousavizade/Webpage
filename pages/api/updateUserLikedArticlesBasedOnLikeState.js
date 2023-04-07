import prisma from "../../lib/prisma"
import {logger} from "../../lib/logger";

export default async (req, res) => {
    let {user, article, pushOrPop} = req.body;

    logger.debug("USER OBJECT", user)

    try {
        const result = await updateUserLikedArticles(user, article, pushOrPop);

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({message: "Update liked articles of user failed: ", result})
        }
    } catch (error) {
        logger.debug("Something went wrong: ", error)
        res.status(500).json({message: "Something went wrong: ", error})
    }

};

async function updateUserLikedArticles(user, article, pushOrPop) {


    logger.debug("Hello")

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
