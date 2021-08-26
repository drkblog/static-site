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

As far as I know these all have differences but also similarities and based on my experience each language or tool out there uses a different one or even their own variation. I never tried to learn each of them. I've used **PRCE** (Perl Compatible Regular Expressions) for years and I've always managed to work out the other ones when needed by reading the reference. Because of that I won't go into more detail about standards and I'll use regex that work in **Java** for this article because a lot of content on my site refers to **Java**.

In order to follow this post I strongly recommend you to have a tool for testing the knowledge you acquire as you go. If you want to lear them for a specific tool you might want to use that. But you may find out the standard your tool supports is different than the one I use here. You can lookup "online regex" in Google and you will get a lot of options. Use the one you like the most.

## Let's get started

In Perl you have to write regex enclosed in slashes like `/[0-9]+/` which implies nothing before the first slash and after the last one is part of the regex. You may add up to seven flags after the last slash `/[0-9]+/gmisxuU` where, for example, `m` stands for multiline and will allow the regex to match mora than one line (which is not the default). Some tools or languages make this slashes optional and let you pass the flags though another channel.

### Simplest regex

The simplest regular expression you can write is just a literal matcher. A regex will match literally if you write anything that is not meaningful for the regex engine. If you want to match the word example you can write `/example/` and it would match the word in a string like `"This is an example"`