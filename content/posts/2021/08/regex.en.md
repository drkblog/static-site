---
title: Stop fearing the regex
author: Leandro Fernandez
type: post
date: 2021-08-25
cover: "/2021/08/stop-fearing-regex.png"
categories:
  - Programming
tags:
  - regex
---

> Not kidding! Developers fear the **regex**. And yeah, I get it. They look ugly. But they are powerful.

And it is way more hard to read them than to write them. Which is not ideal. But at least you can benefit from writing a **regex** here and there. Probably document them in-code with a meaningful comment for your future self and you'll be fine. Learning to write some basic, simple yet powerful **regex** is not impossible and I'm writing this post to prove that.

## Foreword

There are at least four standards in use for **regex**:

- POSIX BRE (Basic Regular Expressions)
- POSIX ERE (Extended Regular Expressions)
- Perl
- Perl Compatible Regular Expressions

As far as I know these all have differences but also similarities and based on my experience each language or tool out there uses a different one or even their own variation. I never tried to learn each of them. I've used **PCRE** (Perl Compatible Regular Expressions) for years and I've always managed to work out the other ones when needed by reading the reference. Because of that I won't go into more detail about standards and I'll use regex that work in **Java** for this article because a lot of content on my site refers to **Java**.

In order to follow this post I strongly recommend you to have a tool for testing the knowledge you acquire as you go. If you want to lear them for a specific tool you might want to use that. But you may find out the standard your tool supports is different than the one I use here. You can lookup "online regex" in Google and you will get a lot of options. Use the one you like the most.

## Let's get started

In Perl you have to write regex enclosed in slashes like `/[0-9]+/` which implies nothing before the first slash and after the last one is part of the regex. You may add up to seven flags after the last slash `/[0-9]+/gmisxuU` where, for example, `m` stands for multiline and will allow the regex to match mora than one line (which is not the default). Some tools or languages make this slashes optional and let you pass the flags though another channel.

### Simplest regex

The simplest **regular expression** you can write is just a literal matcher. A regex will match literally if you write anything that is not meaningful for the regex engine. If you want to match the word example you can write `/example/` and it would match the word in a string like `"This is an example"` and also it will match in `"nospaceexamples"`.

You have just learnt your very first regular expression. And you may argue you don't need to learn regex in order to match a literal. You can easily write an algorithm that will find a word in a string in your programming language or you can use a tool that will let you look for a word. And that is correct. You will use a regex when your search logic is more complex. You don't want the overhead the regex engine will add if you are looking for something like a literal.

This is a very important point. Regex are expensive CPU wise. You need to be aware of that. All that power comes at some price. If you are going to use a regex inside a loop that will be executing many times per second you may want to look for an alternative.

### A more useful one

We have sene how the `/example/` regex would match the _example_ word as a character sequence in a string like `"nospaceexamples"`. What if we only want to match the example word. In the sense of a word in a text. There is a precise regex for this case but let's get to it learning as we go. We could naively add spaces before and after the work in the regex because we know literals are going to be matched. Then we would get the `/ example /` which would not match `"nospaceexamples"`. It would match `"another example here"` but what if we had tabulation characters instead of spaces. At this point the literal matching becomes useless. Regular expressions provide **meta sequences** that will match more than one character with a specific criteria. In order to match white spaces in the most general sense we can put `\s` in our regex whenever we want to match anything that can be interpreted as a white space. Changing our regex to `/\sexample\s/` will match the example word preceded and followed by one white space, or tabulation, or even a new line.

We have got our very first useful regex but it can be further improved because that one won't match `example` in strings like `an example.` or `example of`. The dot and the string boundaries are not matched as white spaces. Fortunately, there is another **meta sequence** `\b` which specifically matches word boundaries. And turning our regex into `/\bexample\b/` will do the trick. Now, you should admit programming this kind of search by ourselves is still doable but will take more than a simple sequence match.

> Up to this point we've learnt two reserved symbols for regular expressions: slash `/` and back-slash `\`. Whenever we need to match these or other reserved symbols we need to escape them using a back-slash. To match a slash or a back-slash literally we will write `/\/\\/` (remember the I'm enclosing all the regex into `/.../`).

#### Some commonly used meta sequences

| Meta sequence | Match |
| --- | --- |
| `.` | Any character |
| `a\|b` | Either `a` or `b` (literal) |
| `\s` | Any whitespace character |
| `\S` | Any non-whitespace character |
| `\d` | Any digit |
| `\D` | Any non-digit |
| `\w` | Any word character |
| `\W` | Any non-word character |

## Wrap up

This is intended to be the first of several posts covering regular expressions. Depending on when you are reading this post the follow ups might be already published or not. Let's see what we can do with what we've learnt up to now.

Take the following string as an example:

> Albert Einstein; (14 March 1879 – 18 April 1955) was a German-born theoretical physicist, widely acknowledged to be one of the greatest physicists of all time.

And let's write some regex to match arbitrary parts.

| Capture... | Regex |
| --- | --- |
| Years | `/\d\d\d\d/` |
| Days | `/\D\d\d\D/` |
| The `the` word | `/\bthe\b/` |
| Any `the` sequence | `/the/` |
| Any day in April | `/\d\d\sApril/` |
| All the words with three letters | `/\b\w\w\w\b/` |

Later we'll see many of these regex can be expressed in a more concise and flexible manner. Stay tuned.

---
[Image from xkcd](https://xkcd.com/208/)
