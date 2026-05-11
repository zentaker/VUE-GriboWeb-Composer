import { c as defineEventHandler, f as aggregateAnalytics } from '../../../../_/nitro.mjs';
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

const content_get = defineEventHandler(async () => {
  const summary = await aggregateAnalytics();
  return {
    items: summary.content
  };
});

export { content_get as default };
//# sourceMappingURL=content.get.mjs.map
