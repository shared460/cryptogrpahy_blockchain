/* 
     Proof of Work Miner
     1.This miner will receive transactions from the network and add them to its mempool.
     2.When a block is ready to be mined, the miner will take those transactions from the mempool and 
     include them into the mined block.
     3.The miner will also calculate a basic proof of work below a constant TARGET_DIFFICULTY.
*/
//proof of work as a security to bitcoin 


//Block
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.unshift(transaction)
}

function mine() {
    
    const transactions = [];
    const length = mempool.length;

    for(let i=0;i<MAX_TRANSACTIONS && i<length;i++){
        transactions.push(mempool[i]);
        mempool.shift();
    }

    console.log(mempool.length)

    block={
        id:blocks.length,
    }

    block.transactions = transactions;

    block.nonce=0;

    while(true){
        const blockString = JSON.stringify(block);
        const blockHash = SHA256(blockString);
        const int = BigInt(`0x${blockHash}`);
        if(int<TARGET_DIFFICULTY){
            block.hash = blockHash;
            break;
        }
        block.nonce++;
    }
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};



