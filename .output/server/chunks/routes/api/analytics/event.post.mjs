import { c as defineEventHandler, r as readBody, S as recordAnalyticsEvent } from '../../../_/nitro.mjs';
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

const event_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await recordAnalyticsEvent(event, body);
});

export { event_post as default };
//# sourceMappingURL=event.post.mjs.map
