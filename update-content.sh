#!/bin/bash
#

# Remove Old Content
rm -rf ./assets ./content

# Sync Content
python3 ./obsidian_sync.py

# Stage Updates
git add .

# Commit Updates
git commit -m "update content."
git push

