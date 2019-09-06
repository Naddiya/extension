import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import BottomLine from './BottomLine';
import withConnect from './withConnect';

const ContributorsWidth = styled.section`
  padding-bottom: 250px;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

interface Props {
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
}

export const SuggestionsScreen = ({
  suggestions,
  subscribe,
  unsubscribe
}: Props) => (
  <>
    <ContributorsWidth>
      <ContributorsList>
        {suggestions.map(contributor => (
          <ContributorLarge
            key={contributor.id}
            contributor={contributor}
            onSubscribe={subscribe(contributor)}
            onUnsubscribe={unsubscribe(contributor)}
          />
        ))}
      </ContributorsList>
    </ContributorsWidth>

    <BottomLine />
  </>
);

export default withConnect(SuggestionsScreen);
