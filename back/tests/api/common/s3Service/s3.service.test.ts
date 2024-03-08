import {
  IS3ServiceConfig,
  S3Service,
} from '../../../../src/api/feedback/putFeedback/services/s3.service';

const mS3Instance = {
  upload: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

jest.mock('aws-sdk', () => {
  return { S3: jest.fn(() => mS3Instance), Endpoint: jest.fn().mockResolvedValueOnce('localhost') };
});

describe('61830632', () => {
  it('should upload correctly', async () => {
    const configService: IS3ServiceConfig = {
      bucketName: 'bucket-dev',
      host: 'host',
      idKey: 'idKey',
      secretKey: 'secretKey',
    };
    mS3Instance.promise.mockResolvedValueOnce('fake response');
    const s3Service = new S3Service(configService);
    const actual = await s3Service.upload({
      fileName: 'name',
      buffer: Buffer.from('ok'),
    });
    expect(actual).toEqual('fake response');
    expect(mS3Instance.upload).toBeCalledWith({
      Bucket: 'bucket-dev',
      Key: 'name',
      Body: Buffer.from('ok'),
    });
  });
});
