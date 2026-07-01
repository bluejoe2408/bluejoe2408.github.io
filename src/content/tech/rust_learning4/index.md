---
title: "rust学习笔记"
date: 2026-06-19
categories: [Rust]
description: "函数与控制流"
draft: false
---# 函数
在Rust中，函数是组织代码的一个基本模块。前面几节中我们已经见过了Rust最重要的函数main函数，它是整个程序的入口。有了函数，我们就可以把代码逻辑片段封装在其中，从而提高代码的可读性和复用性。

Rust中函数使用fn关键字来定义，例如：
```
fn greet() {
    println!("Welcome!");
}
```
这里我们定义了一个函数greet。

fn是函数定义的关键词，greet是函数名，后面的括号是可选参数列表，这里为空。接下来的大括号就是函数体的内容。

## 参数
在定义函数的时候，可以给它加入参数。参数是函数签名的一部分。
```
fn say_hello(name: String) {
    println!("Hello, {}", name);
}
```
这里我们定义了一个函数say_hello。这里的参数列表不为空，是一个String类型的name。

Rust中的函数名一般使用snake_case（下划线分割的小写字母），例如这里的say_hello。

我们可以通过下面的方式来调用前面定义的两个函数：
```
fn main() {
    greet();
    
    let name = "Alice".to_string();
    say_hello(name);
}
```
greet函数参数列表为空。而say_hello需要提供一个String类型的参数，这里我们创建了一个String类型的name，将其传给say_hello函数。

## 返回值
Rust的函数可以返回一个值给它的调用方。不过在介绍返回值之前，需要插入两个概念的介绍——语句（statement）和表达式（expression）

### 语句和表达式
语句通常表示执行一个动作，并且不会返回任何值。用let做变量绑定就是一个语句，例如：
```
fn main() {
    let x = 1;
}
```
函数的定义也是一个语句。例如上面的main函数定义，整体就是一个语句。
刚才说了语句没有返回值，因此下面的写法是错误的：
```
fn main() {
    let x = (let y = 2);
}
```
let y = 2是一个语句，没有返回值，因此不能把x绑定上去。

跟语句不同，表达式会求值，然后返回一个值。常见的表达式有下面几种情况：
1. 算术表达式：1+2是一个表达式，返回值是3。甚至3本身也是一个表达式
2. 函数调用：add(1, 2)也是一个表达式，因为函数会返回一个值。
3. 宏调用
4. 用花括号包裹的最终返回一个值的代码块

关于上面的第四点，这里举个例子来说明：
```
fn main() {

    let result = {
        let temp = z * 3;
        temp - 1 
    };

}
```
这里的result等号右侧的语句块如下：
```
{
    let temp = z * 3;
    temp - 1
}
```
这个语句块最后返回了temp - 1。注意这里的temp - 1后面没有分号。表达式最后不能有分号，一旦加上了分号，就会变成一个语句，而语句没有返回值。

### 返回值
说完语句和表达式，我们就可以正式介绍函数返回值了。首先来看怎么定义一个具有返回值的函数：
```
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let num1 = 5;
    let num2 = 7;
    
    let sum = add(num1, num2);
    println!("The sum of {} and {} is {}.", num1, num2, sum);
}
```
上面的例子中，我们定义了一个add函数，入参是两个i32类型的值a和b。接着我们使用了箭头符号-> ，后面跟的i32就是定义的返回值类型。在Rust中，函数的返回值是函数体的最后一个表达式的值。例如在上面的例子中，函数体最后一个表达式是a+b。因此add函数返回的就是a+b。 因此sum的值是a+b也就是12。

当然，也可以在函数中使用return关键字来提前返回一个值，例如下面的代码：
```
fn pass_exam(score: u32) -> bool {
    if score < 60 {
        return false;
    }
    true
}
```
在上述代码中，如果分数小于60分，会返回false。其他情况返回true。

