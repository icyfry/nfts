import { Contract } from 'ethers'
import { mintWithTokenId, logNFTDetails, getContract, Metas } from './libs/ERC721Helper'
import fs from 'fs'
import crypto from 'crypto'

// Address of NFT Contract deployed and target address for mint
const tokenAddress: string | undefined = process.env.ICYFRYCOLLECTION_CONTRACT_ADDRESS
const ownerAddress: string | undefined = process.env.PUBLIC_KEY

export async function mint (tokenId: string, image: string): Promise<void> {
  if (ownerAddress == null || tokenAddress == null) {
    throw new Error('missing env variable')
  }
  const contract: Contract = await getContract('IcyFryCollection', tokenAddress)

  const metas: string = await createMetaFile(tokenId, image)

  await mintWithTokenId(contract, ownerAddress, metas, tokenId)
  await logNFTDetails(contract, tokenId)
}

async function createMetaFile (tokenId: string, image: string): Promise<string> {
  const root: string = crypto.createHash('sha1').update('IcyFryCollection').digest('hex')
  const dir: string = './metas/' + root

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const fileName: string = crypto.randomBytes(10).toString('hex') + '.json'
  // crypto.createHash('sha256').update('IcyFry Collection.' + tokenId).digest('hex') + '.json'

  const meta: Metas = {
    description: 'IcyFry Collection ' + tokenId,
    background_color: 'ffffff',
    external_url: 'https://nft.icyfry.io/',
    image: 'https://nft.icyfry.io/' + image,
    name: 'IcyFry Collection #' + tokenId
    // animation_url: 'https://nft.icyfry.io/IcyFry Collection/' + tokenId + '.mp4'
  }

  await fs.writeFile(dir + '/' + fileName, JSON.stringify(meta), { flag: 'wx' }, function (err) {
    if (err != null) throw err
  }
  )

  return root + '/' + fileName
}
