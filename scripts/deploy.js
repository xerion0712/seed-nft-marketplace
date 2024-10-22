const hre = require("hardhat");

async function main() {
    const baseURI = "ipfs://Qm...YourMetadataCID/";  // Your IPFS metadata hash
    const HoodyNFT = await hre.ethers.getContractFactory("HoodyNFT");
    const nft = await HoodyNFT.deploy(baseURI);
    await nft.deployed();
    console.log("NFT contract deployed to:", nft.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


