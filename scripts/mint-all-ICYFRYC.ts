import { mint } from './mint-ICYFRYC'

async function main (): Promise<void> {
  await mint('1', '47ba24cef907623ae33b0959da80a40257bf2211/ICYFRYC_1.png') // NFT #1
}

main().catch((error: unknown): void => {
  console.error(error)
  process.exitCode = 1
})
