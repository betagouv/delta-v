export const validFileExtensions: { [key: string]: string[] } = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

export const isValidFileType = (type: string, file?: File): boolean => {
  if (!file) {
    return true;
  }
  const validExtensions = validFileExtensions[type];
  if (!validExtensions) {
    return false;
  }

  return validExtensions.includes(file.type);
};

export const MAX_FILE_SIZE = 10485760;
