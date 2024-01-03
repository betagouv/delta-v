import useResponsive from '@/api/hooks/useResponsive';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Responsive } from '@/styles/responsive';
import { HomepageAgentDesktop } from '@/templates/HomepageAgentDesktop';
import { HomepageAgentMobile } from '@/templates/HomepageAgentMobile';

const Index = () => {
  const windowSize = useResponsive(window);
  const isMobile = windowSize.width ? windowSize.width < Responsive.tablet : false;

  return <AgentRoute>{isMobile ? <HomepageAgentMobile /> : <HomepageAgentDesktop />}</AgentRoute>;
};

export default Index;
