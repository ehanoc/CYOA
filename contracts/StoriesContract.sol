pragma solidity  ^0.4.19;

contract StoriesContract {

  event StoryCreated(string title, string body, uint id);

  struct StoryNode {
    uint id;
    string title;
    string body;
    address owner;
    mapping(uint => StoryNode) childNodes;
  }

  // story id maps to start node
  mapping(uint => StoryNode) stories;

  // total nr of stories
  uint nr_nodes;

  /**
  *
  *
  *
  */
  function createStory(string title, string body) public {
    //require(msg.value > 0);

    StoryNode memory newNode = StoryNode(nr_nodes, title, body, msg.sender);

    stories[newNode.id] = newNode;

    nr_nodes++;

    emit StoryCreated(title, body, nr_nodes);
  }

  /**
  *
  *
  */
  function getNumberNodes() public view returns(uint) {
      return nr_nodes;
  }
}
