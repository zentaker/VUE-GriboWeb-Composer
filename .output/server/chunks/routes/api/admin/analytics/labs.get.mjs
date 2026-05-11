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

const labs_get = defineEventHandler(async () => {
  const summary = await aggregateAnalytics();
  return {
    items: summary.labs
  };
});

export { labs_get as default };
//# sourceMappingURL=labs.get.mjs.map
