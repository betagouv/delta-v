import * as yup from 'yup';

const patternTwoDigitalAfterComma = /^\d+(\.\d{0,2})?$/;

export const schema = yup.object({
  name: yup.string().optional(),
  value: yup
    .number()
    .positive()
    .test(
      'is-decimal',
      'The amount should be a decimal with maximum two digits after comma',
      (val: any) => {
        if (val !== undefined) {
          return patternTwoDigitalAfterComma.test(val);
        }
        return true;
      },
    )
    .required(),
  devise: yup.string().required(),
});
