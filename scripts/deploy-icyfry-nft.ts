import { Contract } from 'ethers'
import { deployContract } from './libs/ERC721Helper'

// Contract to deploy
const NFTName = 'IcyFryNFT'

async function main (): Promise<void> {
  const contract: Contract = await deployContract(NFTName)
  console.log('contract deployed to:', contract.address)
}

main().catch((error: unknown): void => {
  console.error(error)
  process.exitCode = 1
})
