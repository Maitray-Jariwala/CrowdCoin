const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Pointing the build folder inside the ethereum directory
const buildPath = path.resolve(__dirname, "build");

// Deleting the build folder completely
fs.removeSync(buildPath);

// Reading the Campaign.sol file from contracts folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

// Reading the source code from the file, and also mentioning the encoding
const source = fs.readFileSync(campaignPath, "utf8");

// Compiling both contracts, '1' here is mentioning how many contracts to compile
const output = solc.compile(source, 1).contracts;

// Creating the build folder again
fs.ensureDirSync(buildPath);

// console.log(output);

// loop through the 'output' object, read the contracts and write it to  a different file inside build directory or folder
for (let contract in output) {
  fs.outputJSONSync(
    // here the below 'contract' is the NAME of the CONTRACT in the Campaign.sol file
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
