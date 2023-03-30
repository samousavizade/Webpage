import {fetchAuthors} from "./fetch_authors";
import Article, {TAG} from "../models/article";

const authorsList = fetchAuthors()
const articlesList = [
    new Article(
        0,
        "/static/articles_images/financial_bars.jpg",
        "Financial Bars",
        "What are the numerous sorts of bars and how do they differ?",
        authorsList[0],
        "September 14, 2016",
        TAG.FIN_ML,
        ["Information Driven Bars", "Imbalance Bars", "Run Bars", "Standard Bars", "ETF-Trick", "PCA Weights", "Future Roll"],
        "./mdx_sources/FinancialBars/financial_bars.mdx",
        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        5,
        false
    ),

    new Article(
        1,
        "/static/articles_images/labeling.jpg",
        "Labeling",
        "What are the numerous sorts of labelling techniques and how they differ?",
        authorsList[0],
        "September 14, 2020",
        TAG.FIN_ML,
        ["Fixed Time Horizon", "Tripple-Barrier", "Meta Labeling", "Volatility Estimate", "False Positive", "False Negative",],
        "./mdx_sources/Labeling/labeling.mdx",
        "We spoke about how to create a $X$-dimensional matrix of financial variables from an unstructured dataset. Unsupervised learning algorithms can learn patterns from that matrix $X$, such as whether or not it has hierarchical clusters. Supervised learning techniques, on the other hand, require that the rows in $X$ be associated with an array of labels or values $y$, so that those labels or values may be predicted on unseen feature samples. We'll talk about how to classify financial data in this section.",
        5,
        true
    ),
    new Article(
        2,
        "/static/articles_images/feature_importance.jpg",

        "Feature Importance",
        "Why repeating of backtest may fail? and how to prevent it.",
        authorsList[0],
        "November 14, 2016",
        TAG.FIN_ML,
        ["MDI", "MDA", "SFI", "Orthogonal Features", "Substitution Effect", "Backtesting",],
        "./mdx_sources/FeatureImportance/feature_importance.mdx",

        "One of the most common errors in financial research is taking some data, running it through an ML algorithm, backtesting the predictions, and repeating the process until a nice-looking backtest appears. Such pseudo-discoveries abound in academic journals, and even significant hedge funds are prone to falling into this trap. It makes no difference if the backtest is an out-of-sample walk-forward. The fact that we are repeating a test on the same data will almost certainly result in a false discovery. This methodological error is so well-known among statisticians that the American Statistical Association warns against it in its ethical guidelines (American Statistical Association [2016], Discussion #4). It usually takes around 20 iterations to find a (false) investment strategy with a standard significance level (false positive rate) of 5%.",
        4,
        false
    ),
    new Article(
        3,
        "/static/articles_images/cross_validation.jpeg",
        "Cross Validation",
        "CV is yet another instance where standard ML techniques fail when applied to financial problems. Overfitting will take\n" +
        "place, and CV will not be able to detect it.",
        authorsList[0],
        "November 28, 2020",
        TAG.FIN_ML,
        ["Overfitting", "Generalization", "HPO", "Purged K-fold", "Embargo", "Backtesting", "CV In Finance"],
        "./mdx_sources/CrossValidation/cross_validation.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",

        4,
        false
    ),
    new Article(
        4,
        "/static/articles_images/ensemble_learning.jpg",
        "Ensemble Learning",
        "what makes Ensemble Methods effective, and how to avoid common errors that lead to their misuse in finance." +
        "place, and CV will not be able to detect it.",
        authorsList[0],
        "November 15, 2022",
        TAG.FIN_ML,
        ["Sources Of Errors", "Bias-Variance Decompositon", "Bagging", "Variance Reduction", "Random Forest", "Boosting", "Bagging Scalability"],
        "./mdx_sources/Ensemble/ensemble_learning.mdx",
        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        4,
        false
    ),
    new Article(
        5,
        "/static/articles_images/sample_weights.jpg",
        "Sample Weights",
        "how to use sample weights to address the problem that observations are not generated by (IID) processes.",
        authorsList[0],
        "November 15, 2022",
        TAG.FIN_ML,
        ["IID Assumption", "Overlapping Outcomes", "Time Decay", "Sequential Bootstrap", "Indicator Matrix", "MCMC"],
        "./mdx_sources/SampleWeights/sample_weights.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        4,
        false
    ),
    new Article(
        6,
        "/static/articles_images/denoising.jpg",
        "Denoising",
        "Explain a procedure for reducing the noise and enhancing the signal included in an empirical covariance matrix.",
        authorsList[0],
        "November 15, 2022",
        TAG.FIN_ML,
        ["Marcenko–Pastur", "Signal/Noise Ratio", "MV Portfolio", "M SR Portfolio", "Targeted Shrinkage"],
        "./mdx_sources/Denoising/denoising.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        4,
        false
    ),
    new Article(
        7,
        "/static/articles_images/dangers_of_backtesting.jpg",
        "Dangers Of Backtesting",
        "A common misunderstanding is to think of backtesting as a research tool. Researching and backtesting is like drinking and driving.",
        authorsList[0],
        "November 15, 2022",
        TAG.FIN_ML,
        ["Flawless Backtest", "Bias Types", "Strategy Selection", "Selection Bias", "CS-CV"],
        "./mdx_sources/DangersOfBacktesting/dangers_of_backtesting.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        3,
        false
    ),
    new Article(
        8,
        "/static/articles_images/structural_breaks.jpg",
        "Structural Breaks",
        "Structural breaks, like the transition from one market regime to another, is one example of such a confluence that is of particular interest.",
        authorsList[0],
        "October 11, 2021",
        TAG.FIN_ML,
        ["CUSUM Test", "Explosiveness Test", "S-ADF Test", "Martingale Test", "Recursive Residuals"],
        "./mdx_sources/StructuralBreaks/structural_breaks.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",

        12,
        false
    ),
    new Article(
        9,
        "/static/articles_images/entropy_features.jpg",
        "Entropy Features",
        "When markets are not perfect, prices are formed with partial information, and as some agents know more than others.",
        authorsList[0],
        "December 15, 2021",
        TAG.FIN_ML,
        ["Shannon's Entropy", "Plug-In", "Lempel-Ziv", "Generalized Mean", "Market Efficiency"],
        "./mdx_sources/EntropyFeatures/entropy_features.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        6,
        false
    ),
    new Article(
        10,
        "/static/articles_images/microstructural_features.jpg",
        "Microstructural Features",
        "The level of detail contained in FIX messages provides researchers with the ability to understand how market participants conceal and reveal their intentions.",
        authorsList[0],
        "October 11, 2021",
        TAG.FIN_ML,
        ["Tick Rule", "Roll Model", "Corwin & Schultz", "Kyle's Lambda", "Amihud's Lambda", "Hasbrouck’s Lambda", "V-PIN"],
        "./mdx_sources/MicrostructuralFeatures/microstructural_features.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        12,
        false
    ),
    new Article(
        11,
        "/static/articles_images/portfolio_construction.jpg",
        "Portfolio Construction",
        "how to deal with the instability caused by the noise contained in the covariance matrix.",
        authorsList[0],
        "February 11, 2019",
        TAG.FIN_ML,
        ["MV Unstability", "Inverse Variance", "Condition Number", "Markowitz’s Curse", "HRP", "NCO"],
        "./mdx_sources/PortfolioConstruction/portfolio_construction.mdx",

        "What's the distinction between organized and unstructured data? We will learn how to work with unstructured financial data and then transform it into a structured dataset that can be used by $mathrmML$ algorithms. In general, you should avoid consuming someone else's processed dataset because you will most likely find what someone else already knows or will figure out shortly. Ideally, your starting point will be a collection of unstructured, raw data that you will analyse in order to generate relevant characteristics.",
        3,
        false
    ),

];

export function fetchArticles() {
    return articlesList.map((article) => JSON.parse(JSON.stringify(article)))
}