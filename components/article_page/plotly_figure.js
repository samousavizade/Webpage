import React from 'react'
import Loadable from 'react-loadable'
import {alpha, useTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

const Plotly = Loadable({
    loader: () => import(`react-plotly.js`),
    loading: ({timedOut}) =>
        timedOut ? (
            <blockquote>Error: Loading react-plotly.js timed out.</blockquote>
        ) : (
            <blockquote>is Loading ...</blockquote>
        ),
    timeout: 100000,
});

export const LazyPlot = ({layout, data, plotType}) => {

    const theme = useTheme()

    delete layout.width;
    const isLight = theme.palette.mode === "light"

    const enhancedLayout = {
        ...layout,
        autosize: true,
        dragmode: true,
    }

    if (plotType === "Heatmap") {
        enhancedLayout.paper_bgcolor = theme.palette.background.paper
        enhancedLayout.plot_bgcolor = isLight ? grey["100"] : grey["900"]
        // https://plotly.com/javascript/reference/layout/#layout-paper_bgcolor
        // title font and color
        enhancedLayout.title.font = {};
        enhancedLayout.title.font["color"] = theme.palette.secondary.main;
        enhancedLayout.title.font["size"] = 30;
        enhancedLayout.title.font["family"] = "sans-serif";


        // font and color
        enhancedLayout.font = {};
        enhancedLayout.font["color"] = theme.palette.text.primary;
        enhancedLayout.font["family"] = "sans-serif";

    }else if (plotType === "Line") {
        enhancedLayout.paper_bgcolor = theme.palette.background.paper
        enhancedLayout.plot_bgcolor = isLight ? grey["100"] : grey["900"]
        // https://plotly.com/javascript/reference/layout/#layout-paper_bgcolor
        // title font and color
        enhancedLayout.title.font = {};
        enhancedLayout.title.font["color"] = theme.palette.secondary.main;
        enhancedLayout.title.font["size"] = 30;
        enhancedLayout.title.font["family"] = "sans-serif";

        // font and color
        enhancedLayout.font = {};
        enhancedLayout.font["color"] = theme.palette.text.primary;
        enhancedLayout.font["family"] = "sans-serif";


        // enhancedLayout.xaxis
        enhancedLayout.xaxis.showline = true
        enhancedLayout.xaxis.linewidth = 2
        enhancedLayout.xaxis.linecolor = theme.palette.text.primary
        enhancedLayout.xaxis.mirror = true;

        // enhancedLayout.yaxis
        enhancedLayout.yaxis.showline = true
        enhancedLayout.yaxis.linewidth = 2
        enhancedLayout.yaxis.linecolor = theme.palette.text.primary
        enhancedLayout.yaxis.mirror = true;

        // x-axis grid lines
        enhancedLayout.xaxis.gridcolor = theme.palette.text.disabled;
        enhancedLayout.xaxis.gridwidth = 2;
        enhancedLayout.xaxis.griddash = 'dash'

        // y-axis grid lines
        enhancedLayout.yaxis.gridcolor = theme.palette.text.disabled;
        enhancedLayout.yaxis.gridwidth = 2;
        enhancedLayout.yaxis.griddash = 'dash'


        // zero-line
        enhancedLayout.xaxis.zeroline = true;
        enhancedLayout.xaxis.zerolinewidth = 1
        enhancedLayout.xaxis.zerolinecolor = grey.A400

        // zero-line
        enhancedLayout.yaxis.zeroline = true;
        enhancedLayout.yaxis.zerolinewidth = 1
        enhancedLayout.yaxis.zerolinecolor = grey.A400



    } else if (plotType === "Bar") {


        // bars and error bars colors
        data[0].marker.color = theme.palette.secondary.main
        data[0].error_x["color"] = theme.palette.text.primary


        enhancedLayout.paper_bgcolor = theme.palette.background.paper
        enhancedLayout.plot_bgcolor = isLight ? grey["100"] : grey["900"]
        // https://plotly.com/javascript/reference/layout/#layout-paper_bgcolor
        // title font and color
        enhancedLayout.title.font = {};
        enhancedLayout.title.font["color"] = theme.palette.secondary.main;
        enhancedLayout.title.font["size"] = 30;
        enhancedLayout.title.font["family"] = "sans-serif";

        // font and color
        enhancedLayout.font = {};
        enhancedLayout.font["color"] = theme.palette.text.primary;
        enhancedLayout.font["family"] = "sans-serif";


        // zero-line
        // enhancedLayout.xaxis.zeroline = true;
        // enhancedLayout.xaxis.zerolinewidth = 1
        // enhancedLayout.xaxis.zerolinecolor = "blue"

        // enhancedLayout.xaxis
        enhancedLayout.xaxis.showline = true
        enhancedLayout.xaxis.linewidth = 2
        enhancedLayout.xaxis.linecolor = theme.palette.text.primary
        enhancedLayout.xaxis.mirror = true;

        // enhancedLayout.yaxis
        enhancedLayout.yaxis.showline = true
        enhancedLayout.yaxis.linewidth = 2
        enhancedLayout.yaxis.linecolor = theme.palette.text.primary
        enhancedLayout.yaxis.mirror = true;

        // x-axis grid lines
        enhancedLayout.xaxis.gridcolor = theme.palette.text.disabled;
        enhancedLayout.xaxis.gridwidth = 2;
        enhancedLayout.xaxis.griddash = 'dash'

        // y-axis grid lines
        enhancedLayout.yaxis.gridcolor = "transparent";

    }


    // data.

    return (
        <Plotly
            layout={enhancedLayout}
            data={data}
            useResizeHandler
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "red",

            }}
        />
    )
}