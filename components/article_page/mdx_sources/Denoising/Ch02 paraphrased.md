# Detonation and denoising

## Inspiration


Covariance matrices are commonly used in finance. We utilize them to conduct regressions, evaluate risks, optimize portfolios, run Monte Carlo simulations, discover clusters, reduce the dimensionality of a vector space, and so on. Empirical covariance matrices are calculated using a sequence of observations from a random vector to estimate the linear comovement between the random variables that comprise the random vector. Because these observations are limited and nondeterministic, the estimated covariance matrix contains some noise. Empirical covariance matrices constructed from estimated factors are similarly numerically ill-conditioned, as the estimated factors are also based on incorrect data. Unless we address this noise, it will influence the covariance matrix computations, perhaps rendering the study meaningless.

Here, we attempt to describe a method for minimizing noise and boosting signals in an empirical covariance matrix. We will presume that empirical covariance and correlation matrices have been treated to this approach throughout this Element.

## The Marcenko-Pastur Theorem is a mathematical theorem.


Consider a matrix $X$ of independent and identically distributed random observations with a size of $T x N$ and an underlying process with a mean of zero and a variance of $\sigma^{2}$. The matrix $C=T^{-1} X^{\prime} X$ has eigenvalues $\lambda$ that asymptotically converge (as $N \rightarrow+\infty$ and $T \rightarrow+\infty$ with $1<T_{N}<+\infty$ ) to the Marcenko-Pastur probability density function (PDF),

$$
f[\lambda]= \begin{cases}\frac{T}{N} \frac{\sqrt{\left(\lambda_{+}-\lambda\right)\left(\lambda-\lambda_{-}\right)}}{2 \pi \lambda \sigma^{2}} & \text { if } \lambda \in\left[\lambda_{-}, \lambda_{+}\right] \\ 0 & \text { if } \lambda \notin\left[\lambda_{-}, \lambda_{+}\right]\end{cases}
$$

where $\lambda_{+}=\sigma^{2}(1+\sqrt{N / T})^{2}$ is the greatest predicted eigenvalue and $\lambda_{-}=\sigma^{2}(1-\sqrt{N / T})^{2}$ is the least expected eigenvalue. When $\sigma^{2}=1$, the correlation matrix associated with $X$ is $C$. The Marcenko-Pastur PDF is implemented in Python by Code Snippet $2.1$.

Eigenvalues $\lambda \in\left[\lambda_{-}, \lambda_{+}\right]$are consistent with random behavior, and eigenvalues $\lambda \notin\left[\lambda_{-}, \lambda_{+}\right]$are consistent with nonrandom behavior. Specifically, we associate eigenvalues $\lambda \in\left[0, \lambda_{+}\right]$with noise. Figure $2.1$ and Code Snippet $2.2$ demonstrate how closely the Marcenko-Pastur distribution explains the eigenvalues of a random matrix $X$. 


### SNIPPEt $1$ MARCENKO-PASTUR THEOREM TESTING
```julia
  function pdfMarcenkoPastur(var, # variance of observations
                           ratio, # T/N
                           points) # points for lambda
    λmin = var*(1 - sqrt(1/ratio))^2 # minimum expected eigenvalue
    λmax = var*(1 + sqrt(1/ratio))^2 # maximum expected eigenvalue
    eigenValues = range(λmin, stop = λmax, length = points) # range for eigen values
    diffλ = ((λmax .- eigenValues).*(eigenValues .- λmin)) # numerical error
    diffλ[diffλ .< -1E-3] .= 0. # numerical error
    pdf = ratio./(2*pi*var*eigenValues).*diffλ # probability density function
    # pdf = ratio./(2*pi*var*eigenValues).*sqrt.(((λmax .- eigenValues).*(eigenValues .- λmin))) # probability density function
    return DataFrames.DataFrame(index = eigenValues, values = pdf)
end

function PCA(matrix) # Hermitian matrix
    eigenValues, eigenVectors = LinearAlgebra.eigen(matrix) # compute eigenValues, eigenVectors from matrix
    indices = sortperm(eigenValues, rev = true) # arguments for sorting eigenValues desc
    eigenValues, eigenVectors = eigenValues[indices], eigenVectors[:, indices] # sort eigenValues, eigenVectors
    eigenValues = Diagonal(eigenValues) # diagonal matrix with eigenValues
    return eigenValues, eigenVectors
end

function KDE(observations; # Series of observations
             bandWidth = 0.25, 
             kernel = Distributions.Normal, # type of kernel
             valuesForEvaluating = nothing) # array of values on which the fit KDE will be evaluated   
   
    density = kde(observations, kernel = kernel, bandwidth = bandWidth) # kernel density
    if valuesForEvaluating == nothing
        valuesForEvaluating = reshape(reverse(unique(observations)), :, 1) # reshape valuesForEvaluating to vector
    end
    density = KernelDensity.pdf(density, valuesForEvaluating[:]) # probability density function
    return DataFrames.DataFrame(index = vec(valuesForEvaluating), values = density)
end

# Random Matrix
X = rand(Normal(0, 1), 10000, 1000)
# Get the eigenvalues and vectors of the correlation matrix of X
eVal0, eVec0 = PCA(cor(X))
# Marcenko-Pastur pdf
pdf0 = pdfMarcenkoPastur(1., size(X)[1]/size(X)[2], 1000)
# Fits a Kernel Density Estimate to the eigenvalues of the correlation matrix
pdf1 = KDE(diag(eVal0), bandWidth = 0.01, kernel = Distributions.Normal, valuesForEvaluating = nothing);
```

