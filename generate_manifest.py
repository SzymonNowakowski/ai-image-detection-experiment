import os
import json


ROOT = "images"

OUTPUT = "manifest.json"


extensions = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
}


manifest = []


for label_dir in ["ai", "real"]:

    directory = os.path.join(ROOT, label_dir)

    if not os.path.exists(directory):
        continue

    for filename in sorted(os.listdir(directory)):

        ext = os.path.splitext(filename)[1].lower()

        if ext in extensions:

            manifest.append(
                {
                    "file": f"{ROOT}/{label_dir}/{filename}",
                    "label": "AI" if label_dir == "ai" else "REAL"
                }
            )


with open(
    OUTPUT,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        manifest,
        f,
        indent=2,
        ensure_ascii=False
    )


print(
    f"Created {OUTPUT} with {len(manifest)} images"
)
