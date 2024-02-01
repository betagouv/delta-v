import { S3, Endpoint } from 'aws-sdk';
import { config } from '../../../../loader/config';
import { Size, resizePicture } from './resizePicture.service';

export interface IUploadOptions {
  fileName: string;
  buffer: Buffer;
}

export interface IS3ServiceConfig {
  idKey: string;
  secretKey: string;
  bucketName: string;
  host: string;
}

export interface IS3Service {
  upload: (options: IUploadOptions) => Promise<S3.ManagedUpload.SendData>;
}

export class S3Service implements IS3Service {
  private readonly s3: S3;
  private readonly bucket: string;
  private endpoint?: Endpoint | string;
  constructor(private config: IS3ServiceConfig) {
    this.endpoint = new Endpoint(this.config.host);
    this.s3 = new S3({
      endpoint: this.endpoint,
      accessKeyId: this.config.idKey,
      secretAccessKey: this.config.secretKey,
    });
    this.bucket = config.bucketName;
  }
  public async upload({ fileName, buffer }: IUploadOptions): Promise<S3.ManagedUpload.SendData> {
    const resizedBuffer = await resizePicture(Size.BIG, buffer);
    const bucket = this.bucket;
    const params = { Bucket: bucket, Key: fileName, Body: resizedBuffer };
    const upload = await this.s3.upload(params).promise();
    return upload;
  }
}

export const getFeedbackImageServerService = (): S3Service =>
  new S3Service({
    host: config.CELLAR_HOST,
    bucketName: config.CELLAR_BUCKET_NAME,
    idKey: config.CELLAR_KEY_ID,
    secretKey: config.CELLAR_KEY_SECRET,
  });
