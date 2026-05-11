import { c as defineEventHandler, y as listSafetySnapshots } from '../../../../_/nitro.mjs';
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

const snapshots_get = defineEventHandler(async () => {
  return {
    snapshots: await listSafetySnapshots()
  };
});

export { snapshots_get as default };
//# sourceMappingURL=snapshots.get.mjs.map
