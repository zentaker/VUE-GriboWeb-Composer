import { c as defineEventHandler, r as readBody, G as resolveAdminContentFile, B as slugifyContentTitle, F as todayIsoDate, D as writeMarkdownFile, E as getContentPublicPath } from '../../../../_/nitro.mjs';
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

const save_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  const incomingFrontmatter = { ...(_a = body.frontmatter) != null ? _a : {} };
  const title = String((_b = incomingFrontmatter.title) != null ? _b : "Untitled");
  incomingFrontmatter.title = title;
  incomingFrontmatter.slug = incomingFrontmatter.slug || slugifyContentTitle(title);
  incomingFrontmatter.updatedAt = todayIsoDate();
  await writeMarkdownFile(resolved.absolutePath, incomingFrontmatter, String((_c = body.body) != null ? _c : ""));
  return {
    ok: true,
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(resolved.contentType, incomingFrontmatter, resolved.filePath),
      frontmatter: incomingFrontmatter
    }
  };
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
