---
title: TCP/IP High-Level Protocol Debugging (Part 1)
description: Windows Socket testing tool
date: 2008-06-21
slug: "tcp-ip-high-level-protocol-debugging-1"
type: post
---

## The idea
When developing a TCP/IP related application, programmers usually face the lack of a proper debugging tool.
Since most of the times the programmer must build both client and server applications, starting a development can be a painful task, especially if it is the first networking development.
Even for an experienced programmer, having a TCP/IP debugging tool is a useful help for testing purposes.

As a programmer strongly involved in networking applications, I have faced this problem many times.
Maybe too many times, therefore two months ago I decided to start developing a solution for this problem, TCP/IP Builder.

## TCP/IP Builder as a debugging tool
If you have used TCP/IP Builder (windows open source tool) before reading this document, you could be asking yourself why do I call it a debugging tool.
Well, it is not a debugging tool from a strict point of view.
Anyway, it is used as a debugging tool 90% of the time.
To be more specific I would like to say it is a 'Black Box' debugging tool, because it doesn't need internal information about the application being debugged.
It will work as long as the application uses sockets to communicate with the outside world. (And as long as you know how to 'talk' with this application, of course).

## Using TCP/IP Builder

### TCP Protocol
TCP is a connection-oriented protocol, it means communication occurs between two actors.
When this communication starts, one of these actors must 'place a call' to the other one.
This defines two different roles, client (place a call) and server (listen for a call).
TCP/IP Builder may play either client or server role.
It may behave as a client to debug a server application or it may behave like a server to debug a client application.
If you have used netcat in Linux, you will be familiar with this concept.

TIP: If you have to choose between two applications with similar features and maturity level, prefer open source tools whenever it's possible.

Let's start with the simplest scene: using TCP/IP Builder to debug a TCP/IP standard server a application.
First of all, we will need a server application to debug. We are going to use a SMTP server (Simple Mail Transfer Protocol) because they are very common in Internet and your ISP should be providing one for you.

1. Get an SMTP server IP address.
1. Start TCP/IP Builder.
1. Find out which local IP to use. Click 'System Info...' and look which IPs you have on your machine (Under Computer Info). Depending on your system configuration you may have several IP addresses. You have to use one belonging to the same net of the SMTP IP address unless your machine is in a network with a gateway with NAT (let's say transparent internet access).
1. Fill the Local IP field with the desired IP leaving Local port field with a value of 0 (zero) for automatic free port selection.
1. Select TCP, then click 'Create Socket'.
1. You have created a socket associated with the local IP you selected and the Local port field should be showing the selected port.
1. Type in the STMP server IP in the IP field of Connection Setup section and use 25 as Port value. (Standard STMP servers must listen for connections on this port).
1. Click 'Connect'. If everything went ok, you should get the SMTP welcome on the Receive data section. [ie: "220 mail.demo.com ESMTP Sendmail 8.9.3/8.8.7; Mon, 10 Jun 2002 12:22:04 -0300"]
1. Write "HELO my.domain.com" in your Send data section followed by Enter key (carriage return), then click 'Send' button.
1. You will receive the Hello answer. [ie: "250 mx.tributech.com Hello 22.333.44.55 [22.33.44.55] (may be forged), pleased to meet you"]
1. Write "MAIL FROM: me@domain.com" in your Send data edit control followed by Enter key (Remember the content of this edit control is not modified by the TCP/IP Builder, therefore you have to pay attention to any carriage return already present in the control. You may use the 'X' button to clear the control content any time you need). Click 'Send' button.
1. You will receive a Sender ok message [ie: "250 me@domain.com... Sender ok"] unless this SMTP is configured not to relay in which case you can only use a sender address allowed by this SMTP.
1. Write "RCPT TO: myreal@address.com" in your Send data edit control followed by Enter key. Be sure to replace "myreal@address.com" with your real email address in order to receive the mail being sent.
1. You will receive a Recipient ok message [ie: "250 myreal@address.com... Recipient ok"]
1. Write "DATA" in your Send data edit control followed by Enter key.
1. You will receive a message to start sending the email data [ie: "354 Please start mail input."]
1. Write any data you want to send (you may use several lines) [ie: "This is the body of my mail"]
1. You may keep sending data to build the body of the mail, whenever you want to stop sending data, write "." followed by Enter key. Be sure this dot is behind a previous carriage return, if not place a carriage return before the dot.
1. You will receive a mail queued message [ie: "250 Mail queued for delivery."]
1. Write "QUIT" followed by Enter key and send. You will receive a Good by message like "221 Closing connection. Good bye."

Check you mail, you should receive the mail you sent to your real email address.
Some STMP servers take some time to deliver emails so be patient.
Taking a look at what we have done, we realize that debugging a STMP server involves two skills.
Knowing how to connect to a server using sockets and how to 'talk' to this specific server.

TCP/IP Builder allows you to connect to a server using sockets.
You have to know how to talk with the server. In our previous test we have talked to a SMTP server.
All data sent to the server is specified in the SMTP specification.
You can find it at http://rfc.net/rfc821.html

When debugging an application using TCP/IP Builder, you have to know how to talk to the application.
You have to know what data send, what data you may receive upon sending data, etc.
This is the high-level protocol, sockets are a lower level protocol and our talk takes place over it.
Socket communication takes place over other protocols, in this case it does over TCP and TCP takes place over IP and so on.
You may go deeper into low-level protocols until you reach the hardware involved in this communication.
In this article we just want to pay attention to the sockets protocol and those above it.

That's about all for the present article, I will be back with other kind of debugging in future article parts.
Coming next "TCP client debugging" in part two of this article.
Where TCP/IP behaves like a server.