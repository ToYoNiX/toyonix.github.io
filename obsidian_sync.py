import os
import shutil
import re
import json

# ----------------- LOAD CONFIG ------------
with open("sync_config.json", "r", encoding="utf-8") as cfg:
    config = json.load(cfg)

OBSIDIAN_NOTES = config["OBSIDIAN_NOTES"]
OBSIDIAN_ATTACHMENTS = config["OBSIDIAN_ATTACHMENTS"]
HUGO_CONTENT = config["HUGO_CONTENT"]
HUGO_IMAGES = config["HUGO_IMAGES"]

# sync_config.json -> Create one and configure it as you like
"""
{
  "OBSIDIAN_NOTES": "/path/to/obsidian/notes",
  "OBSIDIAN_ATTACHMENTS": "/path/to/obsidian/attachments",
  "HUGO_CONTENT": "/path/to/hugo/content",
  "HUGO_IMAGES": "/path/to/hugo/static/img"
}
"""

# ------------------------------------------

IMAGE_PATTERN = r"!\[\[(.*?)\]\]"

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def convert_embed(filename):
    # Remove resizing or alias (e.g. file.png|200 → file.png)
    clean = filename.split("|")[0]
    return f"![{clean}](img/{clean})"  # Edit if your Hugo path differs

def normalize_filename(filename):
    name, ext = os.path.splitext(filename)
    name = name.replace(" ", "-").lower()
    return name + ext.lower()

def process_markdown_file(src, dst):
    with open(src, "r", encoding="utf-8") as f:
        content = f.read()

    images_found = re.findall(IMAGE_PATTERN, content)

    for img in images_found:
        img_file = img.split("|")[0]
        normalized = normalize_filename(img_file)

        source_img = os.path.join(OBSIDIAN_ATTACHMENTS, img_file)
        dest_img = os.path.join(HUGO_IMAGES, normalized)

        if os.path.exists(source_img):
            ensure_dir(HUGO_IMAGES)
            shutil.copy2(source_img, dest_img)
            print(f"Copied image: {img_file} → {normalized}")
        else:
            print(f"⚠️ Image not found: {img_file}")

        content = content.replace(f"![[{img}]]", convert_embed(normalized))

    with open(dst, "w", encoding="utf-8") as f:
        f.write(content)

def sync_notes():
    for root, _, files in os.walk(OBSIDIAN_NOTES):
        for file in files:
            if file.endswith(".md"):
                src = os.path.join(root, file)

                # Keep folder structure intact
                rel_path = os.path.relpath(src, OBSIDIAN_NOTES)
                dst = os.path.join(HUGO_CONTENT, rel_path)

                ensure_dir(os.path.dirname(dst))
                print(f"Processing note: {rel_path}")

                process_markdown_file(src, dst)

    print("\n✅ Sync complete — folder structure preserved!")

if __name__ == "__main__":
    sync_notes()
