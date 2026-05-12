import { c as defineEventHandler, r as readBody, j as createError, G as resolveAdminContentFile, H as readMarkdownFile, F as todayIsoDate, D as writeMarkdownFile } from '../../../../_/nitro.mjs';
import { mkdir, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';

const delete_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const mode = String(body.mode || "archive");
  if (!["archive", "delete"].includes(mode)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsupported delete mode."
    });
  }
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  if (mode === "delete") {
    const deleteConfig = {
      blog: {
        confirmation: "DELETE BLOG ENTRY",
        trashDir: "blog",
        prefix: "blog/"
      },
      projects: {
        confirmation: "DELETE PROJECT",
        trashDir: "projects",
        prefix: "projects/"
      }
    };
    const config = deleteConfig[resolved.contentType];
    if (!config) {
      throw createError({
        statusCode: 400,
        statusMessage: "Physical delete is only enabled for blog entries and repository projects."
      });
    }
    if (String(body.confirmation || "") !== config.confirmation) {
      throw createError({
        statusCode: 400,
        statusMessage: `Type ${config.confirmation} to confirm permanent removal.`
      });
    }
    const trashRoot = resolve(process.cwd(), `server/data/trash/${config.trashDir}`);
    const filename = resolved.filePath.replace(new RegExp(`^${config.prefix}`), "").replace(/\//g, "__");
    const trashName = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z")}-${filename}`;
    const trashPath = resolve(trashRoot, trashName);
    await mkdir(trashRoot, { recursive: true });
    await rename(resolved.absolutePath, trashPath);
    return {
      ok: true,
      deleted: true,
      softDeleted: false,
      item: {
        contentType: resolved.contentType,
        filePath: resolved.filePath,
        trashPath: `server/data/trash/${config.trashDir}/${trashName}`
      }
    };
  }
  const content = await readMarkdownFile(resolved.absolutePath);
  const frontmatter = {
    ...content.frontmatter,
    status: "archived",
    archivedAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: todayIsoDate(),
    noindex: true
  };
  await writeMarkdownFile(resolved.absolutePath, frontmatter, content.body);
  return {
    ok: true,
    softDeleted: true,
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      frontmatter
    }
  };
});

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
