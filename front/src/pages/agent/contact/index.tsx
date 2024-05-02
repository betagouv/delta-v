import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useCreateFeedbackMutation } from '@/api/hooks/useAPIFeedback';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { TitleAgent } from '@/components/atoms/TitleAgent';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { ModalDeleteAttachmentDesktop } from '@/components/organisms/ModalDeleteAttachmentDesktop';
import { ModalDeleteAttachmentMobile } from '@/components/organisms/ModalDeleteAttachmentMobile';
import { ModalEditAttachmentDesktop } from '@/components/organisms/ModalEditAttachmentDesktop';
import { ModalEditAttachmentMobile } from '@/components/organisms/ModalEditAttachmentMobile';
import {
  ModalValidateFeedbackInfoMobile,
  ModalValidateFeedbackInfoDesktop,
} from '@/components/organisms/ModalValidateFeedbackInfo';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import clsxm from '@/utils/clsxm';
import { RoutingAgent } from '@/utils/const';
import { isValidFileType, MAX_FILE_SIZE } from '@/utils/fileValidator';

export interface FormContactUsData {
  comment: string;
  files?: File[];
}

const ContactPage = () => {
  const router = useRouter();
  const schema = yup.object({
    comment: yup.string().required('Minimum 10 caractères').min(10, 'Minimum 10 caractères'),
    id: yup.string(),
    files: yup
      .mixed()
      .test('fileType', "L'image n'est pas au bon format", (value) => {
        if (value.length > 0) return isValidFileType('image', value[0]);
        return true;
      })
      .test('fileSize', "La taille de l'image est trop grande", (value) => {
        if (value.length > 0) return value[0].size <= MAX_FILE_SIZE;
        return true;
      })
      .notRequired(),
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
  const [isErrorFile, setIsErrorFile] = useState(false);

  useEffect(() => {
    if (submitCount === 0) {
      return;
    }
    if (submitCount > 0) {
      setIsError(!isValid);
    }
  }, [submitCount]);

  useEffect(() => {
    if (watch('comment').length < 10 && watch('comment').length > 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [watch('comment')]);

  useEffect(() => {
    console.log(watch('files'));
    if (
      (watch('files')?.[0]?.size ?? 0) > MAX_FILE_SIZE ||
      !isValidFileType('image', watch('files')?.[0])
    ) {
      setIsErrorFile(true);
    } else {
      setIsErrorFile(false);
    }
  }, [watch('files')]);

  const [openDeleteAttachmentDesktop, setOpenDeleteAttachmentDesktop] = useState(false);
  const [openDeleteAttachmentMobile, setOpenDeleteAttachmentMobile] = useState(false);
  const [openEditAttachmentDesktop, setOpenEditAttachmentDesktop] = useState(false);
  const [openEditAttachmentMobile, setOpenEditAttachmentMobile] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [file, setFile] = useState<File>();
  const [urlFile, setUrlFile] = useState<string | undefined>();

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
      file: data.files?.[0],
    });
    setFile(undefined);
  };

  const onClickDeleteAttachment = () => {
    if (isMobile) {
      setOpenEditAttachmentDesktop(false);
      setOpenEditAttachmentMobile(true);
    } else {
      setOpenEditAttachmentMobile(false);
      setOpenEditAttachmentDesktop(true);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrlFile(URL.createObjectURL(e.target.files[0]));
    }
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
          className="md:p-0 justify-between flex flex-col py-6 px-4 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 md:min-h-[420px]">
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
                  additionalClassName="md:max-w-[668px] h-[185px] min-h-[0px]"
                  preventErrorShift
                />
              </div>

              {file && urlFile ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-5 justify-between md:justify-start">
                    <div className="grid grid-cols-[16px_1fr] gap-1 items-center w-40">
                      <Icon
                        name={isErrorFile ? 'cross' : 'paperclip'}
                        size="base"
                        color={isErrorFile ? 'cancel' : 'primary'}
                      />
                      <NextLink
                        href={urlFile}
                        target="_blank"
                        className={clsxm({
                          'relative top-[-2px] line-clamp-1 text-black': true,
                          'text-error': !!isErrorFile,
                        })}
                      >
                        <Typography
                          size="text-xs"
                          desktopSize="text-xs"
                          color={isErrorFile ? 'error' : 'black'}
                          underline
                        >
                          {file.name}
                        </Typography>
                      </NextLink>
                    </div>
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={onClickDeleteAttachment}
                    >
                      <Typography size="text-xs" desktopSize="text-xs" weight="bold" underline>
                        Modifier
                      </Typography>
                    </div>
                  </div>
                  <div data-testid="error-element" className="flex" id="input-error">
                    {isErrorFile && (
                      <Typography size="text-3xs" desktopSize="md:text-[8px]" color="error" italic>
                        L'image ne correspond pas au format pré requis : <br />
                        JPG ou PNG, taille maximale 10Mo
                      </Typography>
                    )}
                  </div>
                </div>
              ) : (
                <InputGroup
                  type="file"
                  name="file"
                  register={register('files')}
                  onFileChange={onFileChange}
                  fileVariant="outlined"
                  fileSubtitle="Formats JPG ou PNG, taille maximale 10Mo"
                />
              )}
            </div>
          </div>
          <div className="w-[118px] self-center md:self-start mb-4">
            <Button type="submit" disabled={isError || watch('comment')?.length < 0} size="sm">
              Envoyer
            </Button>
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
        <ModalDeleteAttachmentDesktop
          open={openDeleteAttachmentDesktop}
          onClose={() => setOpenDeleteAttachmentDesktop(false)}
          onDelete={() => {
            setFile(undefined);
            setOpenDeleteAttachmentDesktop(false);
          }}
        />
        <ModalDeleteAttachmentMobile
          open={openDeleteAttachmentMobile}
          onClose={() => setOpenDeleteAttachmentMobile(false)}
          onDelete={() => {
            setFile(undefined);
            reset({
              files: undefined,
            });
            setOpenDeleteAttachmentMobile(false);
          }}
        />
        <ModalEditAttachmentDesktop
          open={openEditAttachmentDesktop}
          onClose={() => setOpenEditAttachmentDesktop(false)}
          onDelete={() => {
            setOpenEditAttachmentDesktop(false);
            setOpenDeleteAttachmentDesktop(true);
          }}
          onFileChange={onFileChange}
          register={register}
        />
        <ModalEditAttachmentMobile
          open={openEditAttachmentMobile}
          onClose={() => setOpenEditAttachmentMobile(false)}
          onDelete={() => {
            setOpenEditAttachmentMobile(false);
            setOpenDeleteAttachmentMobile(true);
          }}
          onFileChange={onFileChange}
          register={register}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default ContactPage;
