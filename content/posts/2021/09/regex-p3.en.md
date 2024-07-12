---
title: Stop fearing the regex! - Part 3
author: Leandro Fernandez
type: post
date: 2021-09-11
cover: "/2021/09/xkcd-1171.png"
categories:
  - Programming
tags:
  - regex
  - java
---

In the [previous post about regular expressions]({{< relref path="/posts/2021/09/regex-p2.en.md" lang="en" >}}) we explained how to express a variable number of characters at certain position in our **regex**. And how to write a regex that would allow us to capture words inside a context (specific characters before and after the word). But we've seen that context is considered part of the matching by the regex engine and we need to avoid that. Let's see how to solve that issue.

---

## Capture groups

While writing a **regex** we can specify part of it as a capture group. This won't change what the regex will match within the input text. But will allow us to access those grouped matching portions independently. We will be able to get a character subset from the total of characters matched. In our previous post we used the regex  `/[a-z>]\s\w+[\s;]/` to find variable names in a Java code snippet. But that regex was matching some character before and after the variable name. Meaning that if we used a replacement expression it would replace more than just the variable name. For a line like `int value = 1;` it would match `t value ` where the heading `t` and two white spaces are not part of the name. Declaring capture groups we can keep using the regex we know is matching the correct cases but the replace only part of it.

### How to use them in replacements

We start here because this is the most common use for them taking into account **regular expressions** usage with programming and tools supporting them. A good text editor will allow us to use regex to find and replace. In that case the capture groups are useful only when replacing. But when we use regex in programming we can benefit from capture groups both while searching and replacing.

[In the first post]({{< relref path="/posts/2021/08/regex.en.md" lang="en" >}}) I said a regex is always enclosed within two slashes. But that is not true. To write a replacement regular expression we use three slashes. We start with a regex just like we know them and then we add the replacement and a final slash like `/regex/replacement/`. In WYSWYG text editors we usually have a field for the replacement in the UI so we don't use this form.

At the end of this series' second post we replaced (or actually we tried to replace) the variable names in this snippet with the **regex** in the previous paragraph. That would be the same as using this replacement regex `/[a-z>]\s\w+[\s;]/xyz/`:

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

And then we get this brutal replacement. Since the whole matched sequence gets replaced:

{{< highlight java >}}
...
inxyz= 1;
Strinxyz

if (condition.equals("value")) {
  HashMap<Integer, Stringxyz= new HashMap();
}
...
{{< /highlight >}}

But if we use a **capture group** in order to reproduce part of what we are matching in the replacement string we can keep the context in the output. Remember we match some characters before and after the variable name. And those are being lost. We can then write this expression `/([a-z>]\s)\w+([\s;])/$1xyz$2/` and then we get:

{{< highlight java >}}
...
int xyz = 1;
String xyz;

if (condition.equals("value")) {
  HashMap<Integer, String> xyz = new HashMap();
}
...
{{< /highlight >}}

This kind of replacement makes no sense in terms of Java. But is perfect to illustrate how we use a **regex**. We declared two capture groups: one grouping character we match before the `\w+` sequence and another one grouping the character we match after the variable name (that might be a white space or a semicolon). That is the only change to the original regex beside adding the replacement part where we added  `$1` and `$2`. This is how we tell the engine we want to use whatever the first and the second capture groups matched, here. The number after the `$` symbol is the capture group index starting with 1 and numbered as they appear in the regex.

> Even though numbering capture group in the order they appear in the regex seems quite reasonable. This can turn into a mess when we start nesting them (which is totally valid and useful in many situations). In the standard I use each opening parenthesis will get the next integer index. This might not be the case in other standards. Some tools use a backslash instead of `$` so the replacement regex could be written like  `/([a-z>]\s)\w+([\s;])/\1xyz\2/` in those cases.

## Usage in search

This use case is for when we write the regex within a computer program. Here we can find variations in the supported standard and how we access the captures depending on the language. We will limit this to an example in **Java**. In many cases what we are going to see here stands also for other languages.

Let's keep using the previous **Java** code as input of our regex. We can write **Java** code for printing all the variable names in the standard output.

{{< highlight java "linenos=table" >}}
final String input = "int value = 1;\n" +
    "String text;\n" +
    "\n" +
    "if (condition.equals(\"value\")) {\n" +
    "  HashMap<Integer, String> map = new HashMap();\n" +
    "}";
String[] lines = input.split("\\R");

Pattern pattern = Pattern.compile(".*?[a-z>]\\s(\\w+)[\\s;].*?");
Matcher matcher = pattern.matcher("");
for (String line : lines) {
  matcher.reset(line);
  if (matcher.matches()) {
    System.out.println(matcher.group(1));
  }
}
{{< /highlight >}}

We define a _string_ `input` with our sample code and we split it line by line into the `lines` variable. We use the `split()` method from the **String** class which also supports regular expressions as argument. Starting with Java 8 the `\R` symbol will match a new line character independently of the platform (it would match `\r` or `\n` or both).

We create the `pattern` object based on our regex adjusted for Java. In the first place we need to escape the back slash with an extra back slash in the source code. And we need to add two meta sequences to match everything before and after because Java forces us to do so. There are other ways for solving this but I guess this one is the easiest. We use a _non-greedy_ sequence `.*?` that will match anything but will give priority to other parts of our regex first. If we used the greedy version of this sequence `.*` it would match the entire line.

Then we create a `matcher` to pass every line to it (see line 12) and we will ask whether there was a matching or not in line 13. If there was a match we will get the first capture group content in line 14. That method receives the capture group index as an argument. If we pass zero we will get the entire matching.

If we run the code above we get:

```
value
text
map

Process finished with exit code 0
```

## Wrap up

This time we learned how to declare capture groups in our regex to focus in one or more sections within our **regex**. And at the same time ignore other parts when we want to replace. We've seen we cna do this by grouping the sequences of interest inside parenthesis. And we can later use those groups when replacing or (in programming languages) once we know our regex matched to access those subsets of the whole match.

---
[Comic from xkcd.com](https://xkcd.com/1171/) under license [CC-BY-NC2.5](https://creativecommons.org/licenses/by-nc/2.5/) reformated to fit this site.
