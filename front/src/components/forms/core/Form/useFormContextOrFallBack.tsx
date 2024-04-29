import {
  FieldValues,
  FormState,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';

const EMPTY_FORM_STATE = {
  isDirty: false,
  isLoading: false,
  isSubmitted: false,
  isSubmitSuccessful: false,
  isSubmitting: false,
  isValidating: false,
  isValid: false,
  submitCount: 0,
  errors: {},
  dirtyFields: {},
  touchedFields: {},
  disabled: false,
};

export const useFormContextOrFallBack = (): {
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
} => {
  const formContext = useFormContext();

  if (formContext) {
    return {
      register: formContext.register,
      formState: formContext.formState,
    };
  }

  const registerFunction = ((_param: string, options?: RegisterOptions<FieldValues, string>) =>
    options) as UseFormRegister<FieldValues>;
  return {
    register: registerFunction,
    formState: EMPTY_FORM_STATE,
  };
};
