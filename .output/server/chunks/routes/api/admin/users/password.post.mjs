import { c as defineEventHandler, r as readBody, j as createError, P as changeAdminUserPassword, N as toPublicAdminUser } from '../../../../_/nitro.mjs';
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

const password_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = String(body.password || "");
  const confirmPassword = String(body.confirmPassword || "");
  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password confirmation does not match."
    });
  }
  const user = await changeAdminUserPassword(String(body.id || ""), password);
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

export { password_post as default };
//# sourceMappingURL=password.post.mjs.map
