const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
// const { interface, bytecode } = require("./compile"); // this is not needed as we are not deploying it on fly, we have our own JSON file

// NOTE : we are using our own JSON file to deploy, also we are to only deploy the 'campaignFactory' contract and not the 'Campaign' contract

// deploy code will go here
const provider = new HDWalletProvider(
  "still soft cool drip dose indicate citizen small soccer lyrics will inside",
  "https://sepolia.infura.io/v3/345475bb4e364c72aa7f74e3c2ea8f3c"
);

const web3 = new Web3(provider);
// we can not use async outside any functions

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[1]);

  console.log("attempting to deploy from account ", accounts[1]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({ gas: "1000000", from: accounts[1] });

  console.log("Contract Deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();
