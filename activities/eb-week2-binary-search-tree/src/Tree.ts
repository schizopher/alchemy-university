import Node from "./Node";

export default class Tree {
  root: Node | null;
  constructor() {
    this.root = null;
  }
  addNode(node: Node) {
    if (this.root === null) {
      this.root = node;
    } else {
      this.addChildNode(this.root, node);
    }
  }
  addChildNode(parent: Node, child: Node) {
    if (child.data < parent.data) {
      if (parent.left !== null) this.addChildNode(parent.left, child);
      else parent.left = child;
    } else {
      if (parent.right !== null) this.addChildNode(parent.right, child);
      else parent.right = child;
    }
  }
  hasNode(number: number): boolean {
    return this.hasNodeRecursive(this.root, number);
  }
  hasNodeRecursive(node: Node | null, number: number): boolean {
    if (node === null) return false;
    else if (node.data === number) return true;
    else if (number > node.data) {
      return this.hasNodeRecursive(node.right, number);
    } else {
      return this.hasNodeRecursive(node.left, number);
    }
  }
}

module.exports = Tree;
