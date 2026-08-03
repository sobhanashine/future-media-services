import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextAppDir = path.join(projectRoot, ".next", "server", "app");
const cloudflareAssetsDir = path.join(projectRoot, ".open-next", "assets");
const prerenderDir = path.join(cloudflareAssetsDir, "__opennext_prerender");

async function copyPrerenderedPages(sourceDir, relativeDir = "") {
  const entries = await readdir(sourceDir, { withFileTypes: true });
  let copied = 0;

  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const sourcePath = path.join(sourceDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.endsWith(".segments")) continue;
      copied += await copyPrerenderedPages(sourcePath, relativePath);
      continue;
    }

    if (
      /\.(html|rsc)$/.test(entry.name) &&
      !entry.name.startsWith("_global-error") &&
      !entry.name.startsWith("_not-found")
    ) {
      const targetPath = path.join(prerenderDir, relativePath);
      await mkdir(path.dirname(targetPath), { recursive: true });
      await cp(sourcePath, targetPath);
      copied += 1;
    }
  }

  return copied;
}

async function copyStaticMetadata() {
  for (const filename of ["robots.txt", "sitemap.xml"]) {
    const sourcePath = path.join(nextAppDir, `${filename}.body`);
    const targetPath = path.join(cloudflareAssetsDir, filename);
    await cp(sourcePath, targetPath);
  }
}

await rm(prerenderDir, { recursive: true, force: true });
await mkdir(prerenderDir, { recursive: true });

const copiedPages = await copyPrerenderedPages(nextAppDir);
await copyStaticMetadata();

console.log(`Prepared ${copiedPages} prerendered HTML/RSC assets for Cloudflare.`);
