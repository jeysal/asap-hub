import React, { ComponentProps } from 'react';

import { ResultList, SharedResearchCard } from '../organisms';

type SharedResearchPageBodyProps = Omit<
  ComponentProps<typeof ResultList>,
  'children'
> & {
  readonly researchOutputs: ReadonlyArray<
    ComponentProps<typeof SharedResearchCard> & { id: string }
  >;
};

const SharedResearchPageBody: React.FC<SharedResearchPageBodyProps> = ({
  researchOutputs,
  ...cardListProps
}) => (
  <ResultList {...cardListProps}>
    {researchOutputs.map(({ id, ...output }) => (
      <div key={id}>
        <SharedResearchCard {...output} />
      </div>
    ))}
  </ResultList>
);

export default SharedResearchPageBody;