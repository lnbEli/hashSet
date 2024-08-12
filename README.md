# HashSet Functionality

## Bucket Management

- **Initialization**: The `HashSet` starts with an initial bucket capacity of 16.
- **Load Factor**: Aims to maintain a load factor of 0.75, meaning it will resize when 75% of the buckets are utilized.
- **Resizing**: Doubles the bucket capacity and rehashes all existing entries when the load factor threshold is exceeded.

## Basic Operations

- **`set(key)`**: Adds a key to the hash set.
  - **Operation**:
    - Calculates the index of the bucket using a hash function.
    - If the bucket is empty, it adds the key.
    - If the bucket contains the same key, it does nothing.
    - If the bucket contains a different key, it converts the bucket into a linked list and stores both keys.
    - If the bucket already contains a linked list, it appends the new key if it’s not already present.
    - The function manages the capacity of the buckets to avoid overflow by using the `manageHashSetCapacity` method.
- **`has(key)`**: Checks if the hash set contains a specific key.

  - **Operation**:
    - Retrieves the bucket index using the hash function.
    - Checks if the key is in the bucket or in the linked list (if a collision occurred).
    - Returns `true` if the key is found, otherwise `false`.

- **`remove(key)`**: Removes a key from the hash set.
  - **Operation**:
    - First checks if the key exists using `has`.
    - If the key is directly in the bucket, it deletes the key.
    - If the key is part of a linked list, it removes the node containing the key from the list.
    - If removing the node leaves only one key in the linked list, the list is replaced by that single key.

## Utility Methods

- **`length()`**: Returns the total number of keys in the hash set.

  - **Operation**:
    - Iterates through each bucket.
    - Increments the count for each key found.
    - Adds the size of the linked list (if present) to the count.

- **`clear()`**: Resets the hash set, removing all keys.

  - **Operation**:
    - Empties the buckets array and resets its length to the initial capacity.

- **`keys()`**: Retrieves all keys in the hash set as an array.
  - **Operation**:
    - Iterates through each bucket.
    - Adds keys directly to an array if no collision occurred.
    - If a linked list is present, iterates through the list and adds each key to the array.

## Internal Methods

- **`bucketsUsed()`**: Returns the number of buckets that are currently in use.

  - **Operation**: Counts buckets that contain keys or linked lists.

- **`bucketsOverCapacity()`**: Checks if the number of used buckets exceeds the load factor threshold.

  - **Operation**: Returns `true` if used buckets exceed the load factor limit, prompting resizing.

- **`doubleBucketCapacity()`**: Increases the bucket capacity by doubling its current size.

- **`rePopulateHashSet()`**: Rehashes and redistributes all keys into the newly resized bucket array.

## Viewing Internal State

- **`view()`**: Returns the internal bucket array, which can be useful for debugging.

## Notes

- **Collision Handling**: The `HashSet` uses linked lists to handle collisions, which is a standard approach in hash sets. This allows efficient management of multiple keys in the same bucket.
- **Capacity Management**: The set dynamically adjusts its capacity to maintain efficient performance by doubling the number of buckets when the load factor is exceeded.
