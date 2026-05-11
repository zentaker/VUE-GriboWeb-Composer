import { c as defineEventHandler, r as readBody, G as resolveAdminContentFile, H as readMarkdownFile, E as getContentPublicPath } from '../../../../_/nitro.mjs';
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

const read_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const resolved = resolveAdminContentFile(body.contentType, body.filePath);
  const content = await readMarkdownFile(resolved.absolutePath);
  return {
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(resolved.contentType, content.frontmatter, resolved.filePath),
      frontmatter: content.frontmatter,
      body: content.body
    }
  };
});

export { read_post as default };
//# sourceMappingURL=read.post.mjs.map
