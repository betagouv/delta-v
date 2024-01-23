import { Readable } from 'stream';
// import { v2 as cloudinary } from 'cloudinary';
// import { resizePicture, Size } from './resizePicture.service';

export const uploadBuffer = async (buffer: Buffer): Promise<string | undefined> => {
  // const resizedBuffer = await resizePicture(Size.BIG, buffer);
  // return new Promise((resolve, reject) => {
  //   const stream = cloudinary.uploader.upload_stream(
  //     { folder: config.CLOUDINARY_FOLDER },
  //     (error, result) => {
  //       if (error) reject(error);
  //       resolve(result?.secure_url);
  //     },
  //   );
  //   bufferToStream(resizedBuffer).pipe(stream);
  // });
  return;
};

const bufferToStream = (buffer: Buffer): Readable => {
  const readable = new Readable({
    read(): void {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};
