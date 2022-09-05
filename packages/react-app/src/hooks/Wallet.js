import { useState, useEffect } from "react";
import { BlsWalletWrapper } from "bls-wallet-clients";
import { NETWORKS } from "../constants";

const useWallet = provider => {
  const [wallet, setWallet] = useState();

  useEffect(() => {
    if (provider) {
      const getWallet = async () => {
        const privateKey = localStorage.getItem("metaPrivateKey");
        const cachedNetwork = localStorage.getItem("network");
        const verificationGateway = NETWORKS[cachedNetwork ?? "localhost"].verificationGateway;
        setWallet(await BlsWalletWrapper.connect(privateKey, verificationGateway, provider));
      };
      getWallet();
    }
  }, [provider]);

  return wallet;
};

export default useWallet;
