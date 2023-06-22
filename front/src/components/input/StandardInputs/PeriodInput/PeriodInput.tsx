import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';

export interface IPeriodInputOptions {
  onChangeDate: (startDate: Date | null, endDate: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
  noBorder?: boolean;
}

export const PeriodInput: React.FC<IPeriodInputOptions> = ({
  startDate,
  endDate,
  noBorder = false,
  onChangeDate,
}: IPeriodInputOptions) => {
  return (
    <div className="flex w-full flex-row gap-[2px] justify-center z-50">
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => onChangeDate(date, endDate)}
        startDate={startDate}
        endDate={endDate}
        maxDate={
          endDate
            ? dayjs(endDate).subtract(1, 'day').toDate()
            : dayjs(new Date()).subtract(1, 'day').toDate()
        }
        placeholderText="Du : jj/mm/aaaa"
        className={cs({
          'justify-center max-w-[157px] rounded-l-full border border-secondary-300 focus:ring-0 pl-5  placeholder:italic placeholder:text-secondary-400':
            true,
          'border-none': noBorder,
        })}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <header
            style={{
              margin: 20,
              marginBottom: 0,
              display: 'flex',
            }}
            className="flex justify-between items-center"
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <Icon name="chevron-left" size="base" color="black" />
            </button>
            <Typography color="primary" size="text-lg">
              {dayjs(date).format('MMMM YYYY')}
            </Typography>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <Icon name="chevron-right" size="base" color="black" />
            </button>
          </header>
        )}
        dayClassName={(day) =>
          dayjs(day).format('YYYY-MM-DD') === dayjs(startDate).format('YYYY-MM-DD')
            ? 'text-secondary-300'
            : 'bg-white'
        }
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => onChangeDate(startDate, date)}
        endDate={endDate}
        startDate={startDate}
        placeholderText="Au : jj/mm/aaaa"
        minDate={dayjs(startDate).add(1, 'day').toDate()}
        maxDate={dayjs(new Date()).toDate()}
        className={cs({
          'justify-center max-w-[157px] rounded-r-full border border-secondary-300 pl-5 focus:ring-0 placeholder:italic placeholder:text-secondary-400':
            true,
          'border-none': noBorder,
        })}
        calendarClassName={`left-[-159px] ${noBorder ? 'border-none' : ''}`}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <header
            style={{
              margin: 20,
              marginBottom: 0,
            }}
            className="flex justify-between items-center"
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <Icon name="chevron-left" size="base" color="black" />
            </button>
            <Typography color="primary" size="text-lg">
              {dayjs(date).format('MMMM YYYY')}
            </Typography>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <Icon name="chevron-right" size="base" color="black" />
            </button>
          </header>
        )}
      />
    </div>
  );
};

export default PeriodInput;
