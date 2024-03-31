import web3 from "./web3";
import Campaign from "./build/Campaign.json";

// creating a function so that it dynamically takes address for the campaigns that are created, so that we can get its summary
export default (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
