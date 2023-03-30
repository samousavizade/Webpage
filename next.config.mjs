// next.config.mjs

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from 'remark-gfm'
import {remarkCodeHike} from "@code-hike/mdx";
import mdx from '@next/mdx';
import images from "remark-images"
// import emoji from "remark-emoji"

import theme from "shiki/themes/dark-plus.json" assert {type: "json"}
import rehypeStringify from "rehype-stringify";
import remarkToc from "remark-toc";

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkMath, remarkGfm, [remarkCodeHike, {theme, lineNumbers: true, showCopyButton: true,}], images],
        rehypePlugins: [rehypeKatex, ],

        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
        pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
        experimental: {
            appDir: true,
        },

        // Optionally, add any other Next.js config below
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
    images: {
        domains: ["images.unsplash.com", "wallpapercave.com", "cdn.mathpix.com"]
    },
};

export default withMDX({
    ...nextConfig,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})

// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/,
//     options: {
//
//         // If you use remark-gfm, you'll need to use next.config.mjs
//         // as the package is ESM only
//         // https://github.com/remarkjs/remark-gfm#install
//         providerImportSource: '@mdx-js/react',
//         remarkPlugins: [remarkMath, remarkGfm],
//         rehypePlugins: [rehypeKatex],
//         // If you use `MDXProvider`, uncomment the following line.
//         // providerImportSource: "@mdx-js/react",
//         pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
//         experimental: {
//             // appDir: true,
//         },
//
//         latex: true,
//         // Optionally, add any other Next.js config below
//     },
// })
//
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     // Configure pageExtensions to include md and mdx
//     pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
//     // Optionally, add any other Next.js config below
//     reactStrictMode: true,
//     images: {
//         domains: ["images.unsplash.com", "wallpapercave.com"]
//     },
//
// }
//
// // Merge MDX config with Next.js config
// module.exports = withMDX(nextConfig)

//////////////////////////////////////////////////////////////////////////////////////
// // const remarkMath = require('remark-math');
// // const rehypeKatex = require('rehype-katex');
// // const remarkGfm = require('remark-gfm');
//
// // import remarkMath from "remark-math";
// // import rehypeKatex from "rehype-katex";
// // import remarkGfm from "remark-gfm";
//
// const nextConfig = {
//     pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
//     experimental: {
//         // appDir: true,
//     },
//
//     // Optionally, add any other Next.js config below
//     reactStrictMode: true,
//     images: {
//         domains: ["images.unsplash.com", "wallpapercave.com"]
//     },
// }
//
// const withNextra = require('nextra')({
//     // theme: 'nextra-theme-docs',
//     themeConfig: './theme.config.jsx',
//     theme: './theme.jsx',
//     // themeConfig: "./theme.config.jsx",
//     latex: true,
//     mdxOptions: {
//         remarkPlugins: [ import('remark-math'), import('remark-gfm') ],
//         // rehypePlugins: [ import('rehype-katex') ],
//     },
//
// })
//
// module.exports = withNextra(nextConfig)
//
// // If you have other Next.js configurations, you can pass them as the parameter:
// // module.exports = withNextra({ /* other next.js config */ })