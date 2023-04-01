import { ethers } from "hardhat";

export async function deploy(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}
