import { c as defineEventHandler, O as readAdminUsers, N as toPublicAdminUser } from '../../../../_/nitro.mjs';
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

const list_get = defineEventHandler(async () => {
  const users = (await readAdminUsers()).map(toPublicAdminUser);
  return {
    users
  };
});

export { list_get as default };
//# sourceMappingURL=list.get.mjs.map
