import { c as defineEventHandler, r as readBody, j as createError, M as createAdminUser, N as toPublicAdminUser } from '../../../../_/nitro.mjs';
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

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = String(body.password || "");
  const confirmPassword = String(body.confirmPassword || "");
  if (body.authProvider === "password" && password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password confirmation does not match."
    });
  }
  const user = await createAdminUser({
    name: String(body.name || ""),
    email: String(body.email || ""),
    username: String(body.username || ""),
    authProvider: body.authProvider === "google" ? "google" : "password",
    password,
    googleEmail: body.authProvider === "google" ? String(body.googleEmail || body.email || "") : String(body.googleEmail || "")
  });
  return {
    ok: true,
    user: toPublicAdminUser(user)
  };
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
