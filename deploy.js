var fs = require('fs');

var Web3 = require('web3');
var web3 = new Web3();

var provider = new web3.providers.HttpProvider('http://localhost:7545');
web3.setProvider(provider);

const abi_path = process.argv.pop();
const bytecode_path = process.argv.pop();

const abi = fs.readFileSync(abi_path, 'utf8');
const bytecode = fs.readFileSync(bytecode_path, 'utf8').trim();

console.log(`bytecode : ${bytecode}`);

try {
    // abi = fs.readFileSync(abi_path, 'utf8');
    //abi = replaceAll(abi, "'", '"').toLowerCase();
    console.log(abi);
} catch(e) {
    console.log('Error:', e.stack);
}

console.log(`abi: ${abi}, bytecode: ${bytecode}`);

// const bytecode = output.contracts['Token'].bytecode;
// const abi = JSON.parse(output.contracts['Token'].interface);

var account;
web3.eth.getAccounts( (err, accounts) => {
    console.log(`accounts : ${accounts}, err : ${err}`);

    account = accounts[0];
    console.log(`using : ${account}`);

    // Contract object
    const contract = new web3.eth.Contract(JSON.parse(abi), account);

    var sendOptions = {
        from: account,
        gas: 6000000,
        gasLimit: 6721975,
        gasPrice: '20000000000'
    };

    contract.deploy({
        data: bytecode
    }).send(sendOptions).then(function(newContractInstance) {
        console.log(`new contract at : ${newContractInstance.options.address}`); // instance with the new contract address);

        newContractInstance.methods.createNewStoryNode(web3.utils.fromAscii("The start"), web3.utils.fromAscii("Once upon a time... I woke up and...")).send(sendOptions).then(result => {
            console.log(`result : ${JSON.stringify(result.events.OnNewStoryCreated.returnValues)}`);
            console.log(`title : ${web3.utils.toAscii(result.events.OnNewStoryCreated.returnValues.title)}`);
        }).catch(err => {
            console.log(` err : ${err}`);
        });

        // 1
        newContractInstance.methods.addStoryNode(0, web3.utils.fromAscii("I eat breakfast"), web3.utils.fromAscii("Scramble eggs and orange juice")).send(sendOptions).then(result => {
            console.log(`result : ${JSON.stringify(result.events.OnNewNodeCreated.returnValues)}`);
            console.log(`title : ${web3.utils.toAscii(result.events.OnNewNodeCreated.returnValues.title)}`);
        }).catch(err => {
            console.log(` err : ${err}`);
        });

        // 2
        newContractInstance.methods.addStoryNode(0, web3.utils.fromAscii("Went to the gym"), web3.utils.fromAscii("Picked up my bag and walked all the way to Drumcondra")).send(sendOptions).then(result => {
            console.log(`result : ${JSON.stringify(result.events.OnNewNodeCreated.returnValues)}`);
            console.log(`title : ${web3.utils.toAscii(result.events.OnNewNodeCreated.returnValues.title)}`);
        }).catch(err => {
            console.log(` err : ${err}`);
        });


        // 3
        newContractInstance.methods.addStoryNode(0, web3.utils.fromAscii("Bad eggs"), web3.utils.fromAscii("The eggs didnt taste right. I havent been paying attention to the expiration dates")).send(sendOptions).then(result => {
            console.log(`result : ${JSON.stringify(result.events.OnNewNodeCreated.returnValues)}`);
            console.log(`title : ${web3.utils.toAscii(result.events.OnNewNodeCreated.returnValues.title)}`);
        }).catch(err => {
            console.log(` err : ${err}`);
        });


        // 4
        newContractInstance.methods.addStoryNode(0, web3.utils.fromAscii("Promoted"), web3.utils.fromAscii("Finally, got my blue belt. Now i have target on my back")).send(sendOptions).then(result => {
            console.log(`result : ${JSON.stringify(result.events.OnNewNodeCreated.returnValues)}`);
            console.log(`title : ${web3.utils.toAscii(result.events.OnNewNodeCreated.returnValues.title)}`);
        }).catch(err => {
            console.log(` err : ${err}`);
        });


    }).catch(err => {
        console.log(`errr : ${err}`);
    });
});





function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
