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

  const deleteItem = (value) => {
    let rt = root;
    const minValue = (node) => {
      let minVal = node.data;
      while (node.left !== null) {
        minVal = node.left.data;
        console.log(minVal);
        node = node.left;
      }
      return minVal;
    }
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

  return { insert, prettyPrint, root, deleteItem };
};

let ar = [41, 3, 44, 12, 99, 1, 2, 4, 5, 6, 7, 9, 9, 2, 3, 4, 1, 1];

function onlyUniqueIndex(a, index, ar) {
  return ar.indexOf(a) === index;
}

const tr = Tree(ar);

tr.prettyPrint(tr.root);