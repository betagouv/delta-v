import React from 'react';

import { Meta } from '@storybook/react';

import { Table } from './Table';

export default {
  title: 'Components/Molecules/Table',
  component: Table,
} as Meta;

const headers = [
  {
    title: 'societes',
  },
  {
    title: '',
  },
  {
    title: 'tjm',
  },
];

export interface DataLine {
  societes: string;
  resources: string;
  tjm: number;
  image: string;
}

const data: DataLine[] = [
  {
    societes: 'ADN',
    resources: 'florian',
    tjm: 450,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    societes: 'ADB',
    resources: 'farid',
    tjm: 500,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    societes: 'ADC',
    resources: 'fred',
    tjm: 550,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];

const renderLine = (dataLine: DataLine) => {
  return (
    <>
      <td className="px-base py-small">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0">
            <img className="h-10 w-10 rounded-full" src={dataLine.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium ">{dataLine.societes}</div>
          </div>
        </div>
      </td>
    </>
  );
};

export const withVariant = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <Table headers={headers} data={data} render={(item) => renderLine(item)} />
  </div>
);
