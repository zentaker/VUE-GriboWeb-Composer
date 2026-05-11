import { c as defineEventHandler, r as readBody, a1 as verifyAdminCredentials, j as createError, $ as createAdminSessionToken, a0 as setAdminSessionCookie } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = String(body.username || "");
  const password = String(body.password || "");
  const result = await verifyAdminCredentials(username, password, event);
  if (!result.ok) {
    throw createError({
      statusCode: result.reason.includes("configured") ? 503 : 401,
      statusMessage: result.reason
    });
  }
  const token = createAdminSessionToken(result.user, event);
  setAdminSessionCookie(event, token);
  return {
    ok: true,
    user: result.user
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
