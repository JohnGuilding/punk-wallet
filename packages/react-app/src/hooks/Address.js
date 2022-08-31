import { useState, useEffect } from "react";
import { getAddress } from "../helpers/transactionController";

const useAddress = provider => {
  const [address, setAddress] = useState("");
  
  useEffect(() => {
    if (provider) {
      const fetchAddress = async () => {
        setAddress(await getAddress(provider));
      };
      fetchAddress();
    }
  }, [provider]);

  return address;
};

export default useAddress;
