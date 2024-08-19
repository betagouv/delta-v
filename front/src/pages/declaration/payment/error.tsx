import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const PaymentErrorPage = () => {
  return (
    <Main meta={<Meta title="Payment Error" description="Payment error page" />}>
      <section className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
          Payment Failed!
        </Typography>
      </section>
    </Main>
  );
};

export default PaymentErrorPage;
