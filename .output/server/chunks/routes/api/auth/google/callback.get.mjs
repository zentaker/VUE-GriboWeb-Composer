import { c as defineEventHandler, g as getQuery, W as assertGoogleState, j as createError, X as exchangeGoogleCode, Y as fetchGoogleUser, Z as findGoogleAdminUser, V as sendRedirect, _ as markAdminUserLogin, $ as createAdminSessionToken, a0 as setAdminSessionCookie } from '../../../../_/nitro.mjs';
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

const callback_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = String(query.code || "");
  const state = String(query.state || "");
  try {
    assertGoogleState(event, state);
    if (!code) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Google authorization code."
      });
    }
    const token = await exchangeGoogleCode(event, code);
    if (!token.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Google access token was not returned."
      });
    }
    const googleUser = await fetchGoogleUser(token.access_token);
    const email = String(googleUser.email || "").toLowerCase();
    const adminUser = await findGoogleAdminUser(email);
    if (!adminUser) {
      return sendRedirect(event, "/admin/login?error=google_unauthorized");
    }
    const loggedInUser = await markAdminUserLogin(adminUser.id) || adminUser;
    const sessionToken = createAdminSessionToken({
      id: loggedInUser.id,
      name: loggedInUser.name || googleUser.name || loggedInUser.email,
      email: loggedInUser.email,
      username: loggedInUser.username,
      authProvider: "google"
    }, event);
    setAdminSessionCookie(event, sessionToken);
    return sendRedirect(event, "/admin");
  } catch (error) {
    const message = encodeURIComponent((error == null ? void 0 : error.statusMessage) || (error == null ? void 0 : error.message) || "Google login failed.");
    return sendRedirect(event, `/admin/login?error=${message}`);
  }
});

export { callback_get as default };
//# sourceMappingURL=callback.get.mjs.map
