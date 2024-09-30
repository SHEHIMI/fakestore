// Initialize class Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Initialize class LinkedList
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Adds a new node with the given value to the end of the linked list
  addNode(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next !== null) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
  }

  // Removes all nodes from the linked list whose value is greater than input x
  removeNodes(x) {
    // Remove nodes from the beginning if they are greater than input x
    while (this.head !== null && this.head.value > x) {
      // move to next node
      this.head = this.head.next;
    }

    let curr = this.head;
    while (curr !== null && curr.next !== null) {
      if (curr.next.value > x) {
        curr.next = curr.next.next;
      } else {
        curr = curr.next;
      }
    }
  }
}

// Test cases

// Create an instance of LinkedList Class and add nodes for testing sake
const list = new LinkedList();
list.addNode(10);
list.addNode(5);
list.addNode(12);
list.addNode(7);
list.addNode(3);
list.addNode(9);
list.addNode(10);

// removeNodes to remove nodes greater than 7(x)
list.removeNodes(7);

// Print result
let curr = list.head;
const result = [];
while (curr !== null) {
  result.push(curr.value);
  curr = curr.next;
}

console.log(result);
