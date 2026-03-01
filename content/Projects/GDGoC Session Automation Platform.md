---
title: GDG Session Automation App
date: 2026-03-01
description: Automated processing and uploading of large session recordings.
tags:
  - Backend
  - Automation
  - Docker
featured: true
---


A backend automation system that processes, compresses, and uploads large session recordings automatically to YouTube — eliminating manual work and saving hours per event.

#### The Problem

At our university’s Google student activity, we use Bevy — Google’s official event management system — to organize sessions, manage attendance, and send emails.

It works great. There’s no session time limit like the free version of Google Meet, and recordings are generated automatically in high quality.

But there was a major issue:

- Recordings were 2–5 GB each
    
- No option to reduce quality
    
- No automatic upload to platforms like YouTube or OneDrive
    
- Everything had to be done manually
    

After every session, someone from the team (usually the activity lead) had to:

1. Download the recording
    
2. Compress it using tools like HandBrake
    
3. Re-upload it to YouTube or cloud storage
    

Even after compression (e.g., 3GB → 500MB), the process could take over an hour per session.

It was repetitive, time-consuming, and inefficient.

We needed automation.

#### Initial Approach (And Why It Failed)

I first attempted to build a cloud automation workflow using n8n.

While promising, it had two major limitations:

- Files were processed in RAM instead of disk storage (requiring high-memory servers)
- Files larger than 2GB were unstable and prone to crashing

This made it unsuitable for large session recordings.

#### The Solution

Instead of patching the problem, we decided to build a dedicated system from scratch.

I developed a custom backend automation platform using:

- Node.js
    
- Express.js
    
- TypeScript
    
- htmx (for lightweight dynamic frontend interactions)
    
- Docker (for containerized deployment)
    
- CI/CD for streamlined updates
    

The system:

- Accepts a recording link
    
- Downloads the file safely
    
- Compresses it
    
- Uploads it automatically to YouTube
    
- Organizes uploads properly
    

All with minimal manual intervention

#### Impact

- Successfully processed and uploaded 90+ session recordings
    
- Eliminated repetitive manual work
    
- Saved hours of internet bandwidth and processing time
    
- Reduced human dependency and operational overhead
    
- Used actively by the university’s GDG chapter
    

Uploads are publicly visible on the activity’s YouTube channel:  
👉 GDG on Campus MUST  
[https://www.youtube.com/@GDGoCMUST](https://www.youtube.com/@GDGoCMUST)

#### Technical Highlights

- Handles large file streaming safely
    
- Designed to avoid high memory consumption
    
- Containerized with Docker
    
- Production deployment on a cloud server
    
- CI/CD enabled for easy iteration
    
- Fully open-source
    

#### Open Source

The project is completely open source and available on GitHub:

[https://github.com/ToYoNiX/gdgoc-automation](https://github.com/ToYoNiX/gdgoc-automation)

Contributions are welcome.
