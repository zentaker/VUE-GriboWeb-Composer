import { c as defineEventHandler, i as exportAnalytics } from '../../../../_/nitro.mjs';
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

const export_get = defineEventHandler(async (event) => {
  return await exportAnalytics(event);
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
