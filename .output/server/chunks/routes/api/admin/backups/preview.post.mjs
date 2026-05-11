import { c as defineEventHandler, r as readBody, v as validatePortablePackage, p as detectImportConflicts } from '../../../../_/nitro.mjs';
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

const preview_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pkg = validatePortablePackage(body.package);
  const conflicts = await detectImportConflicts(pkg);
  return {
    ok: true,
    manifest: pkg.manifest,
    files: pkg.files.map((file) => ({
      path: file.path,
      encoding: file.encoding,
      size: file.content.length
    })),
    creates: conflicts.creates,
    conflicts: conflicts.conflicts,
    warnings: [
      ...pkg.files.some((file) => file.path.startsWith("public/uploads/")) ? ["Uploads are included as portable file payloads. Media upload management is still future work."] : [],
      ...conflicts.conflicts.length ? ["Conflicting files already exist. Use Import as copy or confirm Replace existing."] : []
    ]
  };
});

export { preview_post as default };
//# sourceMappingURL=preview.post.mjs.map
