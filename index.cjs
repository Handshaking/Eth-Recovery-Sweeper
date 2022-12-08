const ethers = require('ethers');
const Web3 = require("web3");
const minSweep = '0.004';



const chosenRpc = 'Your EVM RPC'
const compromisedPrivkey = 'Your Compromised Privkey';
const compromisedPubkey  = 'Your Compromised Pubkey');
const destinationPubkey = 'Your Destination Address');



function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));  }
async function main() {
	const compromisedPubkeyChk  = web3.utils.toChecksumAddress(compromisedPrivkey);
	const destinationPubkeyChk = web3.utils.toChecksumAddress(compromisedPubkey);
	const web3 = new Web3(chosenRPC);
	const gasGwei = await web3.utils.toWei('30', 'gwei');
	const ethMin = await web3.utils.toWei(minSweep, 'ether');
	var counter = 0;
	var done = 0;
	var errors = 0;
	while (true) {
	counter++;
    var balance = await web3.eth.getBalance(compromisedPubkeyChk)
	console.log(balance)
    if (Number(balance) > Number(ethMin)) {
    	try {
	      let nonce = await web3.eth.getTransactionCount(compromisedPubkeyChk);
	      let trnsAmount = Number(balance) - (gasGwei * 40000);
	      let txPrice = { 
		 	'chainId': 1,
		      	'nonce': Number(nonce) + 1,
		      	'to': destinationPubkeyChk,
		        'value': trnsAmount,
		        'gas': 41000,
		        'gasPrice': Number(gasGwei)};
		
	      let signedTx = await web3.eth.accounts.signTransaction(txPrice, compromisedPrivkeyChk); // private key
	      let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	      let amntSent = await web3.utils.fromWei(String(trnsAmnt), 'ether');
	      done++;
		  console.log("...recovered something");
	      await sleep(60000); 
	    } catch (e) {
	    	console.log(e);
	    	errors++;
		await sleep(500);
	    }
    } else {
    	let view = await web3.utils.fromWei(String(balance), 'ether');
	await sleep(2000);
    }
	}
}
main();
