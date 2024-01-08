import cs from 'classnames';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { LinkWithIcon } from '@/components/common/LinkWithIcon';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { MY_ACCOUNT_MENU_AGENT_ITEMS } from '@/utils/const';

const MyAccountPage = () => {
  return (
    <AgentRoute>
      <MainAgent meta={<Meta title="Déclare Douane" description="Mon compte" />}>
        <TitleHeaderAgent
          title="Mon compte"
          bgColorClass="bg-white"
          colorClassnameOne="text-black"
          colorClassnameTwo="text-primary-600"
        />
        <div
          className={cs({
            '[&>.scan-region-highlight]:hidden mb-1 flex flex-col gap-5 mt-4 px-8 ': true,
          })}
        >
          {MY_ACCOUNT_MENU_AGENT_ITEMS.map((item) => {
            return (
              <div key={item.title}>
                <LinkWithIcon
                  href={item.path}
                  key={item.title}
                  svgName={item.svgIcon}
                  name={item.title}
                  withBgColor={item.id === 'declaration'}
                  disabled={item.disabled}
                >
                  {item.title}
                </LinkWithIcon>
              </div>
            );
          })}
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default MyAccountPage;