```python
def marcenkoPasturPDF(var, # variance of observations
                      q, # T/N
                      pts) : #
    # Marcenko-Pastur pdf
    emin, emax = var*(1 - (1./q)**.5)**2, var*(1 + (1./q)**.5)**2
    eval = np.linspace(emin, emax, pts).flatten()
    pdf = q/(2*np.pi*var*eval)*((emax - eval)*(eval - emin))**.5
    pdf = pd.Series(pdf, index = eval)
    return pdf

def PCA(matrix): # Get eval,evec from a Hermitian matrix
    import numpy as np, pandas as pd
    eval, evec = np.linalg.eigh(matrix)
    indices = eval.argsort()[::-1] # arguments for sorting eval desc
    eval, evec = eval[indices], evec[:,indices]
    eval = np.diagflat(eval)
    return eval, evec

def fitKDE(obs, # Series of observations
           bwidth = .25, #
           kernel = 'gaussian', # 
           x = None): #
    # Fit kernel to a series of obs, and derive the prob of obs
    # x is the array of values on which the fit KDE will be evaluated
    if len(obs.shape) == 1:obs=obs.reshape(-1,1)
    kde = KernelDensity(kernel = kernel, bandwidth = bwidth).fit(obs)
    if x is None: x = np.unique(obs).reshape(-1,1)
    if len(x.shape) == 1:x = x.reshape(-1,1)
    logprob = kde.score_samples(x) # log(density)
    pdf = pd.Series(np.exp(logprob), index=x.flatten())
    return pdf

x = np.random.normal(size = (10000, 1000))
eval0, evec0 = PCA(np.corrcoef(x ,rowvar = 0))
pdf0 = marcenkoPasturPDF(1., q = x.shape[0]/float(x.shape[1]), pts=1000)
pdf1 = fitKDE(np.diag(eval0), bwidth=.01) # empirical pdf
```

Figure 1 depicts the Marcenko-Pastur theorem.


<figure>
<img src="Figs\1.png" width="600" alt="Types of Financial Data"
/><figcaption><span style="color:DimGray; font-weight:bold">Blank</span></figcaption></figure>


## Signal Random Matrix

Not all eigenvectors in an empirical correlation matrix are necessarily random. Because Code Snippet $2$ generates a covariance matrix that is not totally random, its eigenvalues will only approximate the Marcenko-Pastur PDF. Only numberFactors have some signal among the numberColumns random variables that comprise the covariance matrix formed by randomCov. To further dilute the signal, we combine it with a random matrix with an alpha weight.

## Marcenko-Pastur Distribution Fitting

In this case, we use the technique proposed by Laloux et al (2000). Because random eigenvectors only account for a portion of the variance, we may alter $\sigma^{2}$ in the previous equations accordingly. For example, if we assume that the eigenvector associated with the greatest eigenvalue is not random, we should substitute $\sigma^{2}$ in the earlier equations with $\sigma^{2}\left(1-\lambda_{+} / N\right)$. In reality, we may get the implied $\sigma^{2}$ by fitting the function $f[\lambda]$ to the empirical distribution of eigenvalues. This yields the variance explained by the random eigenvectors in the correlation matrix, as well as the cutoff level $\lambda_{+}$, adjusted for nonrandom eigenvectors.

Snippet 3 applies the Marcenko-Pastur PDF on a random covariance matrix with the signal. The fit aims to identify the $\sigma^{2}$ value that minimizes the sum of squared discrepancies between the analytical PDF and the kernel density estimate (KDE) of the observed eigenvalues (for references on KDE, see Rosenblatt 1956; Parzen 1962). The value $\lambda_{+}$ is reported as eMax0, $\sigma^{2}$ is saved as var0, and the number of factors is retrieved as $numberFactors0$.


### SNIPPEt $2$ TO A RANDOM COVARIANCE MATRIX ADD SIGNAL


