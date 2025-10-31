#!/bin/bash
#

# Sync Content
python ./obsidian_sync.py

# Upload to git
git add .
git commit -m "update content."
git push
