import cs from 'classnames';

import { LinkWithIcon } from '@/components/common/LinkWithIcon';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { MY_ACCOUNT_MENU_AGENT_ITEMS } from '@/utils/const';

const MyAccountPage = () => {
  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Mot de passe oublié"
          description="Page de demande de création d'un nouveau mot de passe"
        />
      }
    >
      <TitleHeaderAgent
        title="Mot de passe oublié"
        bgColorClass="bg-white"
        switchWordPosition={3}
      />
      <div
        className={cs({
          '[&>.scan-region-highlight]:hidden mb-1 flex flex-col gap-5 mt-4 px-8 pt-9': true,
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
    </MainAuth>
  );
};

export default MyAccountPage;
