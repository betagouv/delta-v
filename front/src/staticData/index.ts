import { SvgNames } from '@/components/common/SvgIcon';

export interface DataElement {
  id: string;
  question: string;
  iconName?: SvgNames;
  answer: React.ReactElement;
  search?: string[];
}

export interface BlocElements {
  title: string;
  elements: DataElement[];
}
