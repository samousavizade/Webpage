// import Head from "next/head";
//
// export default function Layout({ children, pageOpts }) {
//     const {
//         title,
//         frontMatter,
//         headings
//     } = pageOpts
//     return (
//         <>
//             <Head>
//                 <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet" />
//                 <title>{title}</title>
//                 <meta name="og:image" content={frontMatter.image} />
//             </Head>
//             <div style={{backgroundColor: "blue", color: "red", fontSize: 25, fontWeight: "bolder", fontFamily: "Pacifico"}}>
//                 {children}
//             </div>
//         </>
//     )
// }