import { c as defineEventHandler, a3 as getAdminAuthConfig, T as getGoogleOAuthConfig, a4 as readAdminSession } from '../../../_/nitro.mjs';
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

const session_get = defineEventHandler((event) => {
  const config = getAdminAuthConfig(event);
  const googleConfig = getGoogleOAuthConfig(event);
  const session = readAdminSession(event);
  return {
    authenticated: Boolean(session),
    loginEnabled: config.enabled,
    googleLoginEnabled: googleConfig.enabled,
    production: config.production,
    reason: config.enabled ? "" : config.reason,
    user: session ? {
      id: session.id,
      name: session.name,
      email: session.email,
      authProvider: session.authProvider,
      username: session.username
    } : null
  };
});

export { session_get as default };
//# sourceMappingURL=session.get.mjs.map
