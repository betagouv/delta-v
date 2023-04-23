import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Typography } from '@/components/common/Typography';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  border?: string;
}

const Declaration = () => {
  const declarationRequest = useStore((state) => state.declaration.appState.declarationRequest);
  const { resetSteps, validateStep4 } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep4: state.validateStep4,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetSteps(4);
  }, []);

  const { handleSubmit } = useForm<FormDeclarationData>({
    defaultValues: {
      border: undefined,
    },
  });

  const onSubmit = (data: FormDeclarationData) => {
    if (!data.border) {
      return;
    }
    validateStep4(data.border === 'true');
    router.push(`/declaration/produits`);
  };

  return (
    <DeclarationSteps
      toProgression={4}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <div className="mt-4 flex flex-col items-center">
        <Typography weight="bold" variant="h2">
          Récapitulatif
        </Typography>
        <div className="flex w-full flex-col gap-4 border-b border-slate-200 p-6 text-center">
          <div>
            <Typography variant="h3" weight="bold" color="primary">
              Age
            </Typography>
          </div>
          <Typography variant="paragraph" weight="bold">
            {declarationRequest.age}
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-4 border-b border-slate-200 p-6 text-center">
          <div>
            <Typography variant="h3" weight="bold" color="primary">
              Transport
            </Typography>
          </div>
          <div className="rounded-md bg-gray-100 p-6">
            <Typography variant="paragraph">{declarationRequest.meanOfTransport}</Typography>
          </div>
        </div>
        <div className="w-full  p-6 text-center">
          <div>
            <Typography variant="h3" weight="bold" color="primary">
              Pays
            </Typography>
          </div>
          <div className="text-gray-500">{declarationRequest.country}</div>
        </div>
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
