import classNames from 'classnames';
import { useRouter } from 'next/router';

import { SvgIcon, SvgNames } from '../SvgIcon';

export interface TabItem {
  title: React.ReactNode;
  icon: SvgNames;
  path?: string;
}

interface TabBarProps {
  items: TabItem[];
}

export const TabBar: React.FC<TabBarProps> = ({ items }: TabBarProps) => {
  const router = useRouter();
  const { pathname } = router;
  const splitPath = pathname.split('/');

  const renderTabBarItem = (title: React.ReactNode, icon: SvgNames, path?: string) => {
    const activeTab = splitPath[1] === path?.split('/')[1];
    return (
      <div
        className={classNames({
          'flex flex-col items-center flex-1': true,
          'font-bold': activeTab,
          'opacity-40': !activeTab,
        })}
        onClick={() => router.push(path ?? '/')}
        key={path}
      >
        <div className="mb-2 h-6 w-6">
          <SvgIcon name={icon} />
        </div>
        <p className="text-center text-[10px] leading-none md:text-[12px]">{title}</p>
      </div>
    );
  };

  return (
    <div className="sticky bottom-0 z-50 flex w-full flex-row border-t-4 border-primary-600 bg-white py-2">
      {items.map((item) => renderTabBarItem(item.title, item.icon, item.path))}
    </div>
  );
};

export default TabBar;
