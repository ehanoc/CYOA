var storiesContract = artifacts.require("./StoriesContract.sol");

module.exports = function(deployer) {
  deployer.deploy(storiesContract);
};
