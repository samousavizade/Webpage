// import {useSession} from "next-auth/react";
//
// export default function AdminDashboard() {
//     const { data: session } = useSession()
//     // session is always non-null inside this page, all the way down the React tree.
//     return "Some super secret dashboard"
// }
//
// AdminDashboard.auth = {
//     role: "admin",
//     loading: <div> Loading... </div>,
//     unauthorized: "/login-with-different-user" // redirect to this url
// }