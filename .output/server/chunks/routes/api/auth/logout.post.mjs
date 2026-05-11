import { c as defineEventHandler, a2 as clearAdminSessionCookie } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler((event) => {
  clearAdminSessionCookie(event);
  return {
    ok: true
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
