---
title: "UTF-8 string character count in C/C++"
description: "How to hanlde UTF-8 in C/C++ which lacks of native support"
date: 2015-07-23
slug: "count-characters-in-utf8-string-cpp"
tags:
- cpp
---

The following code defines, tests and illustrates the use of **utf8len()** function.
Which is a small piece of code for counting characters in UTF-8 (multibyte) string.

Compile this example with GCC by running: `$ gcc utf8len.c -lrt -o utf8len`

The RT library is used for the high precision clock only, you don't need to link it if you are using the function itself into your own code.
This **utf8len()** function provides a portable (and small footprint) way of counting UTF-8 charactes in standard C or C++.
This test source code has UTF-8 characters, you have to check the source file doesn't get corrupted when copy/pasting the code.
Average time for functions have a small overhead from the for loop. But the overhead is the same for both tests.

{{< highlight cpp >}}

#include <stdio.h>
#include <string.h>
#include <time.h>
 
#define STRINGS 8
#define TIMES 1000000
 
// Be sure your locale is set to "en_US.UTF-8" or whatever language with UTF-8
 
size_t utf8len(const char *s);
void print_diff(const char *func, int times, struct timespec *s, struct timespec *e);
 
const char * list[] = {"english", "español", "עברית", "Ελληνικά", "Українська", "한국어", "ﻑﺍﺮﺳی", "日本語"};
 
int main(int argc, char ** argv)
{
  int i;
  struct timespec start, end;
 
  for(i=0; i < STRINGS; ++i)
    printf("%s\nstrlen(): %zu \t utf8len(): %zu\n", list[i], strlen(list[i]), utf8len(list[i]));
 
 
  clock_gettime(CLOCK_REALTIME, &start);
  for(i=0; i<TIMES; ++i)
    strlen(list[i%STRINGS]);
  clock_gettime(CLOCK_REALTIME, &end);
  print_diff("strlen", TIMES, &start, &end);
 
  clock_gettime(CLOCK_REALTIME, &start);
  for(i=0; i<TIMES; ++i)
    utf8len(list[i%STRINGS]);
  clock_gettime(CLOCK_REALTIME, &end);
  print_diff("utf8len", TIMES, &start, &end);
 
  return 0;
}
 
 
size_t utf8len(const char *s)
{
  size_t len = 0;
  while(*s)
    len += (*(s++)&0xC0)!=0x80;
  return len;
}
 
// Aux
 
void print_diff(const char *func, int times, struct timespec *s, struct timespec *e)
{
  printf("Average %s time was: %6.3f nanoseconds\n", func, ((double)((e->tv_sec-s->tv_sec)*1000000000 ) + (e->tv_nsec-s->tv_nsec)) / times);
}
{{< / highlight >}}