import { useRouter } from 'next/router';

import { NavBar } from '@/components/common/NavBar';
import { Typography } from '@/components/common/Typography';
import { MenuAgentItem } from '@/utils/const';

interface MainAgentDesktopProps {
  children: React.ReactNode;
  navbarItems?: MenuAgentItem[];
  title?: string;
}

const MainAgentDesktop = ({ children, navbarItems, title }: MainAgentDesktopProps) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      {navbarItems && (
        <div className="flex flex-col pl-[103px] pr-20 gap-[14px] border-b">
          <NavBar links={navbarItems} activePath={path} />
        </div>
      )}
      <div className="flex flex-col px-[126px] pt-[60px] gap-[30px]">
        {title && <Typography size="text-3xl">{title}</Typography>}
        {children}
      </div>
    </>
  );
};

export { MainAgentDesktop };
