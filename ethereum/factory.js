import web3 from "./web3";

// calling the ABI for factory contract from build directory
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xbD524F5cbeD6251366065d3e874D11d84A40FE19"
);

export default instance;

// when we want to get access to the deployed contract we wont have to write this whole code that we wrote now, instead what we can do is, just import this 'factory.js' file
