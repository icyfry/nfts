import { Contract } from 'ethers'
import { mint, getContract } from './libs/ERC721Helper'

// Address of NFT Contract deployed and target address for mint
const tokenAddress: string | undefined = process.env.ICYFRYNFT_CONTRACT_ADDRESS
const ownerAddress: string | undefined = process.env.PUBLIC_KEY

async function main (): Promise<void> {
  if (ownerAddress == null || tokenAddress == null) {
    throw new Error('missing env variable')
  }
  const contract: Contract = await getContract('IcyFryNFT', tokenAddress)
  const listOfToken: Set<string> = await mint(contract, ownerAddress, 'IcyFryNFT.0.json')
  console.log('%s list of owned NFT : %s', ownerAddress, listOfToken)
}

main().catch((error: unknown): void => {
  console.error(error)
  process.exitCode = 1
})
