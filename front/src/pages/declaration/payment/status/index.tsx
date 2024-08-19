import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useVerifyPaymentStatusMutation } from '@/api/hooks/useApiPayment';
import { VerifyPaymentStatusResponse } from '@/api/lib/payment';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const PaymentVerificationPage = () => {
  const router = useRouter();
  const { declarationId } = router.query;
  const [status, setStatus] = useState('pending');
  const [attempts, setAttempts] = useState(0);

  const verifyPaymentStatusMutation = useVerifyPaymentStatusMutation({
    onSuccess: (data: VerifyPaymentStatusResponse) => {
      setStatus(data.status);
      if (data.status === 'success') {
        router.push('/declaration/payment/success');
      } else if (data.status === 'error' || attempts >= 20) {
        router.push('/declaration/payment/error');
      }
    },
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (status === 'pending' && attempts < 20) {
      console.log('🚀 ~ useEffect ~ status:', status);
      const interval = setInterval(() => {
        verifyPaymentStatusMutation.mutate({ declarationId: declarationId as string });
        setAttempts((prev) => prev + 1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [status, attempts]);

  return (
    <Main meta={<Meta title="Payment Verification" description="Payment verification page" />}>
      <section className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
          Verifying Payment...
        </Typography>
      </section>
    </Main>
  );
};

export default PaymentVerificationPage;
