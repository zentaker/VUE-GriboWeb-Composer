import { c as defineEventHandler, J as readHomeLayout } from '../../_/nitro.mjs';
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

const homeLayout_get = defineEventHandler(async () => {
  const layout = await readHomeLayout();
  return {
    layout
  };
});

export { homeLayout_get as default };
//# sourceMappingURL=home-layout.get.mjs.map
