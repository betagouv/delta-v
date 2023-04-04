import React from 'react';

import classNames from 'classnames';

export type TableData = Record<string, any>;
export interface Header {
  title: string;
}
export interface ITableProps<T extends TableData> {
  data: T[];
  headers: Header[];
  render: (item: T) => React.ReactNode;
}

export const Table = <T extends TableData>({ data, render, headers }: ITableProps<T>) => {
  const isLoading = data.length === 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="-my-2  overflow-x-auto sm:-mx-base lg:-mx-8">
        <div className="flex min-w-full justify-between align-middle sm:px-base lg:px-8">
          <div className="w-full overflow-hidden sm:rounded-lg sm:rounded-tl-none">
            {!isLoading ? (
              <table className="min-w-full">
                <colgroup>
                  <col span={1} style={{ width: '25%' }} />
                  <col span={1} style={{ width: '50%' }} />
                  <col span={1} style={{ width: '25%' }} />
                </colgroup>
                <thead className="items-center">
                  <tr className="last:justify-right">
                    {headers.map((header) => (
                      <th
                        scope="col"
                        className={classNames({
                          'text-left text-sm text-gray-600 font-medium last:text-right': true,
                        })}
                        key={header.title}
                      >
                        <div className="flex flex-row">{header.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((dataItem, index) => (
                    <tr key={index}>{render(dataItem)}</tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
