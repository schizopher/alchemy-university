export default class TrieNode {
  key: string | null;
  children: { [key: string]: TrieNode };
  isWord: boolean;

  constructor(key: string | null = null) {
    this.key = key;
    this.children = {};
    this.isWord = false;
  }
}