如果我们给上面add函数的末尾加上一个分号，会怎么样？考虑下面这段代码：
```
fn add(a: i32, b: i32) -> i32 {
    a + b;
}

fn main() {
    let num1 = 5;
    let num2 = 7;
    
    let sum = add(num1, num2);
    println!("The sum of {} and {} is {}.", num1, num2, sum);
}
```
编译的话会得到下面的报错：
```
error[E0308]: mismatched types
 --> src/main.rs:1:27
  |
1 | fn add(a: i32, b: i32) -> i32 {
  |    ---                    ^^^ expected `i32`, found `()`
  |    |
  |    implicitly returns `()` as its body has no tail or `return` expression
2 |     a + b;
  |          - help: remove this semicolon to return this value

For more information about this error, try `rustc --explain E0308`.
error: could not compile `playground` due to previous error
```
报错显示，add函数期望的返回类型是i32，但是实际的返回的是()类型。由于我们给a+b加上了分号，它从表达式变成了语句。而语句没有返回值。另一方面，这也说明了如果一个函数没有返回值，那么其实会隐式的返回一个单元类型()。

# 控制流
控制流是编程语言的一个重要概念。程序员通过控制流可以控制哪些代码要执行。在Rust中，最常见的两种控制流结构是if表达式和循环。

## if表达式
if表达式会跟一个condition，来表示如果condition满足，就执行下面这段代码。if通常还会和else联用，从而当条件不满足的时候，就执行else后面的代码。基本的写法如下：
```
if condition {
    // code to execute if the condition is true
} else {
    // code to execute if the condition is false
}
```
注意这里的condition必须是bool类型。如果是其他类型，会产生编译错误。

if除了可以跟else联用，也可以在中间加入else if来形成多个条件判断。基本的写法如下：
```
if condition1 {
    // code to execute if condition1 is true
} else if condition2 {
    // code to execute if condition1 is false and condition2 is true
} else {
    // code to execute if both conditions are false
}
```
如上面的注释所说，condition1为true时，会执行if后面代码块的代码；当condition1为false，condition2为true时，会执行else if后面代码块的代码；如果两个条件都是false，就会执行else的代码。

需要注意的是，连续使用太多的else if并不是一个好的编程习惯。在后续的章节中，我们会介绍match这个结构来应对这种场景。

正如这一小节的标题所说，if其实是一个表达式，具有返回值。既然如此，我们就可以写一个let语句来获取if表达式的值。
```
fn main() {
    let temperature = 20;

    let weather = if temperature >= 25 {
        "hot"
    } else {
        "cool"
    };

    println!("The weather today is {}.", weather);
}
```
我们这里通过判断温度是否大于等于25度，来决定天气是冷还是热。上面的if else结构会根据temperature的实际值，返回"hot"或者"cool"。需要注意的是，if分支和else分支的返回值必须是同一类型。如果是不同类型，就会产生编译错误。我们对上面的代码稍作修改:
```
fn main() {
    let temperature = 20;

    let weather = if temperature >= 25 {
        "hot"
    } else {
        25
    };

    println!("The weather today is {}.", weather);
}
```
这会产生下面的编译错误：
```
error[E0308]: `if` and `else` have incompatible types
 --> src/main.rs:7:9
  |
4 |       let weather = if temperature >= 25 {
  |  ___________________-
5 | |         "hot"
  | |         ----- expected because of this
6 | |     } else {
7 | |         25
  | |         ^^ expected `&str`, found integer
8 | |     };
  | |_____- `if` and `else` have incompatible types

For more information about this error, try `rustc --explain E0308`.
error: could not compile `playground` due to previous error
```
报错中也明确说了，`if` and `else` have incompatible types。

## 循环
除了if表达式之外，Rust中另一个重要的控制流结构是循环。循环会被用来多次执行同一段代码。Rust中提供了三种循环方式，loop，while，for。我们这里来一一介绍一下。

### loop
loop关键字会创建一个无限循环：
```
loop {
    // code to execute repeatedly
}
```
想要从循环中跳出，需要配合break关键词使用，例如：
```
let mut counter = 0;

loop {
    counter += 1;
    if counter < 5 {
        continue;
    }
    println!("Hello, world!");
    if counter >= 5 {
        break;
    }
}
```
上面的例子还展示了关键词continue的用法。它可以用来跳过接下来的代码，直接进入下一次循环。因此"Hello, world!"只会被打印一次。

