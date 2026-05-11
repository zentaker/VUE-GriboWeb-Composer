import { c as defineEventHandler, g as getQuery, j as createError, o as collectProjectPackageFiles, l as createPortablePackage, m as createDownloadResponse } from '../../../../_/nitro.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';

const exportProject_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const slug = String(query.slug || "");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Project slug is required." });
  }
  const collected = await collectProjectPackageFiles(slug);
  const title = String(collected.source.frontmatter.title || slug);
  const pkg = await createPortablePackage({
    packageType: "project",
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: "Project package with associated documentation detected from project frontmatter."
  });
  return createDownloadResponse(event, pkg, `gribo-project-${slug}.gribo.json`);
});

export { exportProject_get as default };
//# sourceMappingURL=export-project.get.mjs.map
