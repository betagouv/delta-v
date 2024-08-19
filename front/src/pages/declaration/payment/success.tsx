import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const PaymentSuccessPage = () => {
  return (
    <Main meta={<Meta title="Payment Success" description="Payment success page" />}>
      <section className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
          Payment Successful!
        </Typography>
      </section>
    </Main>
  );
};

export default PaymentSuccessPage;
