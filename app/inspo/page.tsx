import fs from "node:fs";
import path from "node:path";
import MoodBoard from "@/components/inspo/MoodBoard";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp)$/i;

function getInspoImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "inspo");
  const files = fs.readdirSync(dir).filter((file) => IMAGE_EXTENSIONS.test(file));
  return files.sort().map((file) => `/images/inspo/${encodeURIComponent(file)}`);
}

export default function InspoPage() {
  const images = getInspoImages();
  return <MoodBoard images={images} />;
}
