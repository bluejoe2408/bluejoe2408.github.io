---
title: "STL的一些数据结构"
date: 2026-06-19
categories: [C++]
description: "常用接口和时效性"
draft: false
---数组：
https://www.geeksforgeeks.org/cpp-stl-cheat-sheet/
```
vector<int> a1;
vector<vector<int>> a2;
```
| Function | Description | Time Complexity |
| -------- | ------------| --------------- |
| begin() | Returns an iterator to the first element. | O(1) |
| end() | Returns an iterator to the theoretical element after the last element. | O(1) |
| size() | Returns the number of elements present. | O(1) |
| at() | Return the element at a particular position. | O(1) |
| assign() | Assign a new value to the vector elements. | O(n) |
| push_back() | Adds an element to the back of the vector. | O(1) |
| pop_back() | Removes an element from the end. | O(1) |
| insert() | Insert an element at the specified position. | O(n) |
| erase() | Delete the elements at a specified position or range. | O(n) |
| clear() | Removes all elements. | O(n) |

vector扩容机制：申请新空间（倍数），从旧空间复制，释放旧空间。windows的vs扩容1.5倍（时间浪费多，空间节约）/linux扩容2倍（时间节约，空间浪费多，因为插一元素大量浪费的空间）。
