import { Aggregator, BlsWalletWrapper } from "bls-wallet-clients";
import { NETWORKS } from "../constants";

export const sendTransaction = async (provider, wallet, params) => {
  const cachedNetwork = localStorage.getItem("network");
  const network = NETWORKS[cachedNetwork ?? "localhost"];

  const nonce = await BlsWalletWrapper.Nonce(wallet.PublicKey(), network.verificationGateway, provider);
  const actions = params.map(tx => ({
    ethValue: tx.value ?? "0",
    contractAddress: tx.to,
    encodedFunction: tx.data ?? "0x",
  }));

  const bundle = wallet.sign({
    nonce,
    actions,
  });

  const aggregator = new Aggregator(network.aggregator);
  const result = await aggregator.add(bundle);

  if ("failures" in result) {
    throw new Error(JSON.stringify(result));
  }

  return result;
};

export const getAddress = async provider => {
  const privateKey = localStorage.getItem("metaPrivateKey");
  const cachedNetwork = localStorage.getItem("network");
  const verificationGateway = NETWORKS[cachedNetwork ?? "localhost"].verificationGateway;
  return await BlsWalletWrapper.Address(privateKey, verificationGateway, provider);
};
