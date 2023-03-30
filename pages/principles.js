import {useRouter} from "next/router";
import * as React from "react";
import {Box, Typography, Stack} from "@mui/material";
import SlideShow from "@/components/slide_show/SlideShow";
import {fetchPrinciples} from "@/lib/fetch_principles";
import Loading from "@/pages/loading";


export async function getStaticProps() {
    let myPrinciples = await fetchPrinciples()

    const positions = ["left", "middle", "right"];

    myPrinciples = myPrinciples.map((content, index) => {
        return {
            contentPosition: positions[index % 3],
            materials: content,
        }
    })

    console.log("mamad", myPrinciples);

    return {
        props: {
            myPrinciples: myPrinciples,
        }
    }

}


const Principles = (props) => {

    const {
        navBarHeight,
        drawerWidthState,
        myPrinciples,
    } = props;

    const router = useRouter();
    if (router.isFallback) {
        return <Loading />
    }


    return (
        <Box
            sx={{
                overflow: "auto",
            }}
        >
            <SlideShow navBarHeight={navBarHeight} myPrinciples={myPrinciples}/>
        </Box>
    )
}

export default Principles;