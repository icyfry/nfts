import {deploy} from "./libs/deploy-contract"

async function main() {
  deploy("IcyFryNFT")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
