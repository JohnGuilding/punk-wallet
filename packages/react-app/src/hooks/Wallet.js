import { useState, useEffect } from "react";
import { BlsWalletWrapper } from "bls-wallet-clients";

const useWallet = provider => {
  const [wallet, setWallet] = useState();

  useEffect(() => {
    if (provider) {
      const getWallet = async () => {
        const privateKey = localStorage.getItem("metaPrivateKey");
        const verificationGateway = "0xa15954659EFce154a3B45cE88D8158A02bE2049A";
        setWallet(await BlsWalletWrapper.connect(privateKey, verificationGateway, provider));
      };
      getWallet();
    }
  }, [provider]);

  return wallet;
};

export default useWallet;
