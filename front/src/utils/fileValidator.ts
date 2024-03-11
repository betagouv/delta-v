export const validFileExtensions: { [key: string]: string[] } = {
  image: ['jpg', 'png', 'jpeg'],
};

export const isValidFileType = (fileName: string, fileType: string): boolean => {
  return (validFileExtensions[fileType] ?? []).indexOf(fileName.split('.').pop() as string) > -1;
};

export const MAX_FILE_SIZE = 10485760;
