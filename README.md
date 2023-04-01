# NFTs

This repository contain code related to build and deploy NFTs on Ethereum 

## List of NFT collections

* **IcyFryNFT**
Used for POC & Experimentation (external data hosted on https://nft.icyfry.io/)

## Development

### Tools needed

* [Ganache (local blockchain)](https://trufflesuite.com/docs/ganache/quickstart/)
* [Hardhat](https://hardhat.org/)
* [Task](https://taskfile.dev/installation/)
* [VScode plugin for Solidity](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)

### Setup

* create `.env` file with private key of a dev Ethereum address

```
PRIVATE_KEY=0x......
```

* run `task init`

* update `hardhat.config.ts` to match local install of ganache (chainId & url)

### Tasks

* `init`
* `build`
* `deploy-local` deploy contracts to ganache


