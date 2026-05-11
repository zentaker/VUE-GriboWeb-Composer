import { c as defineEventHandler, r as readBody, K as writeHomeLayout } from '../../../../_/nitro.mjs';
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
  var _a;
  const body = await readBody(event);
  const result = await writeHomeLayout((_a = body == null ? void 0 : body.layout) != null ? _a : body);
  return {
    ok: true,
    ...result
  };
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
