import { c as defineEventHandler, g as getQuery, A as assertAdminContentType, I as listAdminMarkdownFiles, G as resolveAdminContentFile, H as readMarkdownFile, E as getContentPublicPath } from '../../../../_/nitro.mjs';
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

const list_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const query = getQuery(event);
  const requestedTypes = query.contentType ? [assertAdminContentType(query.contentType)] : ["blog", "projects", "docs", "labs"];
  const items = [];
  for (const contentType of requestedTypes) {
    const files = await listAdminMarkdownFiles(contentType);
    for (const filePath of files) {
      const resolved = resolveAdminContentFile(contentType, filePath);
      const { frontmatter } = await readMarkdownFile(resolved.absolutePath);
      const publicPath = getContentPublicPath(contentType, frontmatter, filePath);
      items.push({
        contentType,
        filePath,
        publicPath,
        title: (_a = frontmatter.title) != null ? _a : filePath,
        slug: (_b = frontmatter.slug) != null ? _b : publicPath.split("/").pop(),
        status: (_c = frontmatter.status) != null ? _c : "draft",
        lab: (_d = frontmatter.lab) != null ? _d : "",
        date: (_e = frontmatter.date) != null ? _e : "",
        updatedAt: (_f = frontmatter.updatedAt) != null ? _f : "",
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : Array.isArray(frontmatter.relatedTags) ? frontmatter.relatedTags : [],
        description: (_i = (_h = (_g = frontmatter.description) != null ? _g : frontmatter.excerpt) != null ? _h : frontmatter.summary) != null ? _i : "",
        project: (_j = frontmatter.project) != null ? _j : "",
        projectSlug: (_k = frontmatter.projectSlug) != null ? _k : "",
        docsFolder: (_l = frontmatter.docsFolder) != null ? _l : "",
        docsPath: (_m = frontmatter.docsPath) != null ? _m : "",
        docsPaths: Array.isArray(frontmatter.docsPaths) ? frontmatter.docsPaths : [],
        relatedDocs: Array.isArray(frontmatter.relatedDocs) ? frontmatter.relatedDocs : []
      });
    }
  }
  return {
    items: items.sort((a, b) => {
      const aDate = String(a.updatedAt || a.date || "");
      const bDate = String(b.updatedAt || b.date || "");
      return bDate.localeCompare(aDate) || String(a.title).localeCompare(String(b.title));
    })
  };
});

export { list_get as default };
//# sourceMappingURL=list.get.mjs.map
