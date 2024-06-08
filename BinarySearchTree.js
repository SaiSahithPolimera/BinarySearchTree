const { log } = require("console");

const Node = (data) => {
  return { left: null, data: data, right: null };
};

const Tree = (arr) => {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const buildTree = (arr) => {
    arr = arr.filter(onlyUniqueIndex).sort((a, b) => a - b);
    const createTree = (arr, l, r) => {
      if (l > r) {
        return null;
      }
      let mid = Math.floor((l + r) / 2);
      let root = Node(arr[mid]);
      root.left = createTree(arr, l, mid - 1);
      root.right = createTree(arr, mid + 1, r);
      return root;
    };

    return createTree(arr, 0, arr.length - 1);
  };

  let root = buildTree(arr);

  const insert = (value) => {
    let rt = root;
    if (!checkDuplicate(rt, value)) {
      const node = Node(value);
      while (rt != null) {
        if (value > rt.data) {
          if (rt.left === null) {
            rt.left = node;
            rt = null;
          } else {
            rt = rt.left;
          }
        } else {
          if (rt.right === null) {
            rt.right = node;
            rt = null;
          } else {
            rt = rt.right;
          }
        }
      }
    } else {
      console.log("Cannot insert duplicates!");
      return;
    }
  };

  const levelOrder = (callback) => {
    let rt = root;
    if (rt === null) {
      return;
    }
    let Queue = [];
    let currentNode;
    Queue.push(rt);
    let levelOrder = [];
    while (Queue.length > 0) {
      currentNode = Queue[0];
      levelOrder.push(currentNode.data);
      if (currentNode.left !== null) {
        Queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        Queue.push(currentNode.right);
      }
      Queue.shift();
    }
    if (callback && typeof callback === "function") {
      levelOrder.forEach((element) => {
        callback(element);
      });
    }
    return levelOrder;
  };

  const deleteItem = (value) => {
    let rt = root;
    const minValue = (node) => {
      let minVal = node.data;
      while (node.left !== null) {
        minVal = node.left.data;
        node = node.left;
      }
      return minVal;
    };
    const deleteNode = (rt, value) => {
      if (rt === null) {
        return rt;
      }
      if (value < rt.data) {
        rt.left = deleteNode(rt.left, value);
      } else if (value > rt.data) {
        rt.right = deleteNode(rt.right, value);
      } else {
        if (rt.left === null) {
          return rt.right;
        } else if (rt.right === null) {
          return rt.left;
        }
        rt.data = minValue(rt.right);
        rt.right = deleteNode(rt.right, rt.data);
      }
      return rt;
    };

    return deleteNode(rt, value);
  };

  const checkDuplicate = (rt, value) => {
    let isDuplicate = false;
    while (rt != null) {
      if (rt.data === value) {
        rt = null;
        isDuplicate = true;
      } else {
        if (value > rt.data) {
          rt = rt.left;
        } else {
          rt = rt.right;
        }
      }
    }
    return isDuplicate;
  };

  const inOrder = (callback) => {
    let inOrderAr = [];
    let rt = root;
    const helper = (rt) => {
      if (rt !== null) {
        helper(rt.left);
        inOrderAr.push(rt.data);
        helper(rt.right);
      }
    };
    if (callback && typeof callback === "function") {
      inOrderAr.forEach((element) => {
        callback(element);
      });
    }
    helper(rt);
    return inOrderAr;
  };

  const preOrder = (callback) => {
    let preOrderAr = [];
    let rt = root;
    const helper = (rt) => {
      if (rt !== null) {
        preOrderAr.push(rt.data);
        helper(rt.left);
        helper(rt.right);
      }
    };
    if (callback && typeof callback === "function") {
      preOrderAr.forEach((element) => {
        callback(element);
      });
    }
    helper(rt);
    return preOrderAr;
  };

  const height = (root, node) => {
    if (root === null) {
      return -1;
    }
    let leftHeight = height(root.left, node);
    let rightHeight = height(root.right, node);
    let ans = Math.max(leftHeight, rightHeight) + 1;
    if (root.data === node) {
      h = ans;
    }
    return ans;
  };

  const depth = (root, value) => {
    if (root === null) {
      return -1;
    }
    let dist = -1;
    if (
      root.data === value ||
      (dist = depth(root.left, value) >= 0) ||
      (dist = depth(root.left, value) >= 0)
    ) {
      return dist + 1;
    }
    return dist;
  };

  const isBalanced = () => {
    let rt = root;
    const dfs = (root) => {
      if (root === null) {
        return 0;
      }
      const leftHeight = dfs(root.left);
      if (leftHeight === -1) {
        return -1;
      }
      const rightHeight = dfs(root.right);
      if (rightHeight === -1) {
        return -1;
      }

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };
    let Balanced = dfs(rt) === -1 ? false : true;
    return Balanced;
  };

  const postOrder = (callback) => {
    let postOrderAr = [];
    let rt = root;
    const helper = (rt) => {
      if (rt !== null) {
        helper(rt.left);
        helper(rt.right);
        postOrderAr.push(rt.data);
      }
    };
    if (callback && typeof callback === "function") {
      postOrderAr.forEach((element) => {
        callback(element);
      });
    }
    helper(rt);
    return postOrderAr;
  };

  const findValue = (value) => {
    let rt = root;
    while (rt !== null) {
      if (value === rt.data) {
        return rt;
      }
      if (value > rt.data) {
        rt = rt.right;
      } else {
        rt = rt.left;
      }
    }
  };

  const reBalance = () => {
    let treeData = inOrder();
    let currentAr = arr;
    arr = arr.filter(onlyUniqueIndex).sort((a, b) => a - b);
    treeData.forEach((element) => {
      if (!arr.includes(element)) {
        arr.push(element);
      }
    });
    root = buildTree(arr);
    return root;
  };

  return {
    insert,
    prettyPrint,
    root,
    deleteItem,
    findValue,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
};


const createRandomArray = () => {
  let arr = [];
  arr.length = Math.floor(Math.random() * 100);
  for (let index = 0; index < arr.length; index++) {
    let num = Math.floor(Math.random() * 100);
    arr[index] = num;
  }
  return arr;
};

function onlyUniqueIndex(a, index, ar) {
  return ar.indexOf(a) === index;
}

let ar = createRandomArray();
const tr = Tree(ar);
tr.prettyPrint(tr.root);
console.log("Is Balanced: " + tr.isBalanced());
console.log("Level Order Traversal: " + tr.levelOrder());
console.log("PreOrder Traversal: " + tr.preOrder());
console.log("PostOrder Order Traversal: " + tr.postOrder());
console.log("InOrder Order Traversal: " + tr.inOrder());
console.log("Inserting 33")
tr.insert(33);
tr.prettyPrint(tr.root);
console.log("Inserting 69")
tr.insert(69);
tr.prettyPrint(tr.root);
console.log("Inserting 92")
tr.insert(92);
console.log("Inserting 22")
tr.prettyPrint(tr.root);
tr.insert(22);
tr.prettyPrint(tr.root);
console.log("Is Balanced: " + tr.isBalanced());
tr.root = tr.reBalance();
tr.prettyPrint(tr.root);
console.log("Is Balanced: " + tr.isBalanced());
console.log("Level Order Traversal: " + tr.levelOrder());
console.log("PreOrder Traversal: " + tr.preOrder());
console.log("PostOrder Order Traversal: " + tr.postOrder());
console.log("InOrder Order Traversal: " + tr.inOrder());
