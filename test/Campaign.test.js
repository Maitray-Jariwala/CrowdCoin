const assert = require("assert");

const { Web3 } = require("web3");
const ganache = require("ganache");

const web3 = new Web3(ganache.provider());

// Compiled version of our Contracts
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

// string of all accounts
let accounts;

// deployed instance of the factory we will make
let factory;

let campaignAddress;

let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploy an instance of the Campaignfactory using 'Contract' constructor which is a part of 'web3.eth' library, where we will pass our 'compiledFactory' ABI or 'interface' and then 'deploy' it and then 'send' transaction out to the network

  // what we have is a json file, but the constructor does not accept it, therefore we need to parse it
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  // using 'factory' we will make an instance of the 'campaign'
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  // here what we are telling is that, we will be taking the first element from the array that we get and assign it to the 'campaignAddress' variable
  // this can also be written as :
  //   const addresses = await factory.methods.getDeployedCampaigns().call();
  //   campaignAddress = addresses[0];
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // accessing the contarct that is delpoyed at a particular address
  // First variable passed is the interface, the sencond is the address where the contract actually exists
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );

  // you might have noticed that the calls for two contracts are different, that is beacuse, the first form 'on line 28' is used when we are deploying a new version of the contract
  // the second form is used 'on line 46' when we want to instruct the web3 about the existance of the contract that has already been deployed then we will pass the 'interface' as the first argument, and the address where it is deployed as the second argument
});

describe("Campaigns", () => {
  // the first test we are writing is on wbout checking if both are contracts are deployed or not
  // to do that what we are doing is, checking if both of them has any address or not
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  // check if 'accounts[0]' is the manager of the contract, as he will be the one to pay for it
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    // in assert.equal the first parameter : what we hope for
    // the second parameter : what it actually is
    assert.equal(accounts[0], manager);
  });

  // to check if people are able to donate money to the contract, and are also marked as contributors
  it("allows people to contribute and marks them as contributors", async () => {
    // we have a minimum value that is to be sent, we will srite that in send(), it will be in wei
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    // above we only checked if the payment was possible or not

    // now we will check if we are contributors or not
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "2",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  // test to allow the manager to make a payment request
  it("allows a manager to make a paymeny request", async () => {
    await campaign.methods
      .createRequest("Buy Batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    // seeing if the request was made
    const request = await campaign.methods.requests(0).call();

    assert.equal("Buy Batteries", request.description);
  });

  // if the request was processed
  it("process requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    // money is transfered or not to the requestor or manager?
    // here accounts[1] is the manager
    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    // we wrote accounts[0] because he is the donater
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    // this will give us a string as an ouput
    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");

    // converting it to float
    balance = parseFloat(balance);
    // console.log(balance);
    assert(balance > 103);
  });
});
