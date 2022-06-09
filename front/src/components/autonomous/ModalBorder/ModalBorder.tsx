import React from 'react';

import { Badge } from '@/components/common/Badge';
import Modal from '@/components/common/Modal';

interface ModalBorderProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalBorder: React.FC<ModalBorderProps> = ({ onClose, open }) => {
  return (
    <>
      <Modal
        title="Qu’est ce qu’un déplacement de résident frontalier ?"
        open={open}
        onClose={onClose}
      >
        <div className="flex flex-col">
          <p className="text-extraSmall">
            Vous êtes <b>résident</b> de
          </p>
          <div className="mt-small grid w-full grid-cols-2 gap-base">
            <Badge
              name="Ain"
              department="01"
              svgName="ain"
              rounded="lg"
              // TODO: add onClick function
            />
            <Badge
              name="Haute-Savoie"
              department="74"
              svgName="hauteSavoie"
              rounded="lg"
              // TODO: add onClick function
            />
          </div>
          <p className="text-extraSmall mt-small">
            Et occupez un <b>emploi en Suisse</b> 🇨🇭
          </p>
          <p className="text-extraSmall mt-small">
            Les <b>frontaliers</b> sont les personnes ayant leur résidence dans
            <b>la zone frontalière</b>.
          </p>
          <p className="text-extraSmall mt-small">
            <b>La zone frontalière</b> est une <b>zone de 15 kilomètres</b> de profondeur à vol
            d’oiseau à compter de la frontière.
          </p>
        </div>
      </Modal>
    </>
  );
};
