import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useCreateFeedbackMutation } from '@/api/hooks/useAPIFeedback';
import { ModalDeleteAttachment } from '@/components/autonomous/ModalDeleteAttachment';
import {
  ModalValidateFeedbackInfoMobile,
  ModalValidateFeedbackInfoDesktop,
} from '@/components/autonomous/ModalValidateFeedbackInfo';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Icon } from '@/components/common/Icon';
import { TitleAgent } from '@/components/common/TitleAgent';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import clsxm from '@/utils/clsxm';
import { RoutingAgent } from '@/utils/const';

export interface FormContactUsData {
  comment: string;
}

const ContactPage = () => {
  const router = useRouter();
  const schema = yup.object({
    comment: yup.string().required('Minimum 10 caractères').min(10, 'Minimum 10 caractères'),
    id: yup.string(),
  });
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid, submitCount },
  } = useForm<FormContactUsData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
    },
  });
  const [openValidateFeedbackInfoMobile, setOpenValidateFeedbackInfoMobile] = useState(false);
  const [openValidateFeedbackInfoDesktop, setOpenValidateFeedbackInfoDesktop] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (submitCount === 0) {
      return;
    }
    if (submitCount > 0) {
      setIsError(!isValid);
    }
  }, [submitCount]);

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [watch('comment')]);

  const [openDeleteAttachment, setOpenDeleteAttachment] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [file, setFile] = useState<File>();

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
      file,
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
              Vous souhaitez nous faire parvenir une remarque, <br className="md:hidden block" />
              une optimisation, une demande particulière ?
            </Typography>
            <div className="mt-4">
              <InputGroup
                type="textarea"
                placeholder="Saisissez votre message..."
                name="comment"
                register={register('comment')}
                error={isError ? errors?.comment?.message : undefined}
                additionalClassName="md:max-w-[668px] md:h-[185px] md:min-h-[0px]"
              />
            </div>
            {file ? (
              <div className="flex gap-5 items-center flex-row">
                <div className="inline-flex flex-row gap-1 items-center">
                  <Icon name="paperclip" size="sm" color="primary" />
                  <Typography size="text-2xs" weight="bold" underline color="black">
                    {file.name}
                  </Typography>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    className="py-3 w-full rounded-full text-primary-600 text-xs underline"
                    type="submit"
                    disabled={!isValid}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="file"
                className="inline-flex border border-primary-600 text-primary-600 rounded-full px-5 py-2 justify-center items-center self-start"
              >
                <div className="inline-flex flex-row gap-1 items-center">
                  <Icon name="paperclip" size="sm" />
                  <Typography size="text-2xs" weight="bold">
                    Ajouter une pièce jointe
                  </Typography>
                </div>
                <input
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  type="file"
                  className="hidden"
                />
              </label>
            )}
          </div>
          {file ? (
            <div className="flex gap-5 items-center flex-row">
              <div className="inline-flex flex-row gap-0.5 items-center text-primary-600">
                <Icon name="paperclip" size="sm" color="primary" />
                <Typography size="text-2xs" underline color="black">
                  {file.name}
                </Typography>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  className=" text-primary-600 text-xs underline font-bold"
                  type="button"
                  onClick={() => setOpenDeleteAttachment(true)}
                >
                  Modifier
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="file"
              className="inline-flex border border-primary-600 text-primary-600 rounded-full px-5 py-2 justify-center items-center self-start"
            >
              <div className="inline-flex flex-row gap-1 items-center">
                <Icon name="paperclip" size="sm" />
                <Typography size="text-2xs" weight="bold">
                  Ajouter une pièce jointe
                </Typography>
              </div>
              <input
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                type="file"
                className="hidden"
              />
            </label>
          )}
          <div className="w-[118px] self-center md:self-start mb-4">
            <button
              className={clsxm({
                'py-3 w-full rounded-full text-white bg-primary-600 text-xs cursor-pointer': true,
                'bg-disabled-bg cursor-not-allowed': isError,
              })}
              type="submit"
              disabled={isError}
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
        <ModalDeleteAttachment
          open={openDeleteAttachment}
          onClose={() => setOpenDeleteAttachment(false)}
          onDelete={() => {
            setFile(undefined);
            setOpenDeleteAttachment(false);
          }}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default ContactPage;
