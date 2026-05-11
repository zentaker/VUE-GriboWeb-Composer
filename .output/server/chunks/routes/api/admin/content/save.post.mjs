import { c as defineEventHandler, r as readBody, G as resolveAdminContentFile, B as slugifyContentTitle, F as todayIsoDate, j as createError, D as writeMarkdownFile, E as getContentPublicPath } from '../../../../_/nitro.mjs';
import { access, rename } from 'node:fs/promises';
import 'node:crypto';
import 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';

const save_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  const incomingFrontmatter = { ...(_a = body.frontmatter) != null ? _a : {} };
  const title = String((_b = incomingFrontmatter.title) != null ? _b : "Untitled");
  let targetResolved = resolved;
  incomingFrontmatter.title = title;
  const incomingSlug = String(incomingFrontmatter.slug || "");
  incomingFrontmatter.slug = resolved.contentType === "blog" ? resolveBlogSaveSlug(incomingSlug, title) : incomingSlug || slugifyContentTitle(title);
  incomingFrontmatter.updatedAt = todayIsoDate();
  if (resolved.contentType === "blog") {
    const desiredSlug = String(incomingFrontmatter.slug || "");
    const currentSlug = resolved.filePath.replace(/^blog\//, "").replace(/\.md$/, "").split("/").pop() || "";
    if (desiredSlug && desiredSlug !== currentSlug) {
      targetResolved = resolveAdminContentFile("blog", `${desiredSlug}.md`);
      try {
        await access(targetResolved.absolutePath);
        if (targetResolved.absolutePath !== resolved.absolutePath) {
          throw createError({
            statusCode: 409,
            statusMessage: "A blog entry with this slug already exists"
          });
        }
      } catch (error) {
        if ((error == null ? void 0 : error.statusCode) === 409) throw error;
      }
      await rename(resolved.absolutePath, targetResolved.absolutePath);
    }
  }
  await writeMarkdownFile(targetResolved.absolutePath, incomingFrontmatter, String((_c = body.body) != null ? _c : ""));
  return {
    ok: true,
    item: {
      contentType: targetResolved.contentType,
      filePath: targetResolved.filePath,
      publicPath: getContentPublicPath(targetResolved.contentType, incomingFrontmatter, targetResolved.filePath),
      frontmatter: incomingFrontmatter
    }
  };
});
function slugTimestamp() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(0, 14);
}
function slugifyBlogTitle(value, fallback = "") {
  const words = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").split("-").filter(Boolean).slice(0, 8);
  const selected = [];
  for (const word of words) {
    const candidate = [...selected, word].join("-");
    if (candidate.length > 72) break;
    selected.push(word);
  }
  return selected.join("-") || fallback;
}
function resolveBlogSaveSlug(incomingSlug, title) {
  if (isStaleBlogSlug(incomingSlug) && hasRealBlogTitle(title)) return slugifyBlogTitle(title);
  if (incomingSlug) return slugifyBlogTitle(incomingSlug);
  return slugifyBlogTitle(title) || `draft-${slugTimestamp()}`;
}
function isStaleBlogSlug(value) {
  const slug = String(value || "").trim();
  return !slug || /^untitled-blog-entry-\d+$/.test(slug) || /^untitled-draft-\d+$/.test(slug) || /^draft-\d+$/.test(slug) || slug === "untitled-blog-entry" || slug === "untitled-draft" || slug === "untitled" || slug === "draft";
}
function hasRealBlogTitle(value) {
  const slug = slugifyBlogTitle(String(value || ""));
  return Boolean(slug) && slug !== "untitled-blog-entry" && slug !== "untitled-draft" && slug !== "untitled" && slug !== "draft";
}

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
