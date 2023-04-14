# NFTs
<img src="https://img.shields.io/github/languages/top/icyfry/nfts" />
<img src="https://img.shields.io/badge/-Ethereum-005850?style=flat&logo=Ethereum">

This repository contain code related to build and deploy NFTs on Ethereum 

## List of NFT collections

### [ERC-721](https://eips.ethereum.org/EIPS/eip-721)

* **IcyFryNFT**
Used for POC & Experimentation (external data hosted on https://nft.icyfry.io/)

** Implementation of [Opensea metadata-standards](https://docs.opensea.io/docs/metadata-standards)

## Development

### Tools and libs used

* [Ganache (local blockchain)](https://trufflesuite.com/docs/ganache/quickstart/)
* [Hardhat](https://hardhat.org/)
* [Task](https://taskfile.dev/installation/)
* [ethers (js lib)](https://docs.ethers.org/v5/)
* [openzeppelin](https://www.openzeppelin.com/)
* See `.vscode` for plugins recommendations

### Initial setup

* create `.env` file with private key of a dev Ethereum address to interact with the blockchain
```
PRIVATE_KEY=0x......
PUBLIC_KEY=0x......
```
* run `task init`
* update `hardhat.config.ts` to match local install of ganache (chainId & url)

### Tasks

* `init`
* `lint`
* `build`
* `test`
* `deploy`
* `mint`


