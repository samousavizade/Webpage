// pages/index.tsx
import {fetchPrinciples} from "../../lib/fetch_principles";

export default async (req, res) => {

    res.json(fetchPrinciples())
};
