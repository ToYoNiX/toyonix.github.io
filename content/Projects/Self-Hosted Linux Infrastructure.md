---
title: Self-Hosted Linux Infrastructure
date: 2026-03-01
description: Production-style Linux server running 13 containerized services behind a secure reverse proxy with automated SSL and firewall hardening.
tags:
  - Linux
  - Docker
  - DevOps
  - Infrastructure
  - Self-Hosting
featured: true
---

Designed and managed a self-hosted Linux infrastructure running 13 containerized services behind a secure reverse proxy with automated SSL and network isolation.

I designed and maintain a self-hosted Linux server running 13 containerized services using Docker.

The setup includes:

- Reverse proxy management with Nginx Proxy Manager
- Domain-based routing
- Automatic SSL certificates via Let's Encrypt
- Isolated Docker networks for secure service communication
- Firewall configuration and server hardening
- Persistent volumes and container lifecycle management

This environment allows me to simulate production-level deployment workflows and continuously experiment with open-source technologies.

#### Infrastructure Stack

- OS: Debian Linux
- Containerization: Docker & Docker Compose
- Reverse Proxy: Nginx Proxy Manager
- SSL: Let’s Encrypt
- Networking: Custom Docker bridge network for proxy isolation
- Security: UFW firewall configuration
- Domain routing with DNS configuration