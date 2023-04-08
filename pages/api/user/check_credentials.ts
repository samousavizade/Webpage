import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";
import {logger} from "../../../lib/logger";
import {omit} from "lodash";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    logger.debug("connected to check_credentials");

    if (req.method === "POST") {
        await handlePOST(res, req);
    } else {
        res.status(400).end("method is not POST type.");
    }
}

const hashPassword = (password: string) => {
    return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.username
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
        },
    });

    logger.debug("user: ", user);

    if (user && user.password == hashPassword(req.body.password)) {
        logger.debug("password correct");
        res.json(omit(user, "password"));
    } else {
        logger.debug("incorrect credentials");
        if (!user) {
            logger.debug("user not found");

        } else if (user.password !== hashPassword(req.body.password)) {
            logger.debug("password is incorrect")
        }

        res.status(400).end("Username (mail) or address is incorrect.");
    }
}
