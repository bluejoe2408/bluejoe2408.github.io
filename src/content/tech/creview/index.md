---
title: "C语言的一些数据结构实现"
date: 2026-06-19
categories: [C]
description: "复习课"
draft: false
---C语言单行命令就是用
-o opt: This will compile the source.c file but instead of giving default name hence executed using ./opt, it will give output file as opt. -o is for output file option. 

`gcc source.c -o opt`

-Wall: This will check not only for errors but also for all kinds warning like unused variables errors, it is good practice to use this flag while compiling the code. 

`gcc source.c -Wall -o opt`

standard：c99以后基本就没有大的更新了，c11版本，c18版本（本来是c17，因为17年没搞完拖到18年了就被重命名了）

然后可以用make命令编译，make需要有一个Makefile文件，M通常大写。

CMake是用CMakelist.txt去生成一个Makefile，然后可以使用make命令

数组：
int a[10];

和vector/string的区别：
1. c数组静态，不能扩容。
2. 数组要手动管理内存，释放什么的，vector加元素会多分配，删除会释放空间。
3. 数组用指针，STL用迭代器

二维数组：
int a[10][10];

链表：https://github.com/bluejoe2408/c-course/blob/main/linked_list.c

