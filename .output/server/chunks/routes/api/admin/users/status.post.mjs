import { c as defineEventHandler, r as readBody, Q as setAdminUserStatus, N as toPublicAdminUser } from '../../../../_/nitro.mjs';
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

const status_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const status = body.status === "disabled" ? "disabled" : "active";
  const user = await setAdminUserStatus(String(body.id || ""), status);
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

export { status_post as default };
//# sourceMappingURL=status.post.mjs.map
