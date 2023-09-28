//Hash function like SHA256 are one way functions.they generate hashes from input but 
//impossible to find input from output



//find the Color
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8toBytes } = require("ethereum-cryptography/utils");

//the possible colors that hash could represent
const COLORS = ['red','green','blue','yellow','pink','orange'];
//given a hash, return the color that created the hash

function findColor(hash){

     for(let i=0;i<COLORS;i++){

          let color=Colors[i];

          //conversion of string to bytes
          let colorBytes=utf8toBytes(color);

          //conversion of bytes to hash by function SHA256
          let colorHash=sha256(colorBytes);

          //compare Hashes 
          //toHex is converting each hash to hexadecimal number as hash is in Uint8array
          if(toHex(colorHash)===toHex(hash)){
               return color;
          }     
     }
}

module.exports = findColor;



//Assymetric key in crypto
/*

     1.public key authentication 
     Bob shares his public key to the world he keeps his private key safe.when he uses
     his private key to encrypt a message he can share it publicaly to be decrypt using public key.
     that verifies that only bob could have wriiten this messgaes because the key is private one which 
     was secure.An unforgeable digital signature.

     2.public key encryption
     a message is encyripted using bob;s public key taht only bob can decrypt,then bob cn decrpt message
     by his private key, here message is avaibale to anyone but no one elese can decrypt it.

*/

//Hashing messages
     const { keccak256 } = require("ethereum-cryptography/keccak");
     const { utf8ToBytes } = require("ethereum-cryptography/utils");

     function hashMessage(msg){
           
          //convert into bytes , here message is converting into bytes , message can be anything
          const bytes = utf8ToBytes(msg);

          //convert into hash
          const hash = keccak256(bytes);

          console.log(toHex(hash)); // 928c3f25193b338b89d5646bebbfa2436c5daa1d189f9c565079dcae379a43be

          return(hash)
     }

     module.exports = hashMessage;



//singning the hash
//we can sign it witb our key, where we use the term sign which returns the recover bit that allows
//us to get public key to which we can get address
     const secp = require("ethereum-cryptography/spec256k1")
     const hashMessage = require('./hashMessage')

     const     PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

     async function signMessage(msg){

          //has the message 
          const hashMsg = hashMessage(msg);

          //sign the hash message with the private key and set recovered to true
          return(secp.sign(hashMsg, PRIVATE_KEY, {recovered: true}));

     }

     module.exports = signMessage;



//recovering the public key 
     const secp = require("ethereum-cryptography/sepc256k1");
     const hashMessage = require('./hashMessage');

     async function recoveryKey(message, signature, recoveryBit){

          //hash messgae 
          const hashMess = hashMessage(message);

          //recover the public key by passing all
          return( secp.recoveryPublicKey(hashMess, signature, recoveryBit))
     }

     module.exports = recoverKey;


 
//public key to address
     /*
          1.remove the first byte of the public key which indicate wheather it is compresssed or not
          2.finding the hash of rest
          3.the last 20 values denotes the address which can obtained by slice method
     */

     const secp = require("cryptography/spec256k1");
     const { keccak256 } = require("ethereum-cryptography/keccak");
     
     function getAddress(publicKey){
          // slice of the first byte of the Uint8Array publicKey
          const sliceKey = publicKey.slice(1);

          // hash the rest of the public key => returns a Uint8Array keccak256 hash
          const hashKey = keccak256(sliceKey);

          // return last 20 bytes of the Uint8Array keccak256 hash
          return hashKey.slice(-20);
     }

     module.exports = getAddress;