import { useMediaQuery } from 'react-responsive';

import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import DeclarationProductPageDesktop from '@/templates/DeclarationProductPageDesktop';
import DeclarationProductPageMobile from '@/templates/DeclarationProductPageMobile';

const Declaration = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return isMobile ? <DeclarationProductPageMobile /> : <DeclarationProductPageDesktop />;
};

export default declarationAgent(Declaration);
