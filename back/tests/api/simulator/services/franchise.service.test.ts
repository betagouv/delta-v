import {
  getFranchiseAmount,
  isFreeFranchise,
} from '../../../../src/api/simulator/services/franchise.service';

describe('franchise', () => {
  describe('getFranchiseAmount', () => {
    describe('is adult > 15', () => {
      it('should return 75 - border trip', () => {
        const result = getFranchiseAmount({ border: true, adult: true });
        expect(result).toBe(75);
      });
      it('should return 300 - not border trip', () => {
        const result = getFranchiseAmount({ border: false, adult: true });
        expect(result).toBe(300);
      });
    });
    describe('is not adult < 15', () => {
      it('should return 40 - border trip', () => {
        const result = getFranchiseAmount({ border: true, adult: false });
        expect(result).toBe(40);
      });
      it('should return 150 - not border trip', () => {
        const result = getFranchiseAmount({ border: false, adult: false });
        expect(result).toBe(150);
      });
    });
  });
  describe('isFreeFranchise', () => {
    describe('is border user', () => {
      describe('is adult > 15', () => {
        it('should return true - with total < 75', () => {
          const result = isFreeFranchise({ total: 50, border: true, adult: true });
          expect(result).toBe(true);
        });
        it('should return false - with total > 75', () => {
          const result = isFreeFranchise({ total: 500, border: true, adult: true });
          expect(result).toBe(false);
        });
      });
      describe('is not adult < 15', () => {
        it('should return true - with total < 40', () => {
          const result = isFreeFranchise({ total: 35, border: true, adult: false });
          expect(result).toBe(true);
        });
        it('should return false - with total > 40', () => {
          const result = isFreeFranchise({ total: 45, border: true, adult: false });
          expect(result).toBe(false);
        });
      });
    });
    describe('is not border user', () => {
      describe('is adult > 15', () => {
        it('should return false - with total > 300', () => {
          const result = isFreeFranchise({ total: 500, border: false, adult: true });
          expect(result).toBe(false);
        });
        it('should return true - with total < 300', () => {
          const result = isFreeFranchise({ total: 275, border: false, adult: true });
          expect(result).toBe(true);
        });
      });
      describe('is not adult < 15', () => {
        it('should return true - with total < 150', () => {
          const result = isFreeFranchise({ total: 145, border: false, adult: false });
          expect(result).toBe(true);
        });
        it('should return false - with total > 150', () => {
          const result = isFreeFranchise({ total: 155, border: false, adult: false });
          expect(result).toBe(false);
        });
      });
    });
  });
});
