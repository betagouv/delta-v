export const formatValidationsErrors = (
  data: Record<string, any> = {},
): { name: string; message: string; type: string }[] => {
  const validationErrors = data?.context?.validationErrors || [];
  const formattedErrors = validationErrors.map((err: any) => ({
    name: err.path.slice(1).join('.'),
    message: err.message,
    type: err.type,
  }));

  return formattedErrors;
};
