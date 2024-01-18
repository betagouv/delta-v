import { FilterHistoryItemProps } from '../FilterHistory';
import { SearchDisplayType } from '../Search';

export interface FilterBarForm {
  status?: string[];
  meanOfTransport?: string[];
  newsTags?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
  search: string | null;
}
export type FilterBarProps = {
  title: string;
  searchType?: SearchDisplayType;
  noSearchBar?: boolean;
  noPeriodInput?: boolean;
  filterHistories?: FilterHistoryItemProps[];
  filtersCount?: number;
  onValidateFilter: (data: FilterBarForm) => void;
  withMeanOfTransportFilter?: boolean;
  withStatusFilter?: boolean;
  withNewsTagsFilter?: boolean;
  defaultSearchValue?: string;
  filterBarData?: FilterBarForm;
  open: boolean;
  setOpen: (open: boolean) => void;
};
