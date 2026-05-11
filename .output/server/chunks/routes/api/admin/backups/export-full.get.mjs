import { c as defineEventHandler, n as collectFullBackupFiles, l as createPortablePackage, m as createDownloadResponse } from '../../../../_/nitro.mjs';
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

const exportFull_get = defineEventHandler(async (event) => {
  const files = await collectFullBackupFiles();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, "");
  const pkg = await createPortablePackage({
    packageType: "full-site",
    title: "Gribo Digital full-site backup",
    slug: `gribo-backup-${timestamp}`,
    contentFiles: files.contentFiles,
    uploadFiles: files.uploadFiles,
    notes: "Full backup of approved Gribo content and uploads folders."
  });
  return createDownloadResponse(event, pkg, `gribo-backup-${timestamp}.gribo.json`);
});

export { exportFull_get as default };
//# sourceMappingURL=export-full.get.mjs.map
