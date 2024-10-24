import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const sdk = new ThirdwebSDK(provider.getSigner());

async function uploadImage(file) {
    try {
        // Convert the file to a buffer
        const buffer = await file.arrayBuffer();

        // Upload the file to IPFS
        const uploadedFile = await sdk.storage.upload({
            name: file.name,
            type: file.type,
            data: buffer
        });

        console.log("Uploaded file:", uploadedFile);
        return uploadedFile;
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}


// Example usage: Handle file input change
// document.getElementById("fileInput").addEventListener("change", async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const ipfsUrl = await uploadImage(file);
//       console.log("IPFS URL:", ipfsUrl);
//     }
//   });

const file = null;
uploadImage(file);
