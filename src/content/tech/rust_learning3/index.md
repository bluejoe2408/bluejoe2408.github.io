---
title: "rust学习笔记"
date: 2026-06-19
categories: [Rust]
description: "数据类型"
draft: false
---https://www.rustwiki.org.cn/en/book/ch03-02-data-types.html#scalar-types

默认是不可变的，定义变量一定要加mut

有shadow的语义，以后定义的为准，比较特殊的是定义一个不可变的常量，他的类型可以改变，如果定一个变量，他的类型是不能变的
```
    let spaces = "   ";
    let spaces = spaces.len();
```
这个可以编译通过
```
    let mut spaces = "   ";
    spaces = spaces.len();
```
这个不能被编译通过

进函数传参，要改变原值的话，需要使用到可变引用

静态类型：在编译期间就需要知道数据的类型

## 标量： 

i8, u8, i16, u16, ... , isize, usize(由跑的机器决定)

$in$ 范围 $-2^{n-1}$ ~ $2^{n-1}-1$ ;
$un$ 范围 $0$ ~ $2^{n}-1$ 

i32 -2147483648 ~ 2147483647

f32, f64

bool

char (4字节 u32，不像C/C++ u8)

## 复合类型：

Rust 还支持两种复合类型：
- 元组 tuple：let a = (1, 2); let (a, b) = (1, 2)
- 数组 array: let a = [1, 2, 3]; let a = [0; 5] // 这个声明中 0 是默认值，5 是长度，等价于 let a = [0, 0, 0, 0, 0]

