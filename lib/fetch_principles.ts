import Principle from "../models/principle";

const myPrinciples = [
    {
        subject: "On Freedom",
        principles: [
            new Principle(
                0,
                "/static/philosephors/hegel.jpg",
                "Freedom",
                `
                     Man is free, this is certainly the substantial nature of man; 
                     and not only is this liberty not relinquished in the state,
                     but it is actually in the state that it is first realised. 
                     The freedom of nature, the gift of freedom, is not anything real;
                     for the state is the first realisation of freedom.
                    `,
                "Georg Wilhelm Friedrich Hegel",
            ),
            new Principle(
                1,
                "/static/philosephors/david_hume.jpg",
                "Freedom",
                `
                    It is seldom, that liberty of any kind is lost all at once. Slavery has so frightful an aspect to men accustomed to freedom, that it must steal upon them by degrees, and must disguise itself in a thousand shapes, in order to be received.
                    `,
                "David Hume"
            )
        ]
    },
    {
        subject: "On Justice & Equality",
        principles: [
            new Principle(
                2,
                "/static/philosephors/john_rawls.jpg",
                "Justice & Equality",
                `
                    Justice is the first virtue of social institutions, 
                    as truth is of systems of thought. 
                    A theory however elegant and economical must be rejected or revised 
                    if it is untrue; likewise laws and institutions no matter how efficient
                    and well-arranged must be reformed or abolished if they are unjust. 
                    Each person possesses an inviolability founded on justice 
                    that even the welfare of society as a whole cannot override. 
                  `,
                "John Rawls"
            ),
            new Principle(
                3,
                "/static/philosephors/kant.jpg",
                "Justice & Equality",
                `
                     Even if a civil society were to be dissolved by the consent of all its members
                     (e.g., if a people inhabiting an island decided to separate and disperse throughout the world), 
                     the last murderer remaining in prison would first have to be executed,
                     so that each has done to him what his deeds deserve and blood guilt does not cling to the people
                     for not having insisted upon this punishment; for otherwise the people can be regarded as collaborators 
                     in his public violation of justice.
                    `,
                "Immanuel Kant"
            )
        ]
    },
    {
        subject: "On Knowledge",
        principles: [
            new Principle(
                4,
                "/static/philosephors/kant.jpg",
                "Knowledge",
                `
                     Experience without theory is blind, but theory without experience is mere intellectual play. \n\n
                     All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.
                    `,
                "Immanuel Kant"
            ),
            new Principle(
                5,
                "/static/philosephors/david_hume.jpg",
                "Knowledge",
                `By this means all knowledge degenerates into probability; and this probability is greater or less,
                     according to our experience of the veracity or deceitfulness of our understanding, and according to
                     the simplicity or intricacy of the question.`,
                "Hume",
            ),

        ]
    },
    {
        subject: "On Internationalism",
        principles: [
            new Principle(
                6,
                "/static/philosephors/karl_marx.png",
                "Internationalism",
                `
                     If emancipation of the working classes requires their fraternal concurrence,
                     how are they to fulfill that great mission with a foreign policy 
                     in pursuit of criminal designs, playing upon national prejudices, 
                     and squandering in piratical wars the people’s blood and treasure? 
                    `,
                "Karl Marx"
            ),
            new Principle(
                7,
                "/static/philosephors/socrate.jpg",
                "Internationalism",
                `
                I am not an Athenian or a Greek, but a citizen of the world.
                ... I am a Citizen of the World, and my Nationality is Goodwill. [was atrributed to Socrates in the writings of Plato]`,
                "Socrate"
            )
        ]
    }
]

export async function fetchPrinciples() {
    return await JSON.parse(JSON.stringify(myPrinciples))
}