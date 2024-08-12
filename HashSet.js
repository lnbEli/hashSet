import hash from "../hashMap/hash.js";
import LinkedList from "../linked-list/linked-list.js";

// HashSet factory function
export default function HashSet() {
  const initialBucketCapacity = 16;
  let currentBucketCapacity = initialBucketCapacity;
  const buckets = [];
  buckets.length = currentBucketCapacity;
  const loadFactor = 0.75;

  //Function to check bucket capacity being used
  function bucketsUsed() {
    let count = 0;
    buckets.forEach((bucket) => {
      // forEach skips over empty slots(<1 empty item>)
      count++;
    });
    return count;
  }
  //Checks if buckets are about to go over capacity
  function bucketsOverCapacity() {
    if (bucketsUsed() >= currentBucketCapacity * loadFactor) {
      return true;
    } else {
      return false;
    }
  }

  //Double bucket capacity
  function doubleBucketCapacity() {
    currentBucketCapacity = currentBucketCapacity * 2;
  }

  // Makes copy of current entries, clears all entries, doubles bucket capacity and repopulates HashMap
  function rePopulateHashSet() {
    const currentKeys = keys();
    clear();
    doubleBucketCapacity();
    currentKeys.forEach((key) => {
      set(key);
    });
  }

  //Watches bucket capacity and changes if needed
  function manageHashSetCapacity() {
    if (bucketsOverCapacity()) {
      rePopulateHashSet();
    } else {
      return;
    }
  }

  function set(key) {
    const index = hash(key, currentBucketCapacity);
    //Empty bucket
    if (!buckets[index]) {
      //Check if reached load factor
      manageHashSetCapacity();
      buckets[index] = key;
      // Bucket already has key assigned.
    } else if (typeof buckets[index] === "string") {
      // Key is equal to current key.
      if (buckets[index] === key) {
        return;
        // Create LinkedList and add objects with key value pair to it.
      } else {
        const list = new LinkedList();
        list.append(buckets[index]);
        list.append(key);
        buckets[index] = list;
      }
      // Check if bucket contains LinkedList.
    } else if (buckets[index] instanceof LinkedList) {
      //Check if key already exist and if it does update it
      if (buckets[index].contains(key)) {
        return;
      } else {
        buckets[index].append(key);
      }
    }
  }

  function has(key) {
    const index = hash(key, currentBucketCapacity);
    if (!buckets[index]) {
      return false;
    } else if (buckets[index] === key) {
      return true;
    } else if (buckets[index] instanceof LinkedList) {
      if (buckets[index].contains(key)) {
        return true;
      }
    } else {
      return false;
    }
  }

  function remove(key) {
    // if key doesn't exist return false
    if (!this.has(key)) {
      return false;
    } else {
      const index = hash(key, currentBucketCapacity);
      // If key exist in bucket without colisions remove.
      // Use of Delete as want to maintain length of buckets array to mimic non dynamic array sizing
      if (buckets[index] === key) {
        delete buckets[index];
        return true;
        // Remove from linkedList
      } else {
        const keyIndex = buckets[index].find(key);
        buckets[index].removeAt(keyIndex);
        // If only one key in LinkedList, LinkedList removed and key added in its place
        if (buckets[index].size() <= 1) {
          const headNodeKey = buckets[index].at(0).value;
          buckets[index] = headNodeKey;
        }
        return true;
      }
    }
  }

  function length() {
    let count = 0;
    buckets.forEach((bucket) => {
      if (typeof bucket === "string") {
        count++;
      } else if (bucket instanceof LinkedList) {
        count += bucket.size();
      }
    });

    return count;
  }

  // Resets buckets
  function clear() {
    buckets.length = 0;
    buckets.length = initialBucketCapacity;
  }

  function keys() {
    const keysArray = [];
    buckets.forEach((bucket) => {
      // If bucket doesn't have any colisions push key to keys array(No linkedList)
      if (typeof bucket === "string") {
        keysArray.push(bucket);
        // If conatins LinkedList iterate through keys in linkedlist and push them to keys array
      } else if (bucket instanceof LinkedList) {
        const arrayOfLinkedListKeys = [];
        let node = bucket.headNode;
        while (node) {
          arrayOfLinkedListKeys.push(node.value);
          node = node.nextNode;
        }
        arrayOfLinkedListKeys.forEach((element) => {
          keysArray.push(element);
        });
      }
    });
    return keysArray;
  }

  function view() {
    return buckets;
  }

  return {
    set,
    view,
    has,
    remove,
    length,
    clear,
    keys,
    bucketsUsed,
  };
}
