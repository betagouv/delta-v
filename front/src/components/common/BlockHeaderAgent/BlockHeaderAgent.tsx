import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';

import { marianne } from '../FontInitializer';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface BlockHeaderAgentProps {
  onSearchAll: (searchValue: string) => void;
  onChangeSearch: (searchValue: string) => void;
  searchValue: string;
}

const ARGUS_URL = 'https://pro.largus.fr/cote/';
const RITA_URL = 'https://www.douane.gouv.fr/rita-encyclopedie/public/accueil/init.action';

export const BlockHeaderAgent: React.FC<BlockHeaderAgentProps> = ({
  onSearchAll,
  onChangeSearch,
  searchValue,
}: BlockHeaderAgentProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center">
        <p
          className={`leading-[90px] text-[100px] ml-[-112px] text-primary-600 text-center font-bold ${marianne.variable} font-marianne`}
        >
          Contrôler
        </p>
        <div className="flex flex-row justify-center items-start">
          <p
            className={`leading-10 text-[50px] text-black font-bold ${marianne.variable} font-marianne`}
          >
            une
          </p>
          <p
            className={`leading-[90px] text-[100px] text-black font-bold ml-4 ${marianne.variable} font-marianne`}
          >
            déclaration
          </p>
        </div>
        <div className="justify-center flex flex-col mt-10">
          <Typography size="text-xs" color="black" textPosition="text-center">
            Vous souhaitez retrouver une déclaration ? <br /> Saisissez les informations recherchées
            de votre déclaration dans le champ ci-dessous
          </Typography>
        </div>
        <div className="flex flex-col justify-center self-center gap-4 mt-5">
          <div className="flex flex-row justify-start items-center gap-[10px]">
            <input
              data-testid="input-search-element"
              placeholder="Numéro de déclaration, nom, prénom..."
              enterKeyHint="search"
              className="block w-[433px] h-10 rounded-full py-2 px-5 text-xs placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none  focus:ring-transparent border-none"
              onChange={(event) => {
                onChangeSearch(event.target.value);
              }}
              autoFocus={true}
            />

            <button
              type="button"
              onClick={() => onSearchAll(searchValue)}
              className="flex flex-row gap-5 bg-primary-600 rounded-full text-white items-center justify-center px-5 py-3"
            >
              <Typography size="text-2xs" color="white">
                Rechercher
              </Typography>
              <Icon name="search" size="sm" color="white" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-5 justify-start">
            <div>
              <Typography size="text-2xs" color="black">
                Raccourcis :
              </Typography>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <NextLink href={RITA_URL} target="_blank">
                <div
                  className={classNames({
                    'py-1 px-4 rounded-full bg-transparent inline-flex items-center justify-between cursor-pointer border border-primary-600 text-primary-600':
                      true,
                  })}
                >
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-3 h-3 flex items-center justify-items-center text-primary-600">
                      <Icon name="picto-export" />
                    </div>
                    <Typography tag="div" size="text-2xs">
                      Rita
                    </Typography>
                  </div>
                </div>
              </NextLink>
              <NextLink href={ARGUS_URL} target="_blank">
                <div
                  className={classNames({
                    'py-1 px-4 rounded-full bg-transparent inline-flex items-center justify-between cursor-pointer border border-primary-600 text-primary-600':
                      true,
                  })}
                >
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-3 h-3 flex items-center justify-items-center text-primary-600">
                      <Icon name="picto-export" />
                    </div>
                    <Typography tag="div" size="text-2xs">
                      Argus
                    </Typography>
                  </div>
                </div>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
