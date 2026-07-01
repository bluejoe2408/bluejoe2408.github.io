---
title: "rust学习笔记"
date: 2026-06-19
categories: [Rust]
description: "整体了解+配环境"
draft: false
---# rust优点：

## 高性能

为什么快？

- 解释性跑到时候解释成机器码再运行，编译型先编译成机器码，跑的时候直接是机器码了，不用运行的时候翻译。

- 和C/Cpp 生态亲和，可以完全复用一些高性能的C/Cpp生态（零损耗FFI Foreign Function Interface:u can call almost everything if u can call C）[rust doc link](https://doc.rust-lang.org/nomicon/ffi.html)

## 高安全性

### 唯一所有权：
- Rust 中的每一个值都有一个被称为其所有者（owner）的变量
- 值在任意时刻有且只有一个所有者：这可以避免像 多次释放 和 错误释放 等内存安全问题
- 当所有者（变量）离开作用域的时候，这个值将被丢弃（回收）：出作用域释放可以避免 memory leak 的问题
- rust的设计有些地方和c++是反的，比如c++默认是mut，要不可变需要显式使用const ，rust则相反；c++默认是拷贝语义，rust默认是move，c++也不支持多次move

### 借用：
- 同时只能存在一个可变借用或者多个不可变借用
- 存在可变借用期间不能直接访问原变量

### 无畏并发

## 协作开发
- 比如 C++ 这样的语言，code review 都是很难看出问题来的，RUST如果某个人写的代码有安全问题（无论是内存安全还是并发安全），编译都过不了。这也是为啥大家总听说 Rust 编译很难过，是真的很难过，编译很难过的时候程序员也很难过。

除此之外，Rust 是一门工程实践出来的语言，还提供了：
- 智能的编译器
- 完善的文档
- 齐全的工具链
- 成熟的包管理

# 编写你的第一个代码

## cargo的使用

cargo是包管理和构建工具

1. cargo new 可以用来新建一个项目
2. cargo fmt 可以自动格式化代码
3. cargo check 可以用来检查是否编译通过
4. cargo clippy 用来做lint(静态代码分析工具)
5. cargo build (--release) 用来编译产物，不加 --release就是调试模式（不开优化，编译速度快），加了--release就是生产模式（优化火力开满，代价是编译慢）

运行cargo build -v的时候可以看到一条类似这样的输出：
```
Running `rustc --create-name chapter_02 --edition=2021 .......`
```
远古时期没有cargo，大家是用rustc来编译的，比如
```
rustc src/main.rs
./main
```
和cargo run效果是一样的。

可以使用rustup default stable/beta/nightly来切换Rust工具链的channel；

可以使用rustup update来更新Rust工具链版本。

这种在简单项目还可以，一旦遇到复杂项目嘛。。。这就是构建工具的意义。