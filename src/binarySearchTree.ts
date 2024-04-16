type BNode = {
    value: number;
    left?: BNode;
    right?: BNode;
}

class BinarySearchTree {
    root?: BNode;

    private _createTree(numVals: number) {

        const vals: Set<number> = new Set();

        [...Array(numVals).keys()].forEach(idx => {
            const value = Math.floor(Math.random() * numVals * 3) + 1;
            vals.add(value)
        })

        Array.from(vals.keys()).forEach(key => {
            this.insert(key);
        })
    }

    constructor(numVals = 0) {
        this.root = undefined;
        this._createTree(numVals);
    }

    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(root: BNode, newNode: BNode) {
        // if the value is less than the root value move left of the tree
        // NOTE - if the value was the same, we could store values in a list
        if (newNode.value < root.value) {
            // if no left node, insert there
            if (!root.left) {
                root.left = newNode
            } else {
                // otherwise recur to continue down the left path
                this.insertNode(root.left, newNode)
            }
        } else {
            // otherwise the value to insert is greater than root
            if (!root.right) {
                root.right = newNode;

            } else {
                this.insertNode(root.right, newNode)
            }
        }
    }

    // helper method which creates a new node to
    // be inserted and calls insertNode
    insert(value: BNode['value']) {
        const newNode: BNode = {value};

        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

//  finds the minimum node in tree searching starts from given node
    findMinNode(root: BNode): BNode | undefined {
        // if left of a root is null then it must be minimum node
        if (root.left === undefined)
            return root;
        else
            return this.findMinNode(root.left);
    }

    removeNode(targetValue: BNode['value'], root?: BNode) {
        if (!root) {
            return undefined;
        }

        // postorder traversal
        // If !targetValue, traverse the appropriate child, remove, then return this node
        if (targetValue < root.value) {
            root.left = this.removeNode(targetValue, root.left);
            return root;
        }
        if (targetValue > root.value) {
            root.right = this.removeNode(targetValue, root.right);
            return root;
        }

        // if no children, just delete
        if (!(root.left || root.right)) {
            return undefined;
        }

        // if one child the return of the recursion will assign the root's right child to the right of the parent
        if (!root.left) {
            return root.right;
        }
        if (!root.right) {
            return root.left;
        }

        /*
            if two children
            1. find min value on right
            2. replace root value with minvalue
            3. remove min value node
            4. return newly overwritten node
         */
        const minRightValNode = this.findMinNode(root.right);
        root.value = minRightValNode?.value as number;

        root.right = this.removeNode(minRightValNode?.value as number, root.right);
        return root;


    }

    dfs(target: BNode['value'], root?: BNode): BNode | undefined {
        // If the child that was passed in is null, tell that to the parent
        // who might be a leaf, or might just only have one child
        if (!root) {
            return undefined;
        }

        // this is preorder traversal
        if (root.value === target) {
            return root;
        }

        const left = this.dfs(target, root.left);
        return left ? left : this.dfs(target, root.right);
    }

    /*
        while q has nodes
        check target
        enqueue left and right
     */
    bfs(root: BNode, target: BNode['value']) {
        // create a queue
        const queue = [root];

        // while there's still stuff in the queue
        while (queue.length > 0) {
            for (let i = 0; i < queue.length; i++) {
                // grab the first node in the q
                const node = queue.shift() as BNode;
                // check it
                if (node.value === target) {
                    return node;
                }
                //enqueue all non null children
                [node.left, node.right]
                    .filter(child => !!child).forEach(child => queue.push(child as BNode));
            }
        }
    }

    bfTraversal(root: BNode) {
        const res = [];
        const queue = [root];

        // while there's still stuff in the queue
        while (queue.length > 0) {
            let newLevel = [];
            for (let i = 0; i < queue.length; i++) {
                // grab the first node in the q
                const node = queue.shift() as BNode;
                // check it
                if (node.value === target) return node;
                newLevel.push(node.value);
                //enqueue all non null children
                [node.left, node.right]
                    .filter(child => !!child).forEach(child => queue.push(child as BNode));
            }
            res.push(newLevel);
        }
        return res;
    }


    printInOrder(root?: BNode) {
        if (!root) return;
        this.printInOrder(root.left);
        console.log(root.value);
        this.printInOrder(root.right);
    }
}

const target = 10;
const tree = new BinarySearchTree(5);
tree.printInOrder(tree.root);
// const result = tree.dfs(target, tree.root)
// console.log('dfs result |' + target + '| = ', result)
const result = tree.bfs(tree.root as BNode, target)
console.log('bfs result |' + target + '| = ', result)





