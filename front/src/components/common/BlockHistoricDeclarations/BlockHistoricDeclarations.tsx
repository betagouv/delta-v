import React from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { TitleAgent } from '../TitleAgent';
import { Typography } from '../Typography';
import { DeclarationCard } from '@/components/business/DeclarationCard';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

export interface BlockHistoricDeclarationsProps {
  isSubmittedDeclarationsLoading?: boolean;
  submittedDeclarations?: DeclarationResponse[];
  isPaidDeclarationsLoading?: boolean;
  paidDeclarations?: DeclarationResponse[];
  isErrorDeclarationsLoading?: boolean;
  errorDeclarations?: DeclarationResponse[];
}

export const BlockHistoricDeclarations: React.FC<BlockHistoricDeclarationsProps> = ({
  isSubmittedDeclarationsLoading,
  submittedDeclarations,
  isPaidDeclarationsLoading,
  paidDeclarations,
  isErrorDeclarationsLoading,
  errorDeclarations,
}: BlockHistoricDeclarationsProps) => {
  const router = useRouter();
  const submittedDeclarationsNotEmpty = submittedDeclarations && submittedDeclarations.length > 0;
  const paidDeclarationsNotEmpty = paidDeclarations && paidDeclarations.length > 0;
  const errorDeclarationsNotEmpty = errorDeclarations && errorDeclarations.length > 0;
  const emptyDeclarations =
    !submittedDeclarationsNotEmpty && !paidDeclarationsNotEmpty && !errorDeclarationsNotEmpty;

  return (
    <div className="flex flex-col justify-start gap-[30px]">
      <TitleAgent
        title="Historique des déclarations"
        textPosition="text-left"
        size="text-3xl"
        fontFamily="marianne"
      />
      {!emptyDeclarations ? (
        <div className="grid-cols-3 items-start grid gap-10">
          {submittedDeclarationsNotEmpty && (
            <div className="flex flex-col gap-[30px] flex-1">
              <Typography size="text-xs" color="black">
                En attente de validation
              </Typography>
              {!isSubmittedDeclarationsLoading && submittedDeclarations && (
                <div className="flex flex-col gap-5">
                  {submittedDeclarations?.map((item) => (
                    <DeclarationCard
                      firstName={item.declarantFirstName}
                      lastName={item.declarantLastName}
                      id={item.id}
                      status={item.status}
                      date={item.versionDate}
                      transport={item.declarantMeanOfTransport}
                      key={item.publicId}
                      publicId={item.publicId}
                      onClick={() => router.push(`/agent/declaration/${item.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {paidDeclarationsNotEmpty && (
            <div className="flex flex-col gap-[30px] flex-1">
              <Typography size="text-xs" color="black">
                Payée
              </Typography>
              {!isPaidDeclarationsLoading && paidDeclarations && (
                <div className="flex flex-col gap-5">
                  {paidDeclarations?.map((item) => (
                    <DeclarationCard
                      firstName={item.declarantFirstName}
                      lastName={item.declarantLastName}
                      id={item.id}
                      status={item.status}
                      date={item.versionDate}
                      transport={item.declarantMeanOfTransport}
                      key={item.publicId}
                      publicId={item.publicId}
                      onClick={() => router.push(`/agent/declaration/${item.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {errorDeclarationsNotEmpty && (
            <div className="flex flex-col gap-[30px] flex-1">
              <Typography size="text-xs" color="black">
                Non conforme
              </Typography>

              {!isErrorDeclarationsLoading && errorDeclarations && (
                <div className="flex flex-col gap-5">
                  {errorDeclarations.map((item) => (
                    <DeclarationCard
                      firstName={item.declarantFirstName}
                      lastName={item.declarantLastName}
                      id={item.id}
                      status={item.status}
                      date={item.versionDate}
                      transport={item.declarantMeanOfTransport}
                      key={item.publicId}
                      publicId={item.publicId}
                      onClick={() => router.push(`/agent/declaration/${item.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Typography size="text-xs" color="light-gray" italic>
          Pas de déclaration
        </Typography>
      )}
      {!isErrorDeclarationsLoading &&
        !isPaidDeclarationsLoading &&
        !isSubmittedDeclarationsLoading &&
        !emptyDeclarations && (
          <div className="flex justify-center">
            <NextLink href="/agent/declaration">
              <div className="flex flex-row items-center gap-2 border border-primary-600 py-2 px-9 rounded-full">
                <Typography size="text-2xs" color="primary">
                  Voir plus
                </Typography>
              </div>
            </NextLink>
          </div>
        )}
    </div>
  );
};
