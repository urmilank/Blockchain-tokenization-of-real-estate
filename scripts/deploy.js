async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Compile and deploy the contract
  const RealEstate = await ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy(); // No arguments here for the constructor

  const HandleTransaction = await ethers.getContractFactory(
    "RealEstateTransaction"
  );
  const transaction = await HandleTransaction.deploy();

  console.log("RealEstate contract deployed at:", realEstate.address);
  console.log("Transaction contract deployed at:", transaction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
