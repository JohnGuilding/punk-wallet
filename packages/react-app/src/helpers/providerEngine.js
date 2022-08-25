import ProviderEngine from "web3-provider-engine";
import FixtureSubprovider from "web3-provider-engine/subproviders/fixture.js";
import FilterSubprovider from "web3-provider-engine/subproviders/filters.js";
import NonceSubprovider from "web3-provider-engine/subproviders/nonce-tracker.js";
import RpcSubprovider from "web3-provider-engine/subproviders/rpc.js";

const sigUtil = require("eth-sig-util");

export function CustomProvider(opts = {}) {
  var engine; // = new ProviderEngine()

  console.log("🚛🚛🚛🚛🚛🚛🚛 CustomProvider 🚛🚛🚛🚛🚛🚛🚛");

  // let them pass in a simple string for the options and use that as infura or whatevs
  if (typeof opts == "string") {
    let rpcUrl = opts;
    opts = { rpcUrl };
  }

  if (opts && opts.provider) {
    engine = opts.provider;
  } else {
    engine = new ProviderEngine();
  }

  // static results
  engine.addProvider(
    new FixtureSubprovider({
      web3_clientVersion: "ProviderEngine/v0.0.0/javascript",
      net_listening: true,
      eth_hashrate: "0x00",
      eth_mining: false,
      eth_syncing: true,
    }),
  );

  // filters
  engine.addProvider(new FilterSubprovider());

  // pending nonce
  engine.addProvider(new NonceSubprovider());

  engine.addProvider(new RpcSubprovider(opts));

  // start polling for blocks
  engine.start();

  return engine;
}
