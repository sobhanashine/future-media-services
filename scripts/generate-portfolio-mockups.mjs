import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const projectsDirectory = path.join(projectRoot, "public", "projects");
const outputDirectory = path.join(projectsDirectory, "mockups");
const templatePath = path.join(outputDirectory, "device-template.jpg");

const devices = {
  tablet: { left: 525, top: 707, width: 1447, height: 1939, radius: 18 },
  desktop: { left: 2031, top: 1050, width: 2170, height: 1503, radius: 2 },
  mobile: { left: 1702, top: 1676, width: 565, height: 1222, radius: 42 },
};

const phoneBody = { left: 1655, top: 1620, width: 655, height: 1315, radius: 82 };
const outputWidth = 2400;
const outputHeight = 1714;

function screenMask(deviceName) {
  const device = devices[deviceName];
  const phoneCutout =
    deviceName === "mobile"
      ? `
        <path
          d="M 124 0 H 440 V 20 C 440 34 429 43 415 43 H 149 C 135 43 124 34 124 20 Z"
          fill="black"
        />`
      : `
        <rect
          x="${phoneBody.left - device.left}"
          y="${phoneBody.top - device.top}"
          width="${phoneBody.width}"
          height="${phoneBody.height}"
          rx="${phoneBody.radius}"
          fill="black"
        />`;

  return Buffer.from(`
    <svg width="${device.width}" height="${device.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="screen-mask">
          <rect width="100%" height="100%" fill="black" />
          <rect
            width="100%"
            height="100%"
            rx="${device.radius}"
            fill="white"
          />
          ${phoneCutout}
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="white" mask="url(#screen-mask)" />
    </svg>
  `);
}

async function createScreen(projectSlug, deviceName) {
  const device = devices[deviceName];
  const sourcePath = path.join(projectsDirectory, `${projectSlug}-${deviceName}.webp`);

  return sharp(sourcePath)
    .resize(device.width, device.height, {
      fit: "cover",
      position: "top",
    })
    .ensureAlpha()
    .composite([{ input: screenMask(deviceName), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function createMockup(projectSlug) {
  const [tablet, desktop, mobile] = await Promise.all([
    createScreen(projectSlug, "tablet"),
    createScreen(projectSlug, "desktop"),
    createScreen(projectSlug, "mobile"),
  ]);

  const outputPath = path.join(outputDirectory, `${projectSlug}-mockup.webp`);

  const composed = await sharp(templatePath)
    .composite([
      { input: tablet, left: devices.tablet.left, top: devices.tablet.top },
      { input: desktop, left: devices.desktop.left, top: devices.desktop.top },
      { input: mobile, left: devices.mobile.left, top: devices.mobile.top },
    ])
    .raw()
    .toBuffer({ resolveWithObject: true });

  await sharp(composed.data, { raw: composed.info })
    .resize(outputWidth, outputHeight, { fit: "fill" })
    .webp({ quality: 86, smartSubsample: true })
    .toFile(outputPath);

  return path.relative(projectRoot, outputPath);
}

await mkdir(outputDirectory, { recursive: true });

const projectSlugs = (await readdir(projectsDirectory))
  .filter((fileName) => fileName.endsWith("-desktop.webp"))
  .map((fileName) => fileName.replace(/-desktop\.webp$/, ""))
  .sort();

for (const projectSlug of projectSlugs) {
  const outputPath = await createMockup(projectSlug);
  console.log(`Generated ${outputPath}`);
}
