import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel';

// import Settings, {DefaultSettingsT} from './Settings';
// import './SlideShow.module.scss';
import {alpha, Grid, Typography, useTheme,} from '@mui/material';
import {DefaultSettingsT} from "@/components/slide_show/Settings";
import PrincipleComponent from "@/components/principle_component";
import {grey} from "@mui/material/colors";
import useBreakpoint from "@/components/use_breakpoint";


const SlideShow = ({navBarHeight, myPrinciples}) => {

    const theme = useTheme();

    const [settings, setSettings] = useState(DefaultSettingsT);

    const currentBreakpoint = useBreakpoint();
    const isMobileSizeScreen = ["xs", "sm"].includes(currentBreakpoint);
    console.log("isMobileSizeScreen", isMobileSizeScreen)

    return (
        <Carousel
            sx={{
                overflow: "auto",
                margin: 0,
                padding: 0,
                // height:"100%",
                backgroundColor: grey.A400,
            }}
            height={`calc( 100vh - ${navBarHeight} - 8vh )`}
            {...settings}
            // next={(now: any, previous:any) => console.log(`Next User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
            // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
            // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
            //
            // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
            // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
            // indicatorContainerProps={{style: {margin: "20px"}}}
            // NextIcon='next'
        >
            {
                isMobileSizeScreen ?
                    myPrinciples.map((item) => {
                        return item.materials.principles.map((principle) => {
                            return (<MobileBanner
                                principle={principle}
                                subject={item.materials.subject}
                                key={principle.id}
                            />)
                        })
                    }).flat() :
                    myPrinciples.map((item, index) => {
                        return <DesktopBanner
                            principles={item.materials.principles}
                            subject={item.materials.subject}
                            key={index}
                            contentPosition={item.contentPosition}
                        />
                    })
            }
        </Carousel>
    );
}

{/*<Settings settings={settings} setSettings={setSettings}/>*/
}

const MobileBanner = ({principle, subject, key}) => {

    return (
        <PrincipleComponent
            principleTitle={principle.principleTitle}
            imageLink={principle.imageLink}
            text={principle.text}
            author={principle.author}
        />
    )
}

const DesktopBanner = ({principles, subject, contentPosition, key}) => {

    const theme = useTheme();
    let items = [];

    const block = (
        <Grid
            item
            style={{
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                borderColor: alpha(theme.palette.background.paper, 0.75),
                borderStyle: "solid",
                borderWidth: 10,
            }}
            xs={4}
            sm={4}
            md={3}
            lg={3}

        >
            <Typography variant={"h5"} textAlign={"center"} padding={2.5}>
                {subject}
            </Typography>
        </Grid>
    )

    for (let i = 0; i < principles.length; i++) {
        const item = principles[i];

        const media = (
            <Grid item md={4.5} lg={4.5} key={item.id}>
                <PrincipleComponent
                    principleTitle={item.principleTitle}
                    imageLink={item.imageLink}
                    text={item.text}
                    author={item.author}
                />
            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(block);
    } else if (contentPosition === "right") {
        items.push(block);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, block);
    }

    return (
        <Grid container spacing={0}>
            {items}
        </Grid>
    )
}


export default SlideShow;