---
title: "C++学习：vector"
date: 2026-06-19
categories: [C++]
description: "vector一些初始化方式整理"
draft: false
---自己刷题的时候发现老是忘记vector的初始化方式，所以做一个整体的梳理，方便日后回顾。


### 直接赋值成特定数字组成的数组：

```cpp
std::vector<int> v = {8, 4, 5, 9};
```

### 从另一个数组复制过来：

```cpp
std::vector<std::string> words3(words1);
```

### 从另一个数组复制过来（可以限定范围）：

```cpp
std::vector<std::string> words2(words1.begin(), words1.end());
```

### 重复的值：

```cpp
std::vector<std::string> words4(5, "Mo");
```