```julia
function randomCov(numberColumns, # number of columns
                   numberFactors) # number of factors
    data = rand(Normal(), numberColumns, numberFactors) # random data
    covData = data*data' # covariance of data
    covData += Diagonal(rand(Uniform(), numberColumns)) # add noise to the matrix
    return covData
end
function covToCorr(cov) # covariance matrix
    std = sqrt.((diag(cov))) # standard deviations
    corr = cov./(std.*std') # create correlation matrix
    corr[corr .< -1] .= -1 # numerical error
    corr[corr .> 1] .= 1 # numerical error
    return corr
end
alpha, numberColumns, numberFactors, ratio = .995, 1000, 100, 10
covv = cov(rand(Normal(0,1),numberColumns*ratio,numberColumns))
covv = alpha*covv + (1 - alpha)*randomCov(numberColumns, numberFactors) # noise+signal
corr0 = covToCorr(covv)
eval0, evec0 = PCA(corr0);
```

```python
def randomCov(ncols, #
              nfacts): #
    w = np.random.normal(size = (ncols, nfacts))
    cov = np.dot(w, w.T) # random cov matrix, however not full rank
    cov += np.diag(np.random.uniform(size = ncols)) # full rank cov
    return cov

def cov2Corr(cov): # 
    # Derive the correlation matrix from a covariance matrix
    std = np.sqrt(np.diag(cov))
    corr = cov/np.outer(std, std)
    corr[corr < -1], corr[corr > 1] = -1, 1 # numerical error
    return corr
alpha, ncols, nfact, q=.995, 1000, 100, 10
cov = np.cov(np.random.normal(size = (ncols*q, ncols)), rowvar = 0)
cov = alpha*cov + (1 - alpha)*randomCov(ncols, nfact) # noise+signal
corr0 = cov2Corr(cov)
eval0, evec0 = PCA(corr0)
```


### SNIPPET 3 FItTING THE MARCENKO–PASTUR PDF

```julia
function errorPDFs(var, # variance
                   eigenValues, # eigenvalues
                   ratio, # T/N
                   bandWidth; # band width for kernel
                   points = 1000) # points for pdfMarcenkoPastur
   pdf0 = pdfMarcenkoPastur(var, ratio, points) # theoretical pdf
   pdf1 = KDE(eigenValues, bandWidth = bandWidth, kernel = Distributions.Normal, valuesForEvaluating = pdf0.index) # empirical pdf
   sse = sum((pdf1.values .- pdf0.values).^2) # sum of squares of errors
   return sse 
end 
function findMaxEval(eigenValues, # eigenvalues
                     ratio, # T/N
                     bandWidth) # band width for kernel
    out = optimize(var->errorPDFs(var, eigenValues, ratio, bandWidth), 1E-5, 1-1E-5) # minimize pdferrors
    if Optim.converged(out) == true
        var = Optim.minimizer(out) # variance that minimizes pdferrors
    else
        var = 1
    end
    λmax = var*(1 + (1/ratio)^.5)^2 # max random eigenvalue
    return λmax, var
end
emax0, var0 = findMaxEval(diag(eval0), ratio, .01)
numberFactors0 = size(eval0)[1] - searchsortedfirst(reverse(diag(eval0)), emax0) + 1
```

```python
def errorPDFs(var, eval, q, bwidth, pts = 1000):
    # Fit error
    pdf0 = marcenkoPasturPDF(var, q, pts) # theoretical pdf
    pdf1 = fitKDE(eval, bwidth, x = pdf0.index.values) # empirical pdf
    sse = np.sum((pdf1 - pdf0)**2)
    return sse

def findMaxEval(eval, q, bwidth):
    # Find max random eval by fitting Marcenko’s dist
    out = minimize(lambda *x:errorPDFs(*x), .5, args = (eval, q, bwidth), bounds = ((1E-5 , 1-1E-5), ))
    if out['success']:var = out['x'][0]
    else:var = 1
    emax = var*(1 + (1./q)**.5)**2
    return emax, var
emax0, var0 = findMaxEval(np.diag(eval0), q, bwidth = .01)
nfacts0 = eval0.shape[0] - np.diag(eval0)[::-1].searchsorted(emax0)
```


