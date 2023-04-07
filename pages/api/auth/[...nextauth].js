import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import {logger} from "../../../lib/logger";
import sha256 from "crypto-js/sha256";


const hashPassword = (password) => {
    return sha256(password).toString();
};
export const authOptions = {
    // Configure one or more authentication providers
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // profile(profile) {
            //     profile.
            // },

        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Eric"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials, req) => {
                logger.debug("credentials: ", JSON.stringify(credentials))

                const mfuser = {
                    id: 'clg73jcdq0000l5080l43161t',
                    name: 'siktir',
                    email: 'a1@a.com',
                    image: null,
                    password: 'bf2cb58a68f684d95a3b78ef8f661c9a4e5b09e82cc8f9cc88cce90528caeb27'
                }


                const user = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/user/check_credentials`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            accept: "application/json",
                        },
                        body: JSON.stringify(credentials),
                    })
                    .then((res) => res.json())
                    .catch((err) => {
                        logger.debug(`Error in call check_credentials api: ${err}`)
                        return mfuser;
                    });


                logger.debug("final returned user: ", user)

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
        // ...add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/sign_in",
        // signOut: "/auth/sign_out",
    },

    // session: {
    //     strategy: 'database',
    //     maxAge: 2 * 60 * 60, // 2 hours
    //     updateAge: 30 * 60, // 30 minutes
    // },
    // pages: {
    //     signIn: '/auth/sign_in',
    //     signOut: '/auth/sign_out',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verification', // (used for check email message)
    //     newUser: '/auth/sign_up' // New users will be directed here on first sign in (leave the property out if not of interest)
    // }
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            logger.debug("Sign in callback called")
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({token, account, profile}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            // if (account) {
            //     token.accessToken = account.access_token
            //     token.id = profile.id
            // }
            return token
        },
        /////////////////////////////////////////////////////////////////////////////////////////
        //// When using database sessions, the User (user) object is passed as an argument.
        //// When using JSON Web Tokens for sessions, the JWT payload (token) is provided instead.
        /////////////////////////////////////////////////////////////////////////////////////////
        async session({session, token, user}) {
            // Send properties to the client, like an access_token and user id from a provider.
            // session.accessToken = token.accessToken
            // session.user.id = token.id
            logger.debug(`Session callback called. ${token.email}`)

            const result = await prisma.user.findUnique({
                where: {
                    email: token.email,
                },
                select: {
                    likedArticles: {
                        select: {
                            id: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                    status: true,
                    role: true,
                }
            })

            session.user = {
                ...session.user,
                ...result,
                likedArticles: result.likedArticles.map(item => item.id)
            }

            logger.debug("Manipulated session.user:", session.user)

            return session
        }
    },
    theme: {
        // colorScheme: "light",
    },
    events: {
        async signIn(message) { /* on successful sign in */

        },
        async signOut(message) { /* on signout */
        },
        async createUser(message) { /* user created */
        },
        async updateUser(message) { /* user updated - e.g. their email was verified */
        },
        async linkAccount(message) { /* account (e.g. Twitter) linked to a user */
        },
        async session(message) { /* session is active */
        },
    },
    logger: {
        error: (code, metadata) => {
            logger.error(code, metadata);
        },
        warn: (code) => {
            logger.warn(code);
        },
        debug: (code, metadata) => {
            logger.debug(code, metadata);
        },
    },
}

export default async function auth(req, res) {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    return await NextAuth(req, res, authOptions)
}