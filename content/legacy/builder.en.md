---
title: TCP/IP Builder
description: Windows Socket testing tool
date: 2009-01-21
slug: "tcp-ip-builder"
type: page
---

## Description
TCP/IP Builder is a Windows Socket testing tool.
You will be able to create a socket manually, connect it (or listen for connections), send and receive data through it.

You may setup local IP and Port, TCP/UDP protocol, keep alive, out-of-band data, DNS Resolver, System info, on-line help, RAW Packet Detail.

![TCP/IP Builder](/images/legacy/builder.png)

## New in 1.9.1
* Updated project to newer Windows versions.

## Features
* Act as client or server.
* Select local IP address and port.
* Listen on any given IP and port, and reuse address if needed
* Build TCP or UDP sockets.
* Detect remote IP address and port on incoming UDP packets.
* Send and receive normal and Out of Band data.
* Use 'keep-alive', 'no-delay' and 'broadcast' socket options.
* View incoming data in Hexadecimal representation.
* Send arbitrary bytes by writting its ASCII number.
* ASCII parser option for writting bytes in the format `0x<nn>` (i.e: 0x4F)
* Resolve IP addresses usign DNS.
* IP, Protocol, Port and send flags configuration is persistent now.
* TCP/IP Builder is open source, under GNU General Public License.

## Downloads
[Builder.msi](/downloads/legacy/builder/Builder.msi) - TCP/IP Builder 1.9.1

Download and execute Builder.msi

[Get source code](https://github.com/drkblog/tcp-ip-builder)

## Other stuff

[TCP/IP High-Level Protocol Debugging - Part 1](/en/legacy/tcp-ip-high-level-protocol-debugging-1) - TCP/IP Builder Related document.

[TCP/IP High-Level Protocol Debugging - Part 2](/en/legacy/tcp-ip-high-level-protocol-debugging-2) - TCP/IP Builder Related document.