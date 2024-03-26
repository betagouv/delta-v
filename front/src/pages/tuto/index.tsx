import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { StepFour } from '@/components/organisms/Tuto/Steps/StepFour';
import { StepOne } from '@/components/organisms/Tuto/Steps/StepOne';
import { StepThree } from '@/components/organisms/Tuto/Steps/StepThree';
import { StepTwo } from '@/components/organisms/Tuto/Steps/StepTwo';
import { Meta } from '@/layout/Meta';
import { Full } from '@/templates/Full';

const TutorialPage = () => {
  return (
    <Full
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <Swiper
        spaceBetween={40}
        pagination={{
          clickable: true,
          bulletClass: 'h-3 w-3 inline-block border border-middle-gray rounded-full ml-5',
          bulletActiveClass: 'border-0 bg-primary-500',
        }}
        modules={[Pagination]}
        className="flex w-full flex-1 flex-col"
      >
        <SwiperSlide className="h-full">
          <StepOne />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <StepTwo />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <StepThree />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <StepFour />
        </SwiperSlide>
      </Swiper>
    </Full>
  );
};

export default TutorialPage;
