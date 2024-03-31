import Web3 from "web3";
// window is a global variable that is availabe inside the browser, is not available on nodeJS, therefore will throw error
let web3;

// if (typeof window !== "undefined"
// above line says that if window is defined
// with this we can see if we are running the code on the server or the browser
// if we are running it on the browser, it will give 'object' when we run typeof window
// if we are running it on server, it will give undefined

// typeof window.ethereum !== "undefined";
// above line check if the user is having Metamask or not

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and MetaMask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server 'OR' the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/345475bb4e364c72aa7f74e3c2ea8f3c"
  );
  // we are using infura key here because for now, we are only using it as a portal, and it does not have any account connected to it
  web3 = new Web3(provider);
}

// NOTE -- Here we are assuming that the user is using Metamask as its provider, if anything else this is not going to work
export default web3;
