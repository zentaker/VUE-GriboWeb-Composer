import { c as defineEventHandler, y as listSafetySnapshots, j as createError, z as setHeader } from '../../../../_/nitro.mjs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'anymatch';

const latestSnapshot_get = defineEventHandler(async (event) => {
  const snapshots = await listSafetySnapshots();
  const latest = snapshots[0];
  if (!latest) {
    throw createError({ statusCode: 404, statusMessage: "No safety snapshots found." });
  }
  setHeader(event, "content-type", "application/vnd.gribo.package+json; charset=utf-8");
  setHeader(event, "content-disposition", `attachment; filename="${latest.filename}"`);
  return await readFile(resolve(process.cwd(), latest.path), "utf8");
});

export { latestSnapshot_get as default };
//# sourceMappingURL=latest-snapshot.get.mjs.map
