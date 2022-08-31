import { Aggregator, BlsWalletWrapper } from "bls-wallet-clients";
import { useWallet } from "../hooks";

export const sendTransaction = async (provider, wallet, params) => {
  const actions = params.map(tx => ({
    ethValue: tx.value ?? "0",
    contractAddress: tx.to,
    encodedFunction: tx.data ?? "0x",
  }));

  const verificationGateway = "0xa15954659EFce154a3B45cE88D8158A02bE2049A"; // This may change after subsequent deployments

  const nonce = await BlsWalletWrapper.Nonce(wallet.PublicKey(), verificationGateway, provider);

  const bundle = wallet.sign({
    nonce,
    actions,
  });

  const aggregator = new Aggregator("http://localhost:3000");
  const result = await aggregator.add(bundle);

  if ("failures" in result) {
    throw new Error(JSON.stringify(result));
  }

  return result;
};

export const getAddress = async (provider) => {
  const privateKey = localStorage.getItem("metaPrivateKey");
  const verificationGateway = "0xa15954659EFce154a3B45cE88D8158A02bE2049A";
  return await BlsWalletWrapper.Address(
    privateKey,
    verificationGateway,
    provider,
  );
};