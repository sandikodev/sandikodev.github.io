import { readdir } from "fs/promises";
import { extname, join } from "path";

import sharp from "sharp";

const BLOG_IMAGES_DIR = "public/images/blog";
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 675; // 16:9
const TARGET_RATIO = OUTPUT_WIDTH / OUTPUT_HEIGHT;
const TOLERANCE = 0.05;

async function fixImages() {
  console.log(`🔧 Fixing images in ${BLOG_IMAGES_DIR}...`);

  try {
    const files = await readdir(BLOG_IMAGES_DIR);

    for (const file of files) {
      if (!isImage(file)) continue;

      const path = join(BLOG_IMAGES_DIR, file);
      const image = sharp(path);
      const metadata = await image.metadata();
      const currentRatio = metadata.width / metadata.height;

      if (Math.abs(currentRatio - TARGET_RATIO) <= TOLERANCE) {
        console.log(`✅ ${file}: Already 16:9, skipping.`);
        continue;
      }

      console.log(
        `🔨 Processing ${file} (${metadata.width}x${metadata.height})...`,
      );

      // 1. Create blurred background
      // Resize to cover the target dimensions, then blur heavily
      const background = await sharp(path)
        .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, { fit: "cover" })
        .blur(40)
        .modulate({ brightness: 0.7 }) // Darken background slightly
        .toBuffer();

      // 2. Resize original image to fit within dimensions (contain)
      // We limit height to 90% of container to give some breathing room
      const foreground = await sharp(path)
        .resize({
          fit: "inside",
          height: Math.round(OUTPUT_HEIGHT * 0.85),
          width: Math.round(OUTPUT_WIDTH * 0.85),
        })
        .toBuffer();

      // 3. Composite
      await sharp(background)
        .composite([{ gravity: "center", input: foreground }])
        .toFile(path); // Overwrite original file

      console.log(`✨ Fixed ${file}`);
    }

    console.log("🎉 All images processed!");
  } catch (error) {
    console.error("Error fixing images:", error);
    process.exit(1);
  }
}

function isImage(file) {
  const ext = extname(file).toLowerCase();
  return [".avif", ".jpeg", ".jpg", ".png", ".webp"].includes(ext);
}

fixImages();
