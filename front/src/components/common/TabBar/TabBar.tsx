import classNames from 'classnames';
import { useRouter } from 'next/router';

import { SvgIcon, SvgNames } from '../SvgIcon';

export interface TabItem {
  title: React.ReactNode;
  icon: SvgNames;
  path?: string;
  simulator?: boolean;
  declaration?: boolean;
}

interface TabBarProps {
  items: TabItem[];
  openSimulator: () => void;
  openDeclaration: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  items,
  openSimulator,
  openDeclaration,
}: TabBarProps) => {
  const router = useRouter();
  const { pathname } = router;
  const splitPath = pathname.split('/');

  const renderTabBarItem = (
    { icon, title, path, simulator, declaration }: TabItem,
    index: number,
  ) => {
    const activeTab = splitPath[1] === path?.split('/')[1];

    const onClickMenu = () => {
      if (simulator) {
        openSimulator();
      } else if (declaration) {
        openDeclaration();
      } else if (path) {
        router.push(path);
      }
    };
    return (
      <div
        className={classNames({
          'flex flex-col items-center flex-1': true,
          'font-bold': activeTab,
          'opacity-40': !activeTab,
        })}
        onClick={onClickMenu}
        key={index}
      >
        <div className="mb-2 h-6 w-auto">
          <SvgIcon name={icon} />
        </div>
        <p className="text-center text-[10px] leading-none md:text-[12px]">{title}</p>
      </div>
    );
  };

  return (
    <div className="sticky bottom-0 z-30 flex w-full flex-row border-t-4 border-primary-600 bg-white py-2">
      {items.map((item, index) => renderTabBarItem(item, index))}
    </div>
  );
};

export default TabBar;
