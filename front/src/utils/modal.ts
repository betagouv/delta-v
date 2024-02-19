import DownModal from '@/components/common/DownModal';
import Modal from '@/components/common/Modal';

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
