OnNewStoryCreated: event({title: bytes[256], body: bytes[256], nodeId:uint256})
OnNewNodeCreated: event({title: bytes[256], body: bytes[256], parentNodeId: uint256, nodeId: uint256})

stories_nodes: public({
    id: uint256,
    title: bytes[256],
    body: bytes[256],
    owner: address,
    childNodesIds: uint256[4],
    childCount: uint256
}[uint256])

nr_nodes: uint256

@public
def __init__():
    self.nr_nodes = 0

@public
def createNewStoryNode(title: bytes[256], body: bytes[256]):
    self.stories_nodes[self.nr_nodes] = {
        id: self.nr_nodes,
        title: title,
        body: body,
        owner: msg.sender,
        childNodesIds: None,
        childCount: 0
    }

    log.OnNewStoryCreated(title, body, self.nr_nodes)
    self.nr_nodes += 1

@public
def addStoryNode(parentNodeId: uint256, title: bytes[256], body: bytes[256]):
    self.stories_nodes[self.nr_nodes] = {
        id: self.nr_nodes,
        title: title,
        body: body,
        owner: msg.sender,
        childNodesIds: None,
        childCount: 0
    }

    nextChild: uint256 = self.stories_nodes[parentNodeId].childCount
    self.stories_nodes[parentNodeId].childNodesIds[nextChild] = self.nr_nodes

    log.OnNewNodeCreated(title, body, parentNodeId, self.nr_nodes)

    self.stories_nodes[parentNodeId].childCount += 1
    self.nr_nodes += 1

@public
@constant
def getStoryNode(id: uint256) -> (uint256, bytes[256], bytes[256], address, uint256[4]):
    return (self.stories_nodes[id].id, self.stories_nodes[id].title, self.stories_nodes[id].body, self.stories_nodes[id].owner, self.stories_nodes[id].childNodesIds)
