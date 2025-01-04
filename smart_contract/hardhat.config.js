// https://eth-goerli.g.alchemy.com/v2/Ye5HCpt6BZV1u6E7AGyqSoRpue8A9EpL
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Ye5HCpt6BZV1u6E7AGyqSoRpue8A9EpL",
      accounts: ["e5a098d6847f594c3e0917efff0b57608b76e07dd4f405d665ffc54f9bd55839"],
    },
  },
};