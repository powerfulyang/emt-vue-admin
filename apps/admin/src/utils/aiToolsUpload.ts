import { aiToolsProxy } from '@/request';

interface UploadProps {
  url: string;
  file: File;
}

export const aiToolsUpload = async <T = any>({ url, file }: UploadProps) => {
  const formData = new FormData();
  formData.append('file', file);
  return aiToolsProxy<T>(url, {
    method: 'POST',
    body: formData,
  });
};
