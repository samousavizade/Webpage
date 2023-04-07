import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";
import {logger} from "../../../lib/logger";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        await handlePOST(res, req);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

const hashPassword = (password: string) => {
    return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {

    const {name, email, password} = req.body

    const profileExists = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    logger.debug("profileExists: ", profileExists)
    if (profileExists) {
        res.status(409).json({statusText: "User with given email already exists."})
        return
    }

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashPassword(password),
            status: false,
        },
    });

    if (user) {
        const account = await prisma.account.create({
            data: {
                userId: user.id,
                type: "credentials",
                provider: "credentials",
                providerAccountId: user.id,
            },
        })

        if (account) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                // password: user.password,
            });
        } else {
            res.status(500).json({
                statusText: "Unable to link account to the created user profile.",
            })
        }

    } else {
        res.status(500).json({statusText: "Unable to create new user account.",})
    }
}
