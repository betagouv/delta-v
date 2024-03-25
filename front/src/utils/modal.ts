import DownModal from '@/components/molecules/DownModal';
import Modal from '@/components/molecules/Modal';

export enum ModalType {
  DOWN = 'down',
  CENTER = 'center',
}

export const getModalComponent = (modalType: ModalType) => {
  switch (modalType) {
    case ModalType.DOWN:
      return DownModal;
    case ModalType.CENTER:
      return Modal;
    default:
      return DownModal;
  }
};
