---
date: 2025-12-23
draft: true
title: The Right Way To Install Debian
---

In this article, we are going to install debian on **Intel or AMD CPU's based systems** how I like and note some of the stuff that you might be missing when installing it. I am going to use the **NET INSTALLER** and specifically the **EXPERT INSTALL** portion of it because of a couple of features that would be crucial for us later while installing. Just grab something to drink and I hope you a happy and reliable install!

## Getting The ISO

Before anything, Let's first download the latest installer ISO from debian website [here](https://www.debian.org/download). What we are interested in is the latest net installer and you can see it's download link in the following picture. In the time of writing this article it's 13.2.0.

![pasted-image-20251223070802.png](img/pasted-image-20251223070802.png)

Then after downloading, For a virtual machine you can skip section. But if you are installing it on bare metal bare with me! We need a flash drive to boot the installer from, well in order to install it on your system, **THE FLASH DRIVE CONTENT WOULD BE FORMATTED** So Keep that in mind. You can do the following in order to put the installer on the flash drive and boot from it:

- Burn the image onto the flash drive directly using **[balenaEtcher](https://www.balena.io/etcher)**.
- Install **[ventoy](https://github.com/ventoy/Ventoy)** on the flash drive and copy the iso to it.

For us here, I will let not talk about how to setup the flash drive since if you can't do it I am not recommending debian for you **TBH**. 

## First Boot Into The Installer

Here you would be treated with this interface