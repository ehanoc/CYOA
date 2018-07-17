const fs = require('fs');
const term = require('terminal-kit').terminal;
const Web3 = require('web3');
const EventEmitter = require('events');


// Nodes Bag Of Values Consts
const NODE_ID       = 0;
const NODE_TITLE    = 1;
const NODE_BODY     = 2;
const NODE_OWNER    = 3;
const NODE_CHILDS   = 4;

//arguments
var contractAddress = process.argv.pop();

// default for ganache
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var contractJson = JSON.parse(fs.readFileSync('build/contracts/contract_abi.json', 'utf8'));
//var abi = contractJson["abi"];
var abi = contractJson;
var contract = new web3.eth.Contract(abi, contractAddress);

var currentNode = -1;
var currentOption = 0;

var account;

function getNode(nodeId) {
    contract.methods.getStoryNode(nodeId).call({
        from: account,
        gas: 6000000,
        gasLimit: 6721975,
        gasPrice: '20000000000'
    }).then(res => {
        console.log(`node: ${JSON.stringify(res)}`);
        game.emit('node', res);
    }).catch(err => {
        console.log(`err : ${err}`);
    });
}

class Game extends EventEmitter {}
var game = new Game();

game.on('option', option => {
    term.green("[%s]: %s \n", currentOption, web3.utils.toAscii(option[NODE_TITLE]));
    currentOption++;

    //last option?
    if (currentOption == currentNode[NODE_CHILDS].length) {
        term.magenta( "Enter your option: " ) ;
        term.inputField((error, input) => {
        	term.green( "\n You chose: '%s'\n" , input) ;

            var digit = Number(input);
            var nextNode = Number(currentNode[NODE_CHILDS][digit]);
            getNode(nextNode);
        });
    }
});

game.on('node', node => {
    term.blue("\n\n ==== %s ==== \n\n", web3.utils.toAscii(node[NODE_TITLE]));
    term.white("[%s] \n\n", web3.utils.toAscii(node[NODE_BODY]));

    currentNode = node;
    currentOption = 0;

    var options = node[NODE_CHILDS];

    var child_count = options.length;
    if (child_count == 0) {
        term.bold.white("THE END \n");
        process.exit();
    }

    for (var i = 0; i < child_count; i++) {
        var childId = Number(options[i]);

        console.log(`child id : ${web3.toBigNumber(options[i]).toString()}`);

        contract.methods.getStoryNode(childId).call()
            .then(option => {
                game.emit('option', option);
            });
    }
});

web3.eth.getAccounts().then(accounts => {
    console.log(`accounts : ${accounts}`);
    account = accounts[0];
    getNode(0);
});

//starting node
//getNode(0);
