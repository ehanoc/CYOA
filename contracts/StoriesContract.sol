pragma solidity  ^0.4.19;

contract StoriesContract {

  event OnNewStoryCreated(string title, string body, uint id);
  event OnNewNodeCreated(string title, string body, uint parentId, uint id);

  struct StoryNode {
    uint id;

    string title;
    string body;

    address owner;

    // Id's of child nodes
    //Lookups to be done in storiesNodes
    uint[] childNodesIds;
  }

  // All nodes
  // Maps nodes Ids => Node Struct
  // All nodes are held here for direct lookup vs looping through nested nodes
  mapping(uint => StoryNode) storiesNodes;

  // total nr of nodes
  //also used to increment nodes Ids
  uint nr_nodes;

  /**
  *
  */
  constructor() public {
    // lazy way to build fixtures for DEVELOPMENT
    //When contract is built, apply dummy data to test

    //0
    createNewStoryNode("The start", "Once upon a time... I woke up and...");
    //1
    addStoryNode(0, "I eat breakfast", "Scramble eggs and orange juice");
    //2
    addStoryNode(0, "Went to the gym", "Picked up my bag and walked all the way to Drumcondra");

    //3
    addStoryNode(1, "Bad eggs", "The eggs didnt taste right. I havent been paying attention to the expiration dates");

    addStoryNode(2, "Promoted", "Finally, got my blue belt. Now i have target on my back");
  }

  /**
  * Creates a new Story Root Node.
  *
  */
  function createNewStoryNode(string title, string body) public {
    StoryNode memory newNode = StoryNode(nr_nodes, title, body, msg.sender, new uint[](0));
    storiesNodes[newNode.id] = newNode;
    nr_nodes++;

    emit OnNewStoryCreated(title, body, nr_nodes);
  }

  /**
  * Adds a child node to the parent Node by id
  *
  * Requires parent node id to exist.
  */
  function addStoryNode(uint parentNodeId, string title, string body) public {
    StoryNode storage parentNode = storiesNodes[parentNodeId];

    StoryNode memory newNode = StoryNode(nr_nodes, title, body, msg.sender, new uint[](0));
    storiesNodes[newNode.id] = newNode;
    nr_nodes++;

    parentNode.childNodesIds.push(newNode.id);

    emit OnNewNodeCreated(title, body, parentNodeId, newNode.id);
  }

  /**
  * Returns node's id, title, body, owner's address
  */
  function getStoryNode(uint id) public view returns(uint, string, string, address, uint[]) {
      StoryNode storage node = storiesNodes[id];
      return (node.id, node.title, node.body, node.owner, node.childNodesIds);
  }

  /**
  *
  *
  */
  function getNumberNodes() public view returns(uint) {
      return nr_nodes;
  }
}
