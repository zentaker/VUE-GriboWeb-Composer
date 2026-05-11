import { c as defineEventHandler, g as getQuery, h as readAnalyticsEvents } from '../../../../_/nitro.mjs';
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

const events_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Math.min(Math.max(Number(query.limit || 40), 1), 200);
  return {
    items: await readAnalyticsEvents(limit)
  };
});

export { events_get as default };
//# sourceMappingURL=events.get.mjs.map
