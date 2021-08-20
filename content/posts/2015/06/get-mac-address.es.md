---
title: "Obtener la dirección MAC local en C/C++"
description: "Cómo obtener la dirección de hardware del adaptador de red en C/C++ (Linux)"
date: 2015-06-23
slug: "obtener-direccion-adaptador-red-mac-cpp"
tags:
- linux
- cpp
---

Este extracto de código muestra cómo obtener a dirección de hardware del adaptador de red en C/C++ en sistemas POSIX.
Debería funcionar también en Windows, usando Cygwin o similar.

{{< highlight cpp >}}

#include <netdb.h>
#include <unistd.h>
#include <string.h>
#include <sys/fcntl.h>
#include <sys/errno.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <net/if.h>
#include <stdio.h>
  
int main(int argc, char ** argv) {
  struct ifreq ifr;
  int s;
  if ((s = socket(AF_INET, SOCK_STREAM,0)) < 0) {
    perror("socket");
    return -1;
  }
  
  strcpy(ifr.ifr_name, argv[1]);
  if (ioctl(s, SIOCGIFHWADDR, &ifr) < 0) {
    perror("ioctl");
    return -1;
  }
  
  unsigned char *hwaddr = (unsigned char *)ifr.ifr_hwaddr.sa_data;
  printf("%02X:%02X:%02X:%02X:%02X:%02X\n", hwaddr[0], hwaddr[1], hwaddr[2], hwaddr[3], hwaddr[4], hwaddr[5]);
  close(s);
  
  return 0;
}
{{< / highlight >}}