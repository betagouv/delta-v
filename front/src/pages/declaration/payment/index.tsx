import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useInitiatePaymentMutation } from '@/api/hooks/useApiPayment';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const PaymentPage = () => {
  const router = useRouter();
  const { declarationId } = router.query;

  const initiatePaymentMutation = useInitiatePaymentMutation({
    onSuccess: (data) => {
      console.log('data', data);
      window.location.href = data.paymentLink;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePayment = () => {
    if (declarationId) {
      initiatePaymentMutation.mutate({ declarationId: declarationId as string });
    } else {
      toast.error('Declaration ID is missing');
    }
  };

  return (
    <Main meta={<Meta title="Payment" description="Payment page" />}>
      <section className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
          Payment Process
        </Typography>
        <Button onClick={handlePayment}>Initiate Payment</Button>
      </section>
    </Main>
  );
};

export default PaymentPage;
