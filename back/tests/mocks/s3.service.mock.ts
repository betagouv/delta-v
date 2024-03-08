import { IS3Service } from '../../src/api/feedback/putFeedback/services/s3.service';

export interface IS3ServiceMock {
  upload: string;
}

export const s3MockService = ({ upload }: IS3ServiceMock): IS3Service => ({
  upload: jest.fn().mockResolvedValue(upload),
});
