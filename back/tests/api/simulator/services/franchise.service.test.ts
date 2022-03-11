import {
  getFranchiseAmount,
  isFreeFranchise,
} from '../../../../src/api/simulator/services/franchise.service';

describe('franchise', () => {
  describe('getFranchiseAmount', () => {
    it('should return 75 - border trip', () => {
      const result = getFranchiseAmount({ border: true });
      expect(result).toBe(75);
    });
    it('should return 300 - not border trip', () => {
      const result = getFranchiseAmount({ border: false });
      expect(result).toBe(300);
    });
  });
  describe('isFreeFranchise', () => {
    it('should return true - user border with total < 75', () => {
      const result = isFreeFranchise({ total: 50, border: true });
      expect(result).toBe(true);
    });
    it('should return false - user border with total > 75', () => {
      const result = isFreeFranchise({ total: 500, border: true });
      expect(result).toBe(false);
    });
    it('should return false - user not border with total > 300', () => {
      const result = isFreeFranchise({ total: 500, border: false });
      expect(result).toBe(false);
    });
    it('should return true - user with total < 300', () => {
      const result = isFreeFranchise({ total: 275, border: false });
      expect(result).toBe(true);
    });
  });
});
