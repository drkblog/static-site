---
title: Stop fearing the regex! - Part 2
author: Leandro Fernandez
type: post
date: 2021-09-06
cover: "/2021/08/yesterdays-regex.jpg"
categories:
  - Programming
tags:
  - regex
  - java
---

In the first [post about regular expressions]({{< relref path="/content/posts/2021/08/regex.en.md" lang="en" >}}) we've explained how it is possible to write a regex matching specific characters (or character group/type) at certain position. In a way that makes it very easy to write a **regex** that finds an `x` followed by a white space, followed by a `y`. But what if we need to find an `a` followed by four to six decimal digits, followed by a `b`. That is also possible and we are going to see how to do it now.

---

### Match a variable number of characters

With the knowledge we've acquired so far we are forced to specify what we want in each position for the character sequence we want a match. But if we want a regex that would match variable names in a Java code snippet there is no way to know beforehand how many characters a name will have. Let's use the following sample code: 

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

In order to design a regex we need to carefully observe what the context of whatever we are trying to match is. A variable name (specifically in the snippet we have as an example) is a lower-case character sequence of any length. If that condition was enough (it s not but for the example's sake) we could write `/\w+/`. We already know `\w` matches any word character. The plus sign is a quantifier meaning one or more matches. Which implies it would match:

- `a` in `2a3`
- `aa` in `2aa3`
- `abcde` in `*abcde-`

We don't need to write `\w` one, two or five times. We can use the `+` symbol to express we accept any number of characters (but at least one). And we can apply the quantifier to literals. `/x+y+z+/` will match set of `x`, followed by a set of `y`, followed by a set of `z` like `xyz` or `xxxyyzzzz` but not `xzz` because there is no `y` between the `x` and the `z` sets.

Going back to the example, if we use this **regex** in the code snippet above it will match any sequence of word characters. Besides the thee variable names `value`, `text` and `map` it will also match `new`, `condition` and anything else. Our regex is too permissive yet.

In order to restrict what the regex will match we'll have to specify what characters are allowed around the sequence (I call them _the context_). Taking a look to the code we realize there is always a white space before the variable name. But this is not enough as that is also true for `HashMap` and `new`. We can also limit the character following the name to a semicolon or a white space evolving our regex to `/\s\w+[\s;]/`. We'll have less unwanted matches than before but still some wrong ones like `new` and `String`. Since they are surrounded by white spaces (remember we consider a tabulation `\t` to be a white space too). Before going further let me clarify what the brackets are for.

- Our regex last version starts with a `\s` with no quantifier, which will match exactly one white space.
- Then the `\w+` will match one or more word characters.
- And `[\s;]` without a quantifier. This will match exactly one white space or a semicolon but not both.

This new structure (one or more literals enclosed inside brackets) matches any of the literals in that position but just one of them. Unless there is a quantifier after the brackets. Meaning `/[xyz]/` will match just the `y` in `ayzzza`. In order to match the three `z` we should add a quantifier like `/[xyz]+/`. To learn more quantifiers go to the [common quantifiers table](#common-quantifiers).

### More about brackets

Even though we don't need this to keep evolving the regex for the example we are trying to solve, it is worth sharing some more brackets use cases. We've used them as a list of literals or [meta sequences]({{< relref path="/content/posts/2021/08/regex.en.md#some-commonly-used-meta-sequences" lang="en" >}}) but we can also put ranges inside them.

If we needed to capture an unknown date with English format `MM-DD-AAAA` where we use two digits for the month, two for the day, and four digits for the year. And also knowing the dates will be at least from year 2000, we could write `/[01]\d-[0-3]\d-[2-9]\d{3}/` where we are allowing a zero or one followed by any digit for the month, zero, one, two or three followed by any digit for the day and any digit from 2 to 9 followed by three digits for the year.

We use the fact that months will start with zero or one and days will start with anything from zero to three to limit the first digit fo the month and the day. We do the same with the year based on the fact that we were told the list won't have years before 2000 to exclude zero and one from the possible year's first digit.

Ranges admit any characters as start and end. A regex like `/[0-9a-f]{2}/` will match an hexadecimal, zero padded, two-digits number like `e2` or `38`. It won't admit `F3` because **regex** are case-sensitive by default. We can fix that like this: `/[0-9a-fA-F]{2}/`.

### Let's finish up our regex evolution

We reached the point where `/\s\w+[\s;]/` was matching the variable names but still including some extra words. We need to add more context to the regex to exclude those extra matches. Just like we limited the character allowed to appear before the variable name we can limit the one that appears before that one. Taking a look to `value`, `text` and `map` in the sample code:

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

We see before the space there is always an alphabetic character o the greater than symbol. We can use brackets again to express this matching: `/[a-z>]\s\w+[\s;]/`. With that it won't match `new` anymore because there is an equal symbol before the heading space which is not allowed by `[a-z>]`. For `value` and `text` there is a word character in both cases (a `t` and a `g`) and there is a `>` before the space in `map` so this will also match. Those are the three matches we wanted since the beginning. It is worth noting that this extra context we are adding is just part of what the regex will match. We are not telling the regex engine these characters are different from those in the variable name in any way. If we use this regex for replacing the variable name it won't work properly because it is matching more than just the name. Let's say we use it in a text editor and we replace with `xyz` we end up with:

{{< highlight java >}}
...
inxyz= 1;
Strinxyz

if (condition.equals("value")) {
  HashMap<Integer, Stringxyz= new HashMap();
}
...
{{< /highlight >}}

Take a minute or two to understand by yourself exactly what happened there.

Since the context is just part of our matching, the text editor is removing those character along with the variable name and replacing all that part with `xyz`. The `t` and the white space before `value` and the trailing white space were replaced leaving us with `inxyz= 1;`. We will learn how to deal with this situation in the following post.

> **Warning:** The regular expression we ended up with is useful for matching variable names in the code snippet we took as example. But it would miserably fail if we wanted to use it with a larger Java code because there are other scenarios where a variable name may appear and we haven't took them into account. Also we don't know if `condition` in the snippet is a variable or not. I just decided to leave it out for the sake of simplicity.

#### Common quantifiers

| Quantifier | Meaning |
| --- | --- |
| `?` | Zero or one |
| `*` | Zero or more |
| `+` | One or more |
| `{n}` | Exactly n (For example `{4}`) |
| `{n,}` | n or more (For example `{2,}`) |
| `{n,m}` | Between n and m (`{3,5}` will match between 3 and 5 characters) |


## Wrap up

We've lerned how to express a variable quantity of characters for a certain position in our **regex**. We also experimented the evolution of a regular expression that allowed us to match words in a certain context (specific characters before and after it). But we also know the context is considered part of the matching y we might need to avoid that. We know it is possible and we'll learn how to do it in the next post.

---
[Image from geek-and-poke.com](https://geek-and-poke.com/geekandpoke/2013/12/3/yesterdays-regex) under license [CC-BY3.0](https://creativecommons.org/licenses/by/3.0/) reformatted for this site.