![](https://cdn.mathpix.com/cropped/2022_03_27_d078ac273c275b353eb5g-005.jpg?height=458&width=610&top_left_y=115&top_left_x=131)

<figure>
<img src="Figs\?.png" width="600" alt="Types of Financial Data"
/><figcaption><span style="color:DimGray; font-weight:bold">Blank</span></figcaption></figure>

Fitting the Marcenko-Pastur PDF to a noisy covariance matrix (Figure 2).


Figure $2$ depicts the eigenvalue histogram and PDF of the fitted Marcenko-Pastur distribution. Eigenvalues to the right of the fitted Marcenko-Pastur distribution cannot be linked with noise. Hence they must be connected to the signal. The code returns 100 for $numberFactors0$, the same number of factors we injected into the covariance matrix. Despite a weak signal in the covariance matrix, the technique was able to distinguish the eigenvalues associated with noise from the eigenvalues associated with the signal. The fitted distribution predicts $\sigma^{2} \approx .6768$, implying that the signal accounts for just approximately $32.32 \%$ of the variance. This is one method of calculating the signal-to-noise ratio in financial data sets, which is well known to be poor due to arbitrage effects.

## Denoise

Shrinking a numerically ill-conditioned covariance matrix is popular in financial applications (Ledoit and Wolf 2004). Shrinkage minimizes the condition number of the covariance matrix by bringing it closer to a diagonal. Shrinkage, however, does this without distinguishing between noise and signal. As a result, shrinkage might amplify an already weak signal. In the previous section, we learned how to differentiate between eigenvalues associated with noise components and eigenvalues related to signal components. This section will look at how to use this information to denoise the correlation matrix.

### Method of Constant Residual Eigenvalues

This approach consists in setting a constant eigenvalue for all random eigenvectors. Let $\left\{\lambda_{n}\right\}_{n=1, \ldots, N}$ be the set of all eigenvalues, ordered descending, and $i$ be the position of the eigenvalue such that $\lambda_{i}>\lambda_{+}$and $\lambda_{i+1} \leq \lambda_{+}$. Then we set $\lambda_{j}=1 /(N-i) \sum_{k=i+1}^{N} \lambda_{k}, j=i+1, \ldots, N$, hence preserving the trace of the correlation matrix. Given the eigenvector decomposition $V W=W \Lambda$, we form the denoised correlation matrix $C_{1}$ as

$$
\begin{aligned}
\widetilde{C}_{1} &=W \widetilde{\Lambda} W^{\prime} \\
C_{1} &=\widetilde{C}_{1}\left[\left(\operatorname{diag}\left[\widetilde{C}_{1}\right]\right)^{\frac{1}{2}}\left(\operatorname{diag}\left[\widetilde{C}_{1}\right]\right)^{\frac{1^{\prime}}{2}}\right]^{-1},
\end{aligned}
$$

The apostrophe (') transposes a matrix, and diag[.] zeroes all non-diagonal elements of a squared matrix. The second transformation is used to rescale the matrix $\widetilde{C}_{1}$ so that the major diagonal of $C_{1}$ is an array of $1 \mathrm{~s}$. This technique is implemented by Code Snippet $4$. Figure $3$ compares the logarithms of the eigenvalues before and after this denoising approach.

### DENOISING SNIPPET 4 BY CONSTANT RESIDUAL EIGENVALUE

```julia
function denoisedCorr(eigenValues, # eigenvalues
                      eigenVectors,  # eigenvectors
                      numberFactors) # number of factors
    λ = copy(diag(eigenValues)) # copy eigenvalues
    λ[numberFactors:end] .= sum(λ[numberFactors:end])/(size(λ)[1] - numberFactors)
    λdiag = Diagonal(λ) # diagonal matrix with λ
    cov = eigenVectors * λdiag * eigenVectors' # covariance matrix
    corr2 = covToCorr(cov) # correlation matrix
    return corr2
end
corr1 = denoisedCorr(eval0, evec0, numberFactors0)
eval1 , evec1 = PCA(corr1);
```

```python
def denoisedCorr(eval, #
                evec, #
                nfacts): #
    # Remove noise from corr by fixing random eigenvalues
    eval_ = np.diag(eval).copy()
    eval_[nfacts:] = eval_[nfacts:].sum()/float(eval_.shape[0] - nfacts)
    eval_= np.diag(eval_)
    corr1 = np.dot(evec,eval_).dot(evec.T)
    corr1 = cov2Corr(corr1)
    return corr1
corr1 = denoisedCorr(eval0, evec0, nfacts0)
eval1 , evec1 = PCA(corr1)
```

<figure>
<img src="Figs\3.png" width="600" alt="Types of Financial Data"
/><figcaption><span style="color:DimGray; font-weight:bold">Blank</span></figcaption></figure>


Figure 3 compares eigenvalues before and after the residual eigenvalue approach was applied.


### Shrinkage on Demand

Because it reduces noise while keeping the signal, the numerical technique described previously is better for shrinkage. Alternatively, we might limit the shrinkage application to random eigenvectors. Take a look at the correlation matrix. $C_{1}$

$$
C_{1}=W_{L} \Lambda_{L} W_{L}^{\prime}+\alpha W_{R} \Lambda_{R} W_{R}^{\prime}+(1-\alpha) \operatorname{diag}\left[W_{R} \Lambda_{R} W_{R}^{\prime}\right]
$$

where $W_{R}$ and $\Lambda_{R}$ are the eigenvectors and eigenvalues associated with $\left\{n \mid \lambda_{n} \leq \lambda_{+}\right\}, W_{L}$ and $\Lambda_{L}$ are the eigenvectors and eigenvalues associated with $\left\{n \mid \lambda_{n}>\lambda_{+}\right\}$, and $\alpha$ regulates the amount of shrinkage among the eigenvectors and eigenvalues associated with noise ( $\alpha \rightarrow 0$ for total shrinkage). This technique is implemented by Code Snippet $5$. Figure $4$ compares the logarithms of the eigenvalues before and after this denoising approach.


![](https://cdn.mathpix.com/cropped/2022 03 27 d078ac273c275b353eb5g-008.jpg?height=462&width=609&top left y=122&top left x=152)

Figure 4 compares eigenvalues before and after the targeted shrinking strategy was used.

### DENOISING SNIPPET 5 BY TARGETED SHRINKAGE

```julia
function denoisedCorrShrinkage(eigenValues, # eigen values
                               eigenVectors, # eigen vectors
                               numberFactors; # number of factors
                               α = 0) # parameter for shrinkage
   eigenValuesL = eigenValues[1:numberFactors, 1:numberFactors] # divide eigenValues
   eigenVectorsL = eigenVectors[:, 1:numberFactors] # divide eigenVectors
   eigenValuesR = eigenValues[numberFactors:end, numberFactors:end] # divide eigenValues
   eigenVectorsR = eigenVectors[:, numberFactors:end] # divide eigenVectors
   corr0 = eigenVectorsL * eigenValuesL * transpose(eigenVectorsL) # correlation matrix 1
   corr1 = eigenVectorsR * eigenValuesR * transpose(eigenVectorsR) # correlation matrix 2
   corr2 = corr0 + α*corr1 + (1 - α)*diagm(diag(corr1)) # correlation matrix
   return corr2 
end
corr1 = denoisedCorrShrinkage(eval0, evec0, numberFactors0, α = .5)
eval1 , evec1 = PCA(corr1);
```

```python
def denoisedCorr2(eval, #
                  evec, # 
                  nfacts, # 
                  alpha = 0): # 
    # Remove noise from corr through targeted shrinkage
    evalL, evecL = eval[:nfacts, :nfacts], evec[:, :nfacts]
    evalR, evecR = eval[nfacts:, nfacts:], evec[:, nfacts:]
    corr0 = np.dot(evecL,evalL).dot(evecL.T)
    corr1 = np.dot(evecR,evalR).dot(evecR.T)
    corr2 = corr0 + alpha*corr1 + (1 -  alpha)*np.diag(np.diag(corr1))
    return corr2
corr1 = denoisedCorr2(eval0, evec0, nfacts0, alpha = .5)
eval1 , evec1 = PCA(corr1)
```

## Detoning

A market component is typically included in financial correlation matrices. The first eigenvector represents the market component, which has loadings of $W_{n, 1} \approx N^{-\frac{1}{2}}, n=1, \ldots, N$. As a result, a market component influences every item in the covariance matrix. If the market component exists, it is helpful to eliminate it in the context of clustering applications (a hypothesis that can be tested statistically). This is because clustering a correlation matrix with a significant market component is more challenging since the algorithm will need guidance to detect dissimilarities between clusters. By eliminating the market component, we can explain a more substantial amount of the link with elements that impact specific groupings of securities. It is like turning off a loud tone that hinders us from hearing other noises. Detonation is the principle components analysis equivalent of calculating beta-adjusted (or market-adjusted) returns in regression analysis. To produce the detoned correlation matrix, we may remove the market component from the denoised correlation matrix, $C_1$.

$$
\begin{aligned}
\widetilde{C}_{2} &=C_{1}-W_{M} \Lambda_{M} W_{M}^{\prime}=W_{D} \Lambda_{D} W_{D}^{\prime} \\
C_{2} &=\widetilde{C}_{2}\left[\left(\operatorname{diag}\left[\widetilde{C}_{2}\right]\right)^{1 / 2}\left(\operatorname{diag}\left[\widetilde{C}_{2}\right]\right)^{1 / 2}\right]^{-1},
\end{aligned}
$$

where $W_{M}$ and $Lambda_{M}$ are eigenvectors and eigenvalues associated with market components (typically one, but perhaps more), and $W_{D}$ and $\Lambda_{D}$ are eigenvectors and eigenvalues related with nonmarket elements.

As a result of removing (at least) one eigenvector, the detoned correlation matrix is unique. This is not a concern for clustering applications since most algorithms do not require the correlation matrix to be invertible. Nonetheless, a detoned correlation matrix $C_{2}$ cannot be used to mean-variance portfolio optimization. Instead, we can optimize a portfolio based on the chosen (nonzero) principle components and then translate the best allocations $f^{*}$ back to the original basis. In the actual basis, the optimal shares are

$$
\omega^{*}=W_{+} f^{*},
$$

where $W_{+}$ is the vector of optimum allocations to those same components and $f^{*}$ is the vector of eigenvectors that survived the detonation process (i.e., with a nonnull eigenvalue).

## Experimental Findings

Working with denoised and detoned covariance matrices provides significant advantages. These advantages stem from the mathematical characteristics of the modified matrices and may be quantified using Monte Carlo simulations. Because every member of the unconstrained efficient frontier may be formed as a convex combination of the two, we consider two distinctive efficient frontier portfolios in this section: the least variance and greatest Sharpe ratio solutions.

### Portfolio with Low Variance

In this section, we compute the errors associated with predicting a minimal variance portfolio with and without denoising. $6$ generates a vector of means and a covariance matrix from ten blocks of fifty elements each, with offdiagonal elements within each block having a $0.5$ correlation. This covariance matrix is a stylized portrayal of the S\&P 500's genuine (nonempirical) detoned correlation matrix, with each block representing an economic sector. Without sacrificing generality, the variances are taken from a uniform distribution with a range of $5 \%$ to $20 \%$, and the vector of means is derived from a Normal distribution with a mean and standard deviation equal to the covariance matrix's standard deviation. This is consistent with the idea that all assets in an efficient market have the same predicted Sharpe ratio. We set a seed to make comparing results from multiple runs with varied settings easier.


### SNIPPET 6 CREATES A BLOCK-DIAGONAL COVARIANCE MATRIX AND A MEANS VECTOR

```julia
function formBlockMatrix(numberBlocks, # number of blocks
                         sizeBlock, # size of block
                         corrBlock) # correlation in block
    block = ones(sizeBlock, sizeBlock)*corrBlock # ones matrix
    block[Statistics.diagind(block)] .= 1. # set diag to 1
    corr = BlockArray{Float64}(undef_blocks, repeat([sizeBlock], numberBlocks), repeat([sizeBlock], numberBlocks)) # corr matrix
    # change block array values
    for i in range(1,stop = numberBlocks)
        for j in range(1, stop = numberBlocks)
            if i == j
                setblock!(corr, block, i, j)
            else
                setblock!(corr, zeros(sizeBlock, sizeBlock), i, j)
            end
        end
    end
    return Matrix(corr)
end
function formTrueMatrix(numberBlocks, # number of blocks
                        sizeBlock, # size of block
                        corrBlock) # correlation in block
    corr = formBlockMatrix(numberBlocks, sizeBlock, corrBlock) # corr matrix
    columns =  Random.shuffle(collect(1:numberBlocks*sizeBlock)) # shuffle columns
    corr = corr[columns, columns] # shuffled corr matrix
    std0 = rand(Uniform(.05, 0.2), size(corr)[1]) # standard deviations
    cov0 = corrToCov(corr, std0) # cov matrix
    mu0 = rand.(Normal.(std0, std0), 1) # mu vector
    return mu0, cov0
end
nblocks, bsize, bcorr = 10, 50, .5
mu0, cov0 = formTrueMatrix(nblocks, bsize, bcorr);
```

```python
def formBlockMatrix(nblocks, #
                    bsize, #
                    bcorr): #
    block = np.ones((bsize,bsize))*bcorr
    block[range(bsize), range(bsize)] = 1
    corr = block_diag(*([block]*nblocks))
    return corr

def formTrueMatrix(nblocks,bsize,bcorr):
    corr0 = formBlockMatrix(nblocks, bsize, bcorr)
    corr0 = pd.DataFrame(corr0)
    cols = corr0.columns.tolist()
    np.random.shuffle(cols)
    corr0 = corr0[cols].loc[cols].copy(deep = True)
    std0 = np.random.uniform(.05, .2, corr0.shape[0])
    cov0 = corr2Cov(corr0, std0)
    mu0 = np.random.normal(std0, std0, cov0.shape[0]).reshape(-1,1)
    return mu0, cov0

nblocks, bsize, bcorr = 10, 50, .5
np.random.seed(0)
mu0, cov0 = formTrueMatrix(nblocks, bsize, bcorr)
```

The actual (nonempirical) covariance matrix is used to construct a random matrix $X$ of size $T x N$, from which the related empirical covariance matrix and vector of means are derived. The function simCovMu accepts arguments and sets the value of $T$. When shrink=True, the function shrinks the empirical covariance matrix using the LedoitWolf method.


### SNIPPET 7: THE EMPIRICAL COVARIANCE MATRIX


```julia
function simCovMu(mu0, # mean vector
                  cov0, # covariance matrix
                  observations, # number of observations
                  shrink = false) # shrinkage
    data = transpose(rand(MvNormal(vcat(mu0...), cov0), observations)) # generate data
    mu1 = vec(reshape(mean(data, dims = 1), (500,1))) # mean data
    if shrink
        cov1 = LedoitWolf().fit(data).covariance_ # ledoitwolf
    else
        cov1 = cov(data)
    end
    return mu1, cov1
end
```

```python
def simCovMu(mu0, #
            cov0, #
            nObs, #
            shrink = False): #
    x = np.random.multivariate_normal(mu0.flatten(), cov0, size = nObs)
    mu1 = x.mean(axis = 0).reshape(-1,1)
    if shrink:cov1 = LedoitWolf().fit(x).covariance_
    else:cov1 = np.cov(x, rowvar = 0)
    return mu1, cov1
```



Code Snippet $8$ denoises the empirical covariance matrix using the methods described in this section. In this experiment, we use the constant residual eigenvalue approach to denoise.

### DENOISING THE EMPIRICAL COVARIANCE MATRIX IN SNIPPET 8

```julia
function corrToCov(corr, # correlation matrix
                   std) # standard deviations
    cov = corr.*(std.*std') # covarinance matrix
    return cov
end
function deNoiseCov(cov0, # covarinace matrix
                    ratio, # T/N
                    bandWidth) # band width
    corr0 = covToCorr(cov0) # correlation matrix
    eigenValues0, eigenVectors0 = PCA(corr0) # eigen values and vectors from pca
    λmax0, var0 = findMaxEval(diag(eigenValues0), ratio, bandWidth) # find maximum eigen value
    numberFactors0 = size(eigenValues0)[1] - searchsortedfirst(reverse(diag(eigenValues0)), λmax0) + 1 # compute number of factors
    corr1 = denoisedCorr(eigenValues0, eigenVectors0, numberFactors0) # denoise correlation matrix
    cov1 = corrToCov(corr1, diag(cov0).^.5) # covariance matrix from corr
    return cov1
end
```

```python
def corr2Cov(corr, #
            std): #
    cov = corr*np.outer(std, std)
    return cov

def deNoiseCov(cov0, # 
                q, #
                bwidth): #
    corr0 = cov2Corr(cov0) # 
    eval0, evec0 = PCA(corr0)
    emax0, var0 = findMaxEval(np.diag(eval0), q, bwidth)
    nfacts0 = eval0.shape[0] - np.diag(eval0)[::-1].searchsorted(emax0)
    corr1 = denoisedCorr(eval0, evec0, nfacts0)
    cov1 = corr2Cov(corr1, np.diag(cov0)**.5)
    return cov1
```


The following Monte Carlo experiment is done with 1,000 iterations via Code Snippet $9$:
Generate a random empirical covariance matrix (optional shrinkage) with $T=1,000.
Denoise the empirical covariance matrix.
Calculate the least variance portfolio using the function optPort.
The covariance matrix is shrunk when we supply the option shrink=True to function simCovMu. When the parameter bWidth is greater than zero, the covariance matrix is denoised before estimating the least variance portfolio. ${ }^{8}$ A random seed is arbitrarily chosen so that we may repeat this Monte Carlo experiment with and without denoising on the identical covariance matrices.

### DENOISING THE EMPIRICAL COVARIANCE MATRIX IN SNIPPET 9
```julia
function optPort(cov, # covariance matrix
                 mu = nothing) # mean vector
    inverse = inv(cov) # inverse of cov 
    ones1 = ones(size(inverse)[1], 1) # ones matrix for mu
    if isnothing(mu) 
        mu = ones1
    end
    weight = inverse*mu # compute weights
    weight /= transpose(ones1)*weight # normalize weights
    return weight
end
nObs, ntrials, bWidth, shrink, minVarPortf = 100, 100, .01 , false, true
w1 = DataFrames.DataFrame(zeros(ntrials, size(cov0)[1]), :auto)
DataFrames.rename!(w1, names(w1).=>Symbol.(range(1,stop = 500)))
w1_d = copy(w1)
Random.seed!(0)
for i in 1:ntrials
    mu1, cov1 = simCovMu(vcat(mu0...), cov0, nObs, shrink)
    if minVarPortf 
        mu1 = nothing
    end
    cov1_d = deNoiseCov(cov1, nObs/size(cov1)[1], bWidth)
    w1[i, :] = optPort(cov1, mu1)
    w1_d[i, :] = optPort(cov1_d, mu1)
end
```

```python
def optPort(cov, # 
            mu = None): # 
    inv = np.linalg.inv(cov)
    ones = np.ones(shape = (inv.shape[0], 1))
    if mu is None:mu = ones
    w = np.dot(inv, mu)
    w /= np.dot(ones.T, w)
    return w
nObs, ntrials, bwidth, shrink, min_var_portf = 100, 100, .01 , False, True
w1 = pd.DataFrame(columns = range(cov0.shape[0]), index = range(ntrials), dtype = float)
w1_d = w1.copy(deep = True)
np.random.seed(0)
for i in range(ntrials):
    mu1, cov1 = simCovMu(mu0, cov0, nObs, shrink = shrink)
    if min_var_portf: mu1 = None
    cov1_d = deNoiseCov(cov1, nObs*1./cov1.shape[1], bwidth)
    w1.loc[i] = optPort(cov1, mu1).flatten()
    w1_d.loc[i] = optPort(cov1_d, mu1).flatten()
```


The genuine minimal variance portfolio, obtained from the actual covariance matrix, is computed using Code Snippet $10$. It then calculates the root-mean-square errors using those allocations as a benchmark. We may execute Code Snippet $10$ both with and without shrinking to get the four possibilities shown in Figure 5. Denoising is far more effective than shrinkage: the RMSE incurred by the denoised minimum variance portfolio is only $40.15 \%$ of the RMSE incurred by the minimal variance portfolio without denoising. That amounts to a $59.85 \%$ reduction in RMSE from denoising alone, as opposed to a $30.22 \%$ reduction via Ledoit-Wolf shrinking. Shrinkage offers minimal value over and above what denoising does. The RMSE decrease from combining denoising with shrinking is $65.63 \%$, which is not significantly better than the result from utilizing denoising alone.

### SNIPPET 10 ROOT-MEAN-SQUARE ERRORS

```julia
if minVarPortf
    inp = nothing 
else 
    inp = mu0
end
w0 = optPort(cov0, inp)
w0 = repeat(transpose(w0), size(w1)[1])
rmsd = mean((Matrix(w1) .- w0).^2)^.5 # RMSE
rmsd_d = mean((Matrix(w1_d) .- w0).^2)^.5 # RMSE
println(rmsd)
println(rmsd_d)
```

```python
w0 = optPort(cov0, None if min_var_portf else mu0)
w0 = np.repeat(w0.T, w1.shape[0], axis = 0)
rmsd = np.mean((w1 - w0).values.flatten()**2)**.5 # RMSE
rmsd_d = np.mean((w1_d - w0).values.flatten()**2)**.5 # RMSE
print (rmsd, rmsd_d)
```

Denoising, once again, outperforms shrinkage: the denoised maximum Sharpe ratio portfolio incurs just 0.04% of the RMSE incurred by the maximum Sharpe ratio portfolio without denoising. Denoising reduced RMSE by 94.44%, while Ledoit-Wolf shrinkage reduced RMSE by 70.77%. While shrinkage is beneficial in the absence of denoising, it provides no value when combined with denoising. This is because shrinkage dilutes the noise while also diluting part of the signal.

### Portfolio with the highest Sharpe Ratio

We may replicate the previous experiment, but this time we want to estimate the greatest Sharpe ratio portfolio. To do this, we must set minVarPortf=True in Code Snippet 9.

Denoising, once again, outperforms shrinkage: the denoised maximum Sharpe ratio portfolio incurs just $0.04 \%$ of the RMSE incurred by the maximum Sharpe ratio portfolio without denoising. That amounts to a $94.44 \%$ decrease in RMSE from denoising alone, as opposed to a $70.77 \%$ reduction via LedoitWolf shrinking. While shrinkage is beneficial in the absence of denoising, it provides no value when combined with denoising. This is because shrinkage dilutes the noise while also diluting part of the signal.

## Final Thoughts

Empirical covariance matrices in finance are frequently numerically ill-conditioned due to the small number of independent observations utilized to estimate many parameters. Working directly with such matrices without treatment is not advised. Even if the covariance matrix is nonsingular and invertible, the tiny determinant almost assures that the inversion procedure will dramatically magnify the estimated error. These estimate inaccuracies result in asset misallocation and significant transaction costs owing to wasteful rebalancing.

The Marcenko-Pastur theorem computes the distribution of eigenvalues for a random matrix. By fitting this distribution, we can distinguish between eigenvalues associated with signal and noise. The latter can be changed to remedy the ill-conditioning of the matrix without diluting the signal. This random matrix theoretic approach is generally preferred over (1) the threshold method with components that explain a fixed amount of variance, regardless of the actual amount of variance caused by noise; and (2) the shrinkage method can remove some of the noise but dilutes the signal.

Remember that the condition number of the correlation matrix is the ratio of its maximal and most minor (by moduli) eigenvalues. Denoising minimizes the condition number by boosting the eigenvalue with the lowest value. We may reduce the condition number even further by lowering the greatest eigenvalue. This makes both mathematical and intuitive sense. By removing the market components from the correlation matrix, the more subtle signals hidden behind the market "tone." are reinforced. For example, if we're attempting to cluster a correlation matrix of stock returns, detonating that matrix would assist in magnifying the signals associated with other exposures, such as sector, industry, or size.

Denoising has been proven effective in the context of portfolio optimization, but its applicability extends to any usage of the covariance matrix. Denoising the matrix $X^{\prime} X$ before inverting it, for example, should help reduce the variance of regression estimates and improve the power of statistical hypothesis tests. Covariance matrices derived from regressed factors require denoising for the same reason and should not be used without preprocessing.