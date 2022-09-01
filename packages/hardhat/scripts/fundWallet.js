const { network } = require("hardhat");

async function main() {
    await network.provider.send("hardhat_setBalance", [
        "0x69ddf3d49Be8b372B893C6444e3E2CB16BA8Ed6B",
        "0x100000000000000000000",
    ]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
