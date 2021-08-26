---
title: TCP/IP High-Level Protocol Debugging (Part 2)
description: Windows Socket testing tool
date: 2008-06-25
slug: "tcp-ip-high-level-protocol-debugging-2"
type: post
---

We have talked about high-level protocol debugging in the first part of this article.
We have described steps to debug a server application using TCP/IP Builder open source tool.
In this part we will describe how to use it for debugging a client application.

This time I will try to focus on how to use TCP/IP Builder and not in the high-level protocol's facts.
Therefore, I have chosen a simpler application case.

## Using TCP/IP Builder for client debugging
Assume we have a mail client application (i.e.: Outlook Express) configured for downloading mail from a POP3 account.
This account is working normally and we are able to receive mail for this mailbox address but we do not have the password for this account.
We can receive mail because our mail client holds our passwords in its database but we can't recover it because it is encrypted.

We can use TCP/IP Builder to act as POP3 server in our own workstation, then configure our mail client to download mail for this account from our own IP address.
When our client tries to authenticate, it will send username and password to the server (actually to TCP/IP Builder).
All we have to do is send messages to our client application as if we were a POP3 server.

1. Start TCP/IP Builder.
1. Fill in your local IP in the 'Local IP' field and Local port with a 110 value. (110 is the standard port for POP3 protocol)
1. Chose TCP and then, Create Socket.
1. To make TCP/IP Builder to 'listen' for connections click 'Listen' button.
1. Your receive data section will show this message: 'Listening for connections...' if all went ok.
1. Start your mail client. (I will assume you already have an account, if not please configure an hypothetical one)
1. Change your client configuration to make it use your local IP address as the POP3 server address.
1. Make you client to check for new messages.
1. By this time, your mail client should be connected to TCP/IP Builder. You will see: 'Listening for connections...Connected'
1. The POP3 client will wait for the server greeting message: Write '+OK FAKE POP3 server ready' followed by Enter key, then click Send button.
1. The client application will send username upon +OK message reception. The username comes in the following format: USER <username>
1. We must reply with '+OK User name accepted, password please' in order to receive the password. It will come in the PASS <password> format.
1. At this time we have got the password for this mail account. Usually a POP3 server will send the '+OK Mailbox open, 0 messages' message where 0 will be the number of messages in this mailbox.

If you want to know about the Post Office Protocol Version 3 (POP3) you can get the full specification at http://rfc.net/rfc1939.html