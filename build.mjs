import { mkdir, cp, rm, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, ".vercel", "output", "static");

async function copyIfExists(source, destination) {
  try {
    await cp(source, destination, { recursive: true });
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

await rm(join(root, ".vercel"), { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await copyIfExists(join(root, "index.html"), join(outDir, "index.html"));
await copyIfExists(join(root, "404.html"), join(outDir, "404.html"));
await copyIfExists(join(root, "styles.css"), join(outDir, "styles.css"));
await copyIfExists(join(root, "script.js"), join(outDir, "script.js"));
await copyIfExists(join(root, "assets"), join(outDir, "assets"));

await writeFile(
  join(root, ".vercel", "output", "config.json"),
  JSON.stringify({ version: 3 }, null, 2)
);
