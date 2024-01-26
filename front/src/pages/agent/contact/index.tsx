import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useCreateFeedbackMutation } from '@/api/hooks/useAPIFeedback';
import {
  ModalValidateFeedbackInfoMobile,
  ModalValidateFeedbackInfoDesktop,
} from '@/components/autonomous/ModalValidateFeedbackInfo';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { TitleAgent } from '@/components/common/TitleAgent';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { RoutingAgent } from '@/utils/const';

export interface FormContactUsData {
  comment: string;
}

const ContactPage = () => {
  const router = useRouter();
  const schema = yup.object({
    comment: yup.string().required('Le message est requis').min(10, 'Minimum 10 caractères'),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormContactUsData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
    },
  });
  const [openValidateFeedbackInfoMobile, setOpenValidateFeedbackInfoMobile] = useState(false);
  const [openValidateFeedbackInfoDesktop, setOpenValidateFeedbackInfoDesktop] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const onClickToRedirectToHome = () => {
    setOpenValidateFeedbackInfoMobile(false);
    setOpenValidateFeedbackInfoDesktop(false);
    router.push(`${RoutingAgent.home}?mode=tools`);
  };

  const feedbackId = uuidv4();

  const createFeedbackMutation = useCreateFeedbackMutation({
    onSuccess: () => {
      reset();
      if (isMobile) {
        setOpenValidateFeedbackInfoMobile(true);
      } else {
        setOpenValidateFeedbackInfoDesktop(true);
      }
    },
  });

  const onSubmit = (data: FormContactUsData) => {
    createFeedbackMutation.mutate({
      feedbackId,
      comment: data.comment,
    });
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Contact"
        linkButton={`${RoutingAgent.home}?mode=tools`}
        isMobile={isMobile}
      >
        <form
          className="md:p-0 justify-between flex flex-col py-6 px-4 flex-1 gap-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <TitleAgent
              title="On vous écoute"
              colorClassnameOne="text-black"
              colorClassnameTwo="text-primary-600"
              switchWordPosition={2}
              textPosition="text-left"
            />
            <Typography size="text-xs" color="black">
              Vous souhaitez nous faire parvenir une remarque, <br /> une optimisation, une demande
              particulière ?
            </Typography>
            <div className="mt-4">
              <InputGroup
                type="textarea"
                placeholder="Saisissez votre message..."
                name="comment"
                register={register('comment')}
                error={!isValid ? errors?.comment?.message : undefined}
              />
            </div>
          </div>
          <div className="w-[118px] self-center md:self-start mb-4">
            <button
              className={`py-3 w-full rounded-full  text-white ${
                isValid ? 'bg-primary-600' : 'bg-disabled-bg'
              } text-xs`}
              type="submit"
              disabled={!isValid}
            >
              Envoyer
            </button>
          </div>
        </form>
        <ModalValidateFeedbackInfoMobile
          open={openValidateFeedbackInfoMobile}
          onClose={() => setOpenValidateFeedbackInfoMobile(false)}
          onClickToRedirect={onClickToRedirectToHome}
        />
        <ModalValidateFeedbackInfoDesktop
          open={openValidateFeedbackInfoDesktop}
          onClose={() => setOpenValidateFeedbackInfoDesktop(false)}
          onClickToRedirect={onClickToRedirectToHome}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default ContactPage;
