import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";

export const sendSolanaUSDT = async (to, amount) => {
  const USDT_MINT = new PublicKey('Es9vMFrzaCERZDqRZjXZQTnEyiM1WigG2efD9PuiFke');
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  const fromWallet = window.solana;
  await fromWallet.connect();

  const fromPub = new PublicKey(fromWallet.publicKey.toString());
  const toPub = new PublicKey(to);
  const fromTokenAcc = await getAssociatedTokenAddress(USDT_MINT, fromPub);
  const toTokenAcc = await getAssociatedTokenAddress(USDT_MINT, toPub);

  const tx = new Transaction().add(
    createTransferInstruction(fromTokenAcc, toTokenAcc, fromPub, amount * 1e6)
  );

  tx.feePayer = fromPub;
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  const signed = await fromWallet.signTransaction(tx);
  return connection.sendRawTransaction(signed.serialize());
};
