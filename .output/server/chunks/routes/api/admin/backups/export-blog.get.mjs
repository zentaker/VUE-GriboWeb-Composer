import { c as defineEventHandler, g as getQuery, j as createError, k as collectBlogPackageFiles, l as createPortablePackage, m as createDownloadResponse } from '../../../../_/nitro.mjs';
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

const exportBlog_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const slug = String(query.slug || "");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Blog slug is required." });
  }
  const collected = await collectBlogPackageFiles(slug);
  const title = String(collected.source.frontmatter.title || slug);
  const pkg = await createPortablePackage({
    packageType: "blog",
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: "Portable Gribo blog package."
  });
  return createDownloadResponse(event, pkg, `gribo-blog-${slug}.gribo.json`);
});

export { exportBlog_get as default };
//# sourceMappingURL=export-blog.get.mjs.map
