/* eslint-disable no-console */
import { readdir } from 'fs/promises';
import { join, extname } from 'path';
import sharp from 'sharp';

const BLOG_IMAGES_DIR = 'public/images/blog';
const TARGET_ASPECT_RATIO = 16 / 9;
const TOLERANCE = 0.1; // 10% tolerance

async function checkImages() {
    console.log(`🔍 Checking images in ${BLOG_IMAGES_DIR}...`);

    try {
        const files = await readdir(BLOG_IMAGES_DIR);
        let issues = 0;

        for (const file of files) {
            if (!isImage(file)) continue;

            const path = join(BLOG_IMAGES_DIR, file);
            const metadata = await sharp(path).metadata();
            const ratio = metadata.width / metadata.height;
            const deviation = Math.abs(ratio - TARGET_ASPECT_RATIO);

            if (deviation > TOLERANCE) {
                console.error(`❌ ${file}: Aspect Ratio Issue`);
                console.error(`   Expected: 1.77 (16:9)`);
                console.error(`   Actual:   ${ratio.toFixed(2)} (${metadata.width}x${metadata.height})`);
                issues++;
            } else {
                console.log(`✅ ${file}: OK (${metadata.width}x${metadata.height})`);
            }
        }

        console.log('---');
        if (issues > 0) {
            console.error(`⚠️ Found ${issues} images with incorrect aspect ratios.`);
            process.exit(1);
        } else {
            console.log('✨ All blog images have correct aspect ratios!');
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn(`Directory not found: ${BLOG_IMAGES_DIR}`);
            return;
        }
        console.error('Error checking images:', error);
        process.exit(1);
    }
}

function isImage(file) {
    const ext = extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
}

checkImages();
