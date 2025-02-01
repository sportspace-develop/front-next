import { toast } from 'react-toastify';

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { useUploadFileMutation } from '@/lib/store/features/file-api';

export const useUploadFile = () => {
  const [uploadFile] = useUploadFileMutation();

  const handleUploadFile = async (file: File) => {
    try {
      const { url } = await uploadFile(file).unwrap();

      return url;
    } catch {
      toast.info(`MAX размер файла: ${MAX_FILE_SIZE / 1024 / 1024}MB
				Разрешенные форматы: ${ACCEPTED_IMAGE_TYPES.join(', ')}`);

      return '';
    }
  };

  return handleUploadFile;
};
