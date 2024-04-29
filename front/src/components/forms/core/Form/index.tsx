/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  FormState,
  Path,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import * as yup from 'yup';

interface BaseFormProps<T> {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  render?: (props: UseFormReturn<any, any>) => React.ReactElement;
  schema?: yup.AnyObjectSchema;
  defaultValues?: DeepPartial<T>;
  logErrors?: boolean;
  errors?: Record<string, string>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  id?: string;
  resetOnSubmit?: boolean;
}

interface FormPropsOnlyTouched<T> extends BaseFormProps<T> {
  onSubmit: (data: Partial<T>) => void;
  onlyTouchedFields?: true;
}

interface FormPropsDefault<T> extends BaseFormProps<T> {
  onSubmit: (data: T) => void;
  onlyTouchedFields?: false;
}

type FormProps<T> = FormPropsOnlyTouched<T> | FormPropsDefault<T>;

export type FormRef = {
  getFormState: () => FormState<any>;
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    className,
    children,
    render,
    onSubmit,
    defaultValues,
    schema,
    onlyTouchedFields,
    resetOnSubmit,
    logErrors,
    errors,
    mode = 'onSubmit',
    ...rest
  } = props;

  const useFormProps = useForm<T>({
    mode,
    resolver: schema ? yupResolver(schema) : undefined,
    shouldFocusError: false,
  });

  const { handleSubmit, formState, setValue, reset, setError } = useFormProps;
  const { isSubmitSuccessful } = useFormProps.formState;

  if (logErrors) {
    // eslint-disable-next-line no-console
    console.error(formState.errors);
  }

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => setValue(key as Path<T>, value));
    }
  }, [defaultValues]);

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) =>
        setError(key as Path<T>, {
          type: 'custom',
          message: value,
        }),
      );
    }
  }, [errors]);

  React.useEffect(() => {
    if (isSubmitSuccessful && resetOnSubmit) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reset({}, { keepValues: true });
    }
  }, [resetOnSubmit, isSubmitSuccessful, reset]);

  const preOnSubmit = (data: T) => {
    if (onlyTouchedFields) {
      const touchedKeys = Object.keys(formState.touchedFields);

      if (touchedKeys.length > 0) {
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([key]) => touchedKeys.includes(key)),
        );
        onSubmit(filteredData as Partial<T>);
        return;
      }
      onSubmit({});
      return;
    }
    onSubmit(data);
  };

  return (
    <FormProvider {...useFormProps}>
      <form className={className} onSubmit={handleSubmit(preOnSubmit)} {...rest}>
        {render ? render(useFormProps) : children}
      </form>
    </FormProvider>
  );
};
