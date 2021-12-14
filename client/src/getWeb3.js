import Web3 from "web3";

const getWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      return error;
    }
  }
};

export default getWeb3;
