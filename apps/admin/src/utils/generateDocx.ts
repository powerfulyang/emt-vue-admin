import { downloadBlob } from '@/utils/download.ts';
import { format } from 'date-fns';
import { createReport } from 'docx-templates/lib/browser.js';

export async function generateDocx(filename: string, content: string) {
  const templateUrl = '/template.docx';
  const response = await fetch(templateUrl);
  // unit8Array
  const buffer = await response.arrayBuffer();
  const template = new Uint8Array(buffer);
  const report = await createReport({
    template,
    cmdDelimiter: ['{', '}'],
    data: {
      content,
      date: format(new Date(), 'yyyy年MM月dd日'),
    },
  });
  const blob = new Blob([report], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  downloadBlob(blob, filename);
}
