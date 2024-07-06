---
title: Javascript event loop
description: What is the Javascript event loop and how it works
author: Leandro Fernandez
type: post
date: 2024-06-29
slug: javascript-event-loop
# cover: "/2023/09/redflag.jpg"
categories:
  - Programming
tags:
  - programming
  - javascript
---

The JavaScript event loop is a fundamental concept that allows JavaScript to perform non-blocking operations, even though it is single-threaded. The event loop continuously checks the call stack and the message queue. If the call stack is empty, it takes the first event from the queue and pushes its associated callback onto the call stack for execution.

Here's a simple example to illustrate how the event loop works:

{{< highlight javascript "linenos=table" >}}
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');
{{< /highlight >}}

### Explanation:

1. **Call Stack**: JavaScript has a call stack, which is a data structure that keeps track of function calls. When a function is called, it is pushed onto the stack. When the function returns, it is popped off the stack.

2. **Web APIs**: Functions like `setTimeout` are provided by the browser (or Node.js) and are not part of the JavaScript engine itself. When you call `setTimeout`, the browser starts a timer in the background.

3. **Callback Queue (Message Queue)**: When the timer expires, the callback function is placed in the callback queue. Similarly, when a Promise is resolved, its `.then()` callback is placed in the microtask queue.

4. **Event Loop**: The event loop continuously checks the call stack to see if it is empty. If the call stack is empty, it checks the callback queue and microtask queue. If there are callbacks in the queue, it pushes the first one onto the call stack for execution.

### Execution Flow:

1. `console.log('Start')` is called and pushed onto the call stack. It prints "Start" and is then popped off the stack.
2. `setTimeout` is called with a delay of 0 milliseconds. The browser starts the timer and the `setTimeout` function is popped off the stack.
3. `Promise.resolve().then()` is called. The Promise is resolved immediately, and its `.then()` callback is placed in the microtask queue.
4. `console.log('End')` is called and pushed onto the call stack. It prints "End" and is then popped off the stack.
5. The call stack is now empty. The event loop checks the microtask queue first and finds the Promise callback. It pushes the Promise callback onto the call stack.
6. The Promise callback prints "Promise callback" and is then popped off the stack.
7. The call stack is empty again. The event loop checks the callback queue and finds the `setTimeout` callback. It pushes the `setTimeout` callback onto the call stack.
8. The `setTimeout` callback prints "Timeout callback" and is then popped off the stack.

### Output:

```
Start
End
Promise callback
Timeout callback
```

This example demonstrates how the event loop handles asynchronous operations, ensuring that the JavaScript runtime remains non-blocking and efficient.