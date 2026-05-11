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

const summary_get = defineEventHandler(async () => {
  return await aggregateAnalytics();
});

export { summary_get as default };
//# sourceMappingURL=summary.get.mjs.map
