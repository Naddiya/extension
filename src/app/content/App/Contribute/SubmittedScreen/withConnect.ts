import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import { close } from 'app/actions/ui';
import { State } from 'app/content/store';
import { getContribution } from 'app/content/selectors';

const mapDispatchToProps = {
  close,
  goBack: () => replace('/')
};

export default connect(
  (state: State) => ({
    contribution: getContribution(state)
  }),
  mapDispatchToProps
);