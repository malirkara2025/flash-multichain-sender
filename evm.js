import { ethers } from 'ethers';

const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)"
];

const CONTRACTS = {
  Ethereum: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA'
  },
  BSC: {
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    LINK: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD'
  }
};

export const sendERC20 = async (to, amount, network, token) => {
  if (!window.ethereum) throw new Error('MetaMask not found');
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = CONTRACTS[network][token];
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, signer);

  const decimals = 18;
  const value = ethers.utils.parseUnits(amount, decimals);
  const tx = await contract.transfer(to, value);
  return tx.wait();
};
