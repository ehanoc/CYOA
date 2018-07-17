var StoriesContract = artifacts.require("StoriesContract");

contract("StoriesContract", accounts => {

    //replace for your test contract addr
    //const contract = StoriesContract.at("0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4");
    const contract = StoriesContract.deployed();
    const gas = 200000;
    const account = accounts[0];

    var nodes_count = 0;

    describe("createStory", () => {
        it("it should let us create a story", () => {
            return contract.then(instance => {
                var title = "test title";
                var body = "test body";

                return instance.createNewStoryNode(title, body, {from: account, gas: gas});
            }).then(result => {
                let storyCreatedEvent = getEventArgs(result, "OnNewStoryCreated");

                assert.equal(storyCreatedEvent.id > 0, true, "Should increment stories ID");
            }).catch(err => {
                console.log(` err : ${err}`);
            });
        });

        it("returns nr of nodes", () => {
            return contract.then(instance => {
                return instance.getNumberNodes.call();
            }).then(nrNodes => {
                nodes_count = nrNodes;
                //console.log(` nrNodes : ${nrNodes}`);
                assert.equal(nrNodes.valueOf() > 0, true, "No stories");
            })
        });
    });


    describe("ChildNodes", () => {
        var nodeCreatedEvent;

        it("adding a new child nodes", () => {
            return contract.then(instance => {
                var parentId = nodes_count; //assuming to test this exists

                instance.addStoryNode(parentId, "child 2", "hahaha", {from: account, gas: gas});
                instance.addStoryNode(parentId, "child 3", "booo", {from: account, gas: gas});
                return instance.addStoryNode(parentId, "child node title", "child node body", {from: account, gas: gas});
            }).then(result => {
                nodeCreatedEvent = getEventArgs(result, "OnNewNodeCreated");
                assert.equal(Number(nodeCreatedEvent.id) > Number(nodeCreatedEvent.parentId), true, "Has incremented node count");
            });
        });

        it("confirm child added", () => {
            return contract.then(instance => {
                return instance.getStoryNode(nodeCreatedEvent.id);
            }).then(node => {
                assert.equal(Number(nodeCreatedEvent.id) == Number(node[0]), true);
            });
        });
    });
});

function getEventArgs(transaction, evt) {
  let event = transaction.logs.filter(({ event }) => event === evt)[0];
  if(!event) throw `Remember to call ${evt} event!`;
  return event.args;
}