另一方面，loop循环还可以有返回值，例如：
```
fn main() {
    let target = 10;
    let mut sum = 0;
    let mut counter = 1;

    let result = loop {
        sum += counter;

        if sum >= target {
            break counter; // The value of counter will be returned from the loop as a result
        }

        counter += 1;
    };

    println!("The first number whose sum of all previous numbers is greater than or equal to {} is {}.", target, result);
}
```
上面的例子中，当sum大于等于target时，counter就会作为loop的返回值，返回给result。

### while

前面介绍的loop是一个无限循环，那么如果我想要像if那样加个条件呢？这时候可以使用while。用法如下：
```
while condition {
    // code to execute while the condition is true
}
```
每次循环开始前，会检查condition是否为true。如果为true，循环就会执行。循环执行完一遍之后会再次检查condition的值，仍然为true就再次执行。如果循环下去，直到condition的值为false为止。

需要注意的是，使用loop配合if，break等关键字也能实现相同的功能。但是用了while之后，程序会显得简洁很多。
### for

Rust中还存在第三种循环方式：for。for循环通常用于访问集合，例如一个数组。考虑下面这个例子：
```
fn main() {
    let numbers = [1, 2, 3, 4, 5];
    let mut index = 0;

    while index < numbers.len() {
        println!("The value is: {}", numbers[index]);
        index += 1;
    }
}
```
这段代码尝试使用while循环访问numbers数组，每个循环开始需要判断index是否达到了numbers.len()，每个循环内还需要对index自加1。如果改成for循环该怎么写呢？
```
fn main() {
    let numbers = [1, 2, 3, 4, 5];

    for number in numbers {
        println!("The value is: {}", number);
    }
}
```
可以看到通过for循环的方式，就可以直接从数组内获取到number来使用了。比起手动去检查循环的条件，for循环的方式更不容易出错。

for循环还能够对一个range进行循环，例如：
```
fn main() {
    for x in 1..=3 {
        println!("x: {}", x);
    }
}
```
这里的1..=3表示[1,3]这个区间的整数。如果是左闭右开，要写成1..3。

这里还要提前卖个关子，等我们在下一节学习完了所有权和借用的相关知识之后，还会回头再来聊聊for循环的写法。

### labels

前面已经介绍了Rust中循环的三种方式loop，while，for，也介绍了break和continue关键词的使用。然后当循环存在嵌套关系时，break和continue只会对最内层的循环生效。但是有时候我们希望可以对外层的循环做break或者continue，这时该怎么办？幸运的是，Rust可以给循环加上标签，从而break和continue都可以直接操作标签。我们举例来说明：
```
fn main() {
    let x = 1;

    'outer: loop {
        let mut y = 1;

        'inner: loop {
            if y == 3 {
                y += 1;
                continue 'inner; // Skips to the next iteration of the 'inner loop
            }

            println!("x: {}, y: {}", x, y);

            y += 1;

            if y > 5 {
                break 'outer; // Breaks out of the 'outer loop
            }
        }
    }
}
```
在本例中，我们创建了两层loop循环，并且分别用'outer和'inner来标记这两个循环。注意这里标签的语法，要用单引号'开头。在inner循环中，当y等于3时，会直接加一然后跳到下一次的inner循环。因此第13行的打印命令永远不会产生y为3的输出。当y的值大于5时，就会执行18行的break 'outer直接跳出'outer这个循环。

前面介绍过break可以带上返回值，这一点甚至可以与label一起使用。稍微修改下上面的例子：
```
fn main() {
    let x = 1;

    let z = 'outer: loop {
        let mut y = 1;

        'inner: loop {
            if y == 3 {
                y += 1;
                continue 'inner; // Skips to the next iteration of the 'inner loop
            }

            println!("x: {}, y: {}", x, y);

            y += 1;

            if y > 5 {
                break 'outer y; // Breaks out of the 'outer loop
            }
        }
    };
    println!("z: {}", z);
}
```
这里的break 'outer y，就会返回y的值赋给z。

当然了，不只是loop可以添加label，另外两个关键字也是一样的，例如：
```
fn main() {
    'outer: for x in 1..=3 {
        for y in 1..=5 {
            if y == 3 {
                continue 'outer; // Skips the current iteration of the 'outer loop
            }

            if x == 2 && y == 4 {
                break 'outer; // Breaks out of the 'outer loop
            }

            println!("x: {}, y: {}", x, y);
        }
    }
}
```
