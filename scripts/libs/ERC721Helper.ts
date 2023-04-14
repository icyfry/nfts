import { Contract, ContractFactory, Event } from 'ethers'
import { ethers } from 'hardhat'

// const ERC721 = require('@openzeppelin/contracts/build/contracts/ERC721.json');

/**
 * NFT ERC721 Helper functions
 */

export type Address = string

export interface Metas {
  name: string
  description: string
  background_color: string
  external_url: string
  image: string
  image_data?: string
  animation_url?: string
  youtube_url?: string
  attributes?: MetasAttributes[]
}

export interface MetasAttributes {
  trait_type: string
  display_type?: string
  value: string | number
}

export async function deployContract (name: string): Promise<Contract> {
  const Contract: ContractFactory = await ethers.getContractFactory(name)
  const contract = await Contract.deploy()
  return await contract.deployed()
}

export async function getContract (name: string, tokenAddress: Address): Promise<Contract> {
  const Contract: ContractFactory = await ethers.getContractFactory(name)
  const contract = await Contract.attach(tokenAddress)
  return contract
}

export async function getTokenName (contract: Contract): Promise<string> {
  return contract.name()
}

export async function mintWithTokenId (contract: Contract, to: Address, uri: string, tokenId: string): Promise<void> {
  await contract.safeMint(to, tokenId, uri)
  console.log('NFT Minted for %s', to)
}

export async function listTokensOfOwner (contract: Contract, owner: Address): Promise<Set<string>> {
  const sentLogs: Event[] = await contract.queryFilter(
    contract.filters.Transfer(owner, null)
  )
  const receivedLogs: Event[] = await contract.queryFilter(
    contract.filters.Transfer(null, owner)
  )
  const logs: Event[] = sentLogs.concat(receivedLogs)
    .sort(
      (a: Event, b: Event): number =>
        (
          !Number.isNaN((a.blockNumber - b.blockNumber))
            ? a.blockNumber - b.blockNumber
            : a.transactionIndex - b.transactionIndex
        ))
  const owned = new Set<string>()
  for (const e of logs) {
    if (e.args != null) {
      if (addressEqual(e.args.to, owner)) {
        owned.add(e.args.tokenId.toString())
      } else if (addressEqual(e.args.from, owner)) {
        owned.delete(e.args.tokenId.toString())
      }
    }
  }
  return owned
}

export async function logNFTDetails (contract: Contract, id: string): Promise<void> {
  const uri: string = await contract.tokenURI(id)
  const owner: string = await contract.ownerOf(id)
  const name: string = await contract.name()
  const symbol: string = await contract.symbol()
  const address: string = contract.address
  console.log('NFT (%s/%s/%s) | id:%s , uri:%s , owner:%s', name, symbol, address, id, uri, owner)
}

function addressEqual (a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase()
}
