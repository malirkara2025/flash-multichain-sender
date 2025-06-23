export const sendTRC20 = async (to, amount) => {
  const USDT_CONTRACT = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';
  const TronWeb = window.tronWeb;
  const amountInSun = parseInt(amount) * 1_000_000;

  const contract = await TronWeb.contract().at(USDT_CONTRACT);
  return await contract.transfer(to, amountInSun).send();
};
