import { c as defineEventHandler, r as readBody, R as updateAdminUser, N as toPublicAdminUser } from '../../../../_/nitro.mjs';
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

const update_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await updateAdminUser(String(body.id || ""), {
    name: String(body.name || ""),
    email: String(body.email || ""),
    username: String(body.username || ""),
    googleEmail: String(body.googleEmail || ""),
    authProvider: body.authProvider === "google" ? "google" : "password"
  });
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
