const { ethers } = require('ethers');
const { create } = require('ipfs-http-client');

// Replace with your Infura or Alchemy project ID and private key
const INFURA_PROJECT_ID = ENV["INFURA_KEY"]; // or Alchemy project ID
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'; // Your wallet's private key
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'; // Your deployed contract address
const ABI = [
    // ABI of your contract
];

// Create an IPFS client instance
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadToIPFS(imagePath) {
    const file = await fs.promises.readFile(imagePath); // Read the file from disk
    const result = await ipfs.add(file); // Upload to IPFS
    return `https://ipfs.infura.io/ipfs/${result.path}`; // Return the IPFS URL
}

export const mintNFT = async (mintAmount, imagePath) => {
    // Create a provider for Goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`);
    
    // Create a wallet instance using your private key and provider
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    // Create a contract instance
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    
    // Calculate the cost for minting
    const cost = ethers.utils.parseEther('0.01'); // Adjust the cost of each NFT
    const totalCost = cost.mul(mintAmount); // Total cost for minting multiple NFTs

    try {
        // Upload image to IPFS
        const ipfsUrl = await uploadToIPFS(imagePath);
        console.log(`Image uploaded to IPFS: ${ipfsUrl}`);

        // Send the mint transaction
        const transaction = await nftContract.mint(mintAmount, { value: totalCost });
        
        // Wait for the transaction to be confirmed
        await transaction.wait();
        console.log(`Minted ${mintAmount} NFT(s) successfully! Transaction hash: ${transaction.hash}`);
        
        // You can also save the IPFS URL or metadata on-chain or off-chain as needed
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}
