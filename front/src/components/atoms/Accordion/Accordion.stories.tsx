import { useEffect, useState } from 'react';

import { Meta } from '@storybook/react';
import { scroller } from 'react-scroll';

import { Accordions } from './Accordions';

export default {
  title: 'Components/Atoms/Accordions',
  component: Accordions,
} as Meta;

const items = [
  {
    id: '1',
    question: 'Vêtements',
    answer: (
      <>
        Test
        <br />
        Bonsoir
      </>
    ),
  },
  {
    id: '2',
    question: 'Tissus',
    answer: 'Tissus',
  },
  {
    id: '3',
    question: 'Chaussures',
    answer: (
      <>
        Test
        <br />
        Bonjour
      </>
    ),
  },
];

export const withVariant = (): JSX.Element => {
  const linkId = '2';
  const [currentOpenId, setCurrentOpenId] = useState(linkId);

  useEffect(() => {
    if (linkId) {
      setCurrentOpenId(linkId);

      scroller.scrollTo(linkId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [linkId]);

  return (
    <div className="p-3">
      <br />
      <Accordions
        items={items}
        currentOpenId={currentOpenId}
        setOpenId={(id: string) => setCurrentOpenId(id)}
      />
      <br />
    </div>
  );
};
