// pages/index.tsx
import prisma from "../../lib/prisma"
import {fetchPrinciples} from "@/lib/fetch_principles";

export default async (req, res) => {

    res.json(fetchPrinciples())
};
