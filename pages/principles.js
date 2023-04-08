import {useRouter} from "next/router";
import * as React from "react";
import {useContext} from "react";
import {Box} from "@mui/material";
import SlideShow from "../components/slide_show/SlideShow";
import {fetchPrinciples} from "../lib/fetch_principles";
import Loading from "../pages/loading";
import Head from "next/head";
import {SkeletonContext} from "../pages/_app";
import {useSession} from "next-auth/react";
import Protected from "../pages/protected";


export async function getStaticProps() {
    let myPrinciples = await fetchPrinciples()

    const positions = ["left", "middle", "right"];

    myPrinciples = myPrinciples.map((content, index) => {
        return {
            contentPosition: positions[index % 3],
            materials: content,
        }
    })

    return {
        props: {
            myPrinciples: myPrinciples,
        }
    }

}


const Principles = ({myPrinciples}) => {

    const { status } = useSession()
    const {state, dispatch} = useContext(SkeletonContext);
    const router = useRouter();

    if (status === "loading") {
        return <Loading/>
    }

    if (status === "unauthenticated") {
        return <Protected/>
    }



    if (router.isFallback) {
        return <Loading/>
    }

    return (
        <>
            <Head>
                <title>My Principles</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Box
                sx={{
                    overflow: "auto",
                    width: 1
                }}
            >
                <SlideShow navBarHeight={state.navBarHeight} myPrinciples={myPrinciples}/>
            </Box>
        </>
    )
}

export default Principles;