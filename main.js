// 1. condition to check if it is more than 7 or lesser than 0
// 2. a knight can move in 8 directions at once max, so max 8 per level inserted into queue stack
// 3. we need 2 information - where the node comes from and the vertex count
// 4. we need an array to keep track of the visted nodes
// 5. once the desired node is reached, we will stop
// 6. we will reconstruct the path based on the 2 information by reversing

function Node(x, y) {
  const location = [x, y];
  let parent = null;
  let step = 0;
  return { location, parent, step };
}

function AdjacenciesOf(node) {
  const adjList = [];
  // 8 possible combinations of nodes
  const combinations = [
    [2, 1],
    [1, 2],
    [-1, -2],
    [-2, -1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [-2, 1],
  ];

  const newLocations = combinations.map((parentLocation) =>
    parentLocation.map((value, index) => value + node.location[index])
  );

  for (i = 0; i < newLocations.length; i++) {
    if (
      newLocations[i][0] > 7 ||
      newLocations[i][0] < 0 ||
      newLocations[i][1] > 7 ||
      newLocations[i][1] < 0
    ) {
      continue;
    }
    const childNode = Node(newLocations[i][0], newLocations[i][1]);
    childNode.parent = node;
    childNode.step = node.step + 1;
    adjList.push(childNode);
  }
  return adjList;
}

function retracePath(node) {
  let current = node;
  let shortestPath = [];
  for (i = 0; i <= node.step; i++) {
    shortestPath.push(current.location);
    current = current.parent;
  }
  shortestPath.reverse();
  return shortestPath;
}

function knightMoves(start, end) {
  let x = start[0];
  let y = start[1];
  let current = Node(x, y);

  let visitedNodes = [];
  let queue = [current];

  while (queue[0].location.toString() !== end.toString() && queue.length > 0) {
    if (visitedNodes.includes(queue[0].location.toString())) {
      queue.shift();
      continue;
    }
    const visited = queue.shift();
    visitedNodes.push(visited.location.toString());
    queue.push(...AdjacenciesOf(current));
    current = queue[0];
  }
  if (queue[0].location) {
    const path = retracePath(queue[0]);
    console.log(`You made it in ${queue[0].step} moves!  Here's your path:`);
    for (i = 0; i < path.length; i++) {
      console.log(path[i]);
    }
    // return path;
  } else {
    console.log(-1);
    // return -1;
  }
}

knightMoves([0, 0], [3, 3]);
console.log("Next Move!");
knightMoves([3, 3], [0, 0]);
console.log("Next Move!");
knightMoves([0, 0], [7, 7]);
