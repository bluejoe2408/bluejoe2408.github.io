---
title: "neetcode刷题：Single Number"
date: 2026-06-19
categories: [LeetCode]
description: "leetcode 200"
draft: false
---为了让你的代码在性能和专业度上更进一步，我整理了以下几个优化建议：

### 1. 队列出队的性能瓶颈
在 Python 中，使用列表（`list`）作为队列并调用 `bfsQueue.pop(0)` 时，由于底层的内存分配机制，它会迫使列表中的所有后续元素都向前移动一位，这会导致该操作的时间复杂度退化为 $O(K)$（其中 K 是队列长度）。
* **优化方法**：引入 Python 标准库中的 `collections.deque`（双端队列）。它的 `popleft()` 方法具有 $O(1)$ 的时间复杂度，非常适合 BFS。

### 2. 空间复杂度优化（原地修改）
你使用了一个二维数组 `isVisitMap` 来记录访问过的位置，这会额外占用 $O(M \times N)$ 的内存空间。
* **优化方法**：由于题目并没有限制我们不能修改原数组，当我们遍历到一块陆地 `"1"` 时，我们可以直接将其在原数组 `grid` 中修改为水 `"0"`。这样它就不会被再次访问，从而完全省去了 `isVisitMap` 带来的额外空间开销。

### 3. 代码语法的简洁性 (Pythonic)
虽然你的代码很易读，但我们可以利用 Python 的特性让它更简洁明了。
* **方向数组迭代**：直接迭代方向坐标对 `(dx, dy)`，而不需要通过索引 `i` 来访问。

---

### 优化后的代码实现

你可以参考以下应用了上述建议的优化代码：

```python
from collections import deque
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # 边缘情况处理
        if not grid or not grid[0]:
            return 0

        ans = 0
        rows = len(grid)
        cols = len(grid[0])

        def bfs(startRowIndex: int, startColIndex: int):
            # 使用 deque 提升出队性能
            bfsQueue = deque([(startRowIndex, startColIndex)])
            
            # 定义四个方向：上、下、左、右
            directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

            while bfsQueue:
                # 使用 popleft() 实现 O(1) 的出队
                rowIndex, colIndex = bfsQueue.popleft()

                for dx, dy in directions:
                    newRow, newCol = rowIndex + dx, colIndex + dy
                    
                    # 检查边界条件，并且判断是否为未访问过的陆地 "1"
                    if 0 <= newRow < rows and 0 <= newCol < cols and grid[newRow][newCol] == "1":
                        bfsQueue.append((newRow, newCol))
                        # 入队时立刻将其变为 "0"（水），防止被重复添加到队列中
                        grid[newRow][newCol] = "0" 

        for rowIndex in range(rows):
            for colIndex in range(cols):
                # 发现新的岛屿
                if grid[rowIndex][colIndex] == "1":
                    ans += 1
                    # 标记为 0，防止自己被重复遍历
                    grid[rowIndex][colIndex] = "0"
                    # 启动 BFS 将相邻的陆地全部淹没
                    bfs(rowIndex, colIndex)

        return ans
```

在优化之后，我们不仅大幅降低了空间复杂度，也保证了时间复杂度的最优状态。

思考一下：如果未来的某个面试官提出**不能修改**原输入的 `grid` 数组，除了你原来使用的创建一个完全一样大小的 `isVisitMap` 二维数组之外，我们还能利用 Python 的哪种原生数据结构来记录已访问过的坐标，从而在图中“陆地”非常稀疏时节省大量内存呢？

if 逻辑判断顺序短路逻辑 (Short-circuiting): Python 优化了逻辑运算。A and B: 如果 \(A\) 为 False，则直接判断为 False，不会去计算 \(B\)。A or B: 如果 \(A\) 为 True，则直接判断为 True，不会去计算 \(B\)。

用set
set和defaultdict(list)底层都是哈希表，set是键值对相同，defaultdict(list)是键值不同