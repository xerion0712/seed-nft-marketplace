require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require("dotenv").config();
require("ethers");  // Import ethers library

console.log("PRIVATE_KEY #################################", process.env.PRIVATE_KEY)
console.log("INFURE #################################", process.env.INFURA_KEY)
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};