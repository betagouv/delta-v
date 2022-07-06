import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import Modal from '../Modal';
import { SvgIcon, SvgNames } from '../SvgIcon';

export interface TabItem {
  title: string;
  icon: SvgNames;
  path?: string;
}

interface TabBarProps {
  items: TabItem[];
}

export const TabBar: React.FC<TabBarProps> = ({ items }: TabBarProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const splitPath = pathname.split('/');

  useEffect(() => {}, []);

  const renderTabBarItem = (title: string, icon: SvgNames, path?: string) => {
    const activeTab = splitPath[1] === path?.split('/')[1];
    return (
      <div
        className={classNames({
          'tab-bar-btn flex-1': true,
          'font-bold': activeTab,
          'opacity-40': !activeTab,
        })}
        onClick={() => (path ? router.push(path) : setOpen(true))}
        key={path}
      >
        <div className="mb-2 h-lightBase w-lightBase">
          <SvgIcon name={icon} />
        </div>
        <p className="text-center text-[9px] leading-none md:text-[12px]">{title}</p>
      </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 z-50 flex w-full flex-row border-t-4 border-primary-600 bg-white py-extraSmall">
        {items.map((item) => renderTabBarItem(item.title, item.icon, item.path))}
      </div>
      <Modal
        open={open}
        title="Cette rubrique n' existe pas encore."
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default TabBar;
