import { initiateAgentConnectRequest } from '@/api/lib/auth';
import { ProConnectButtonForm } from '@/components/atoms/ProConnectButtonForm/ProConnectButtonForm';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';

export interface FormLoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const onSubmit = async () => {
    initiateAgentConnectRequest();
  };
  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Authentification agent"
          description="Page d'authentification d'un agent des douanes"
        />
      }
    >
      <section className="justify-center absolute my-auto h-3/4 flex flex-col items-center w-full px-10">
        <div className="mb-16 h-20">
          <SvgIcon name="logoAgent" />
        </div>
        <ProConnectButtonForm onSubmit={onSubmit} />
      </section>
    </MainAuth>
  );
};

export default LoginPage;
