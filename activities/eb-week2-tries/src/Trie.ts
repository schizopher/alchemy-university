import TrieNode from "./TrieNode";

export default class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word: string) {
    let currNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currNode.children[char]) {
        currNode.children[char] = new TrieNode(char);
      }
      currNode = currNode.children[char];
      if (i === word.length - 1) currNode.isWord = true;
    }
  }

  contains(word: string) {
    let currNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currNode.children[char]) return false;
      currNode = currNode.children[char];
    }
    return currNode.isWord;
  }
}
