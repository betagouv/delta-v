// import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

// import { useResetPasswordMutation } from '@/api/hooks/useAPIAuth';
// import { Button } from '@/components/common/Button';
// import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
// import { Typography } from '@/components/common/Typography';
// import { InputGroup } from '@/components/input/InputGroup';
// import { Meta } from '@/layout/Meta';
// import { MainAuth } from '@/templates/MainAuth';
// import { getErrorFields } from '@/utils/errorFields';

// export interface FormForgetPasswordData {
//   password: string;
// }

// const schema = yup.object({
//   password: yup
//     .string()
//     .required('Le mot de passe est requis')
//     .matches(/[A-Z]+/, 'Le mot de passe doit avoir au moins 1 majuscule')
//     .matches(/[a-z]+/, 'Le mot de passe doit avoir au moins 1 minuscule')
//     .matches(/\d+/, 'Le mot de passe doit avoir au moins 1 chiffre')
//     .matches(/[@$!%*#?&]+/, 'Le mot de passe doit avoir au moins 1 caractère spécial')
//     .min(8, 'Le mot de passe doit faire au moins 8 caractères'),
// });

// const ResetPasswordPage = () => {
//   const router = useRouter();
//   const { token } = router.query;
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     formState: { isDirty, isValid },
//   } = useForm<FormForgetPasswordData>({
//     defaultValues: {
//       password: undefined,
//     },
//     resolver: yupResolver(schema),
//   });

//   const resetPasswordMutation = useResetPasswordMutation();
//   const apiError = resetPasswordMutation.error ?? undefined;
//   const { data: apiSuccess } = resetPasswordMutation;

//   const onSubmit = async (data: FormForgetPasswordData) => {
//     resetPasswordMutation.mutate({
//       token: token as string,
//       password: data.password,
//     });
//   };

//   return (
//     <MainAuth
//       meta={
//         <Meta
//           title="Simulateur Déclare Douanes"
//           description="Simuler la déclaration de douane en quelques clics"
//         />
//       }
//     >
//       <TitleHeaderAgent
//         colorClassnameOne="text-black"
//         colorClassnameTwo="text-primary-600"
//         title="Créer un nouveau mot de passe"
//         bgColorClass="bg-white"
//       ></TitleHeaderAgent>
//       <section className="mt-12 flex flex-col items-center self-center">
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6 w-80">
//           <InputGroup
//             label="Mon nouveau mot de passe *"
//             type="password"
//             name="password"
//             fullWidth={true}
//             placeholder="Nouveau mot de passe"
//             register={register('password')}
//             error={errors?.password?.message ?? getErrorFields('password', apiError)}
//             helperText="1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial,
//             8 caractères minimum"
//           />
//           <InputGroup
//             label="Confirmer le mot de passe *"
//             type="password"
//             name="confirmPassword"
//             fullWidth={true}
//             placeholder="Nouveau mot de passe"
//             register={register('password')}
//             error={errors?.password?.message ?? getErrorFields('password', apiError)}
//           />
//           <div className="flex flex-col gap-2 px-20 pt-8 pb-9">
//             {apiError && (
//               <Typography color="error" textPosition="text-center">
//                 {apiError.message}
//               </Typography>
//             )}
//             {apiSuccess && (
//               <Typography color="success" textPosition="text-center">
//                 {apiSuccess.message}
//               </Typography>
//             )}
//             <Button fullWidth={true} type="submit" disabled={!isDirty || !isValid} size="sm">
//               Valider
//             </Button>
//           </div>
//           <Typography color="black" size="text-2xs" textPosition="text-center">
//             Champs obligatoires *
//           </Typography>
//         </form>
//       </section>
//     </MainAuth>
//   );
// };

// export default ResetPasswordPage;

import { useRouter } from 'next/router';

import { useValidationEmailMutation } from '@/api/hooks/useAPIAuth';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const RegisterValidationPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const onSuccess = () => {
    router.push(RoutingAuthentication.login);
  };

  const validationEmailMutation = useValidationEmailMutation({ onSuccess });
  const apiError = validationEmailMutation.error;
  const { data: apiSuccess } = validationEmailMutation;

  const handleValidate = () => {
    router.push(`${RoutingAuthentication.resetPasswordForm}?token=${token}`);
  };

  return (
    <MainAuth
      meta={
        <Meta
          title="Déclare Douanes - Activation de compte Agent"
          description="Page de validation de la création d'un compte agent des douanes"
        />
      }
    >
      <div className="my-auto flex flex-col items-center self-center gap-8">
        <div className="pb-16">
          <Typography
            variant="h1"
            size="text-xl"
            weight="bold"
            textPosition="text-center"
            color="black"
          >
            Réinitialisation de votre mot de passe
          </Typography>
        </div>
        <div className="flex flex-col gap-5 max-w-xs">
          <Typography size="text-xs" color="black">
            Bonjour,
          </Typography>
          <Typography size="text-xs" color="black">
            Il semblerait que vous ayez oublié votre mot de passe, pas de panique !
          </Typography>
          <Typography size="text-xs" color="black">
            Pour en définir un nouveau, il vous suffit de cliquer sur ce lien :
          </Typography>
        </div>
        <div className="w-50 flex flex-col self-center items-center gap-2 mt-6">
          {apiSuccess && (
            <Typography color="success" size="text-2xs">
              {apiSuccess.message}
            </Typography>
          )}
          {apiError && (
            <Typography color="error" size="text-2xs">
              {apiError.message}
            </Typography>
          )}
          <Button onClick={handleValidate} fullWidth={true} type="submit" size="sm">
            Modifier mon mot de passe
          </Button>
          <Typography textPosition="text-center" color="primary" size="text-2xs">
            Attention, ce lien est actif XX heures
          </Typography>
        </div>
      </div>
    </MainAuth>
  );
};

export default RegisterValidationPage;
