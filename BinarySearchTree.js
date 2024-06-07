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
    const node = Node(value);
    if (root == null) {
      return node;
    } else {
      let rt = root;
      while (rt != null) {
        if (value < rt.data) {
          if (rt.left == null) {
            rt.data = value;
            rt = null;
          } else {
            rt = rt.left;
          }
        } else {
          if (rt.right == null) {
            rt = null;
            rt.data = value;
          } else {
            rt = rt.right;
          }
        }
      }
    }
  };
  return { insert, prettyPrint, root };
};

let ar = [41, 3, 44, 12, 99, 1, 2, 4, 5, 6, 7, 9, 9, 2, 3, 4, 1, 1];

function onlyUniqueIndex(a, index, ar) {
  return ar.indexOf(a) === index;
}

const tr = Tree(ar);
tr.prettyPrint(tr.root);
tr.insert(13, tr.root);
tr.prettyPrint(tr.root);
