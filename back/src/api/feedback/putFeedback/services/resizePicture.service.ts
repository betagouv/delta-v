// eslint-disable-next-line import/no-extraneous-dependencies
import sharp from 'sharp';

export enum Size {
  ORIGINAL = 0,
  SMALL = 256,
  MEDIUM = 512,
  BIG = 1024,
}

export enum Resolution {
  THUMBNAIL = 'thumbnail',
  LOW_RESOLUTION = 'lowResolution',
  STANDARD_RESOLUTION = 'standardResolution',
  ORIGINAL_RESOLUTION = 'originalResolution',
}

export interface IResolution {
  name: Resolution;
  maximumSize: Size;
}

export const STANDARD_RESOLUTION: IResolution = {
  name: Resolution.STANDARD_RESOLUTION,
  maximumSize: Size.BIG,
};

export const resizePicture = async (size: Size, file: Buffer): Promise<Buffer> => {
  const buffer = await sharp(file).jpeg({ force: true, quality: 70 }).resize(size).toBuffer();

  await sharp(buffer).metadata();

  return buffer;
};
