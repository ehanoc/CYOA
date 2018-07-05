var storiesContract = artifacts.require("./StoriesContract.sol");

module.exports = function(deployer) {
  deployer.deploy(storiesContract).then(instance => {
      console.log(`deployed to : ${instance.address}`);
  });
};
