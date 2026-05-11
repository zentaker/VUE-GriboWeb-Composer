import { c as defineEventHandler, r as readBody, e as clearAnalyticsData } from '../../../../_/nitro.mjs';
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

const clear_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await clearAnalyticsData(String((body == null ? void 0 : body.confirmation) || ""));
});

export { clear_post as default };
//# sourceMappingURL=clear.post.mjs.map
