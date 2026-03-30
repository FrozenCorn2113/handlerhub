#!/usr/bin/env python3
"""
HandlerHub logo generation via Gemini 2.0 Flash image generation.
"""

import os
import base64
import json
import urllib.request
import urllib.error

API_KEY = "AIzaSyCDftPI6sI5J2f5AIuUIgk5vtEh7idflOA"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={API_KEY}"
OUTPUT_DIR = "/Users/bcarter/HandlerHub/public"

PROMPTS = [
    {
        "name": "handler-hub-logo-option-1.png",
        "label": "Option 1 — Wordmark + paw H",
        "prompt": (
            "A minimal professional wordmark logo for 'HandlerHub', a dog show marketplace app. "
            "The letter H in 'HandlerHub' subtly incorporates a small paw print shape within it. "
            "Typography is bold, clean, modern sans-serif similar to DM Sans. "
            "Color: dark forest green #1B3A2D on a pure white background. "
            "No gradients, flat color only. No tagline. No extra decorative elements. "
            "Clean, scalable, professional — like Fiverr or Webflow wordmark logos. "
            "Wide horizontal layout. Logo only, no mockup, no frame."
        ),
    },
    {
        "name": "handler-hub-logo-option-2.png",
        "label": "Option 2 — Icon + wordmark lockup",
        "prompt": (
            "A clean modern logo lockup for 'HandlerHub', a professional dog show handler marketplace. "
            "Left side: a simple minimal dog silhouette icon (side profile, elegant, like a show dog stance). "
            "Right side: the text 'HandlerHub' in bold clean sans-serif (DM Sans style). "
            "All in dark forest green #1B3A2D on white background. "
            "Icon and text vertically centered. No gradients, flat design. "
            "Professional marketplace brand feel — modern, trustworthy. "
            "Horizontal layout. No tagline. Logo only, no mockup."
        ),
    },
    {
        "name": "handler-hub-logo-option-3.png",
        "label": "Option 3 — H with leash/ring",
        "prompt": (
            "A bold modern logo for 'HandlerHub', a dog show exhibitor marketplace platform. "
            "The letter H is stylized — one of its vertical strokes curves at the top to form a subtle leash loop or show ring circle. "
            "The text 'HandlerHub' follows in clean bold sans-serif. "
            "Dark forest green #1B3A2D on white background. Flat, no gradients. "
            "Feels like a modern tech marketplace brand (Fiverr, Contra, Webflow level). "
            "Clean horizontal lockup. No tagline. Logo only, no device mockup."
        ),
    },
    {
        "name": "handler-hub-logo-option-4.png",
        "label": "Option 4 — Stacked badge mark",
        "prompt": (
            "A professional stacked logo for 'HandlerHub', a marketplace for dog show handlers. "
            "Top: a compact icon — a simple circle containing a minimal dog head silhouette (front-facing, elegant). "
            "Below: 'HANDLER' in bold wide-tracking caps, then 'HUB' in slightly lighter weight. "
            "All dark forest green #1B3A2D on white. Flat, clean, no gradients. "
            "Square-ish composition that works as an app icon or favicon. "
            "Professional and trustworthy, like a premium marketplace brand."
        ),
    },
]


def generate_logo(prompt_data: dict) -> bool:
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt_data["prompt"]}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"]
        }
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}: {e.read().decode()}")
        return False
    except Exception as e:
        print(f"  Error: {e}")
        return False

    # Extract image from response
    candidates = body.get("candidates", [])
    if not candidates:
        print(f"  No candidates in response")
        return False

    parts = candidates[0].get("content", {}).get("parts", [])
    for part in parts:
        if "inlineData" in part:
            mime = part["inlineData"].get("mimeType", "")
            b64_data = part["inlineData"].get("data", "")
            if b64_data:
                img_bytes = base64.b64decode(b64_data)
                out_path = os.path.join(OUTPUT_DIR, prompt_data["name"])
                with open(out_path, "wb") as f:
                    f.write(img_bytes)
                print(f"  Saved: {out_path} ({len(img_bytes):,} bytes)")
                return True

    print(f"  No image data found in response parts")
    # Print text parts for debugging
    for part in parts:
        if "text" in part:
            print(f"  Text response: {part['text'][:200]}")
    return False


def main():
    print(f"Generating {len(PROMPTS)} HandlerHub logo options...\n")
    success_count = 0

    for i, prompt_data in enumerate(PROMPTS, 1):
        print(f"[{i}/{len(PROMPTS)}] {prompt_data['label']}")
        ok = generate_logo(prompt_data)
        if ok:
            success_count += 1
        print()

    print(f"Done. {success_count}/{len(PROMPTS)} logos generated.")
    print(f"Output directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
