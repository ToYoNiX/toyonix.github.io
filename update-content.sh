#!/bin/bash
#

# Remove Old Content
rm -rf ./assets ./content

# Sync Content
python ./obsidian_sync.py

# Stage Updates
git add .

# Commit Updates
git commit -m "update content."
git push

