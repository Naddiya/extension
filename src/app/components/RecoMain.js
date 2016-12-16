import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Editor from './Editor';
import Contributor from './Contributor';
import RecoDescription from './RecoDescription';

class RecoMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recoHover: false,
    };
  }

  onMouseOver() {
    this.setState({ recoHover: true });
  }

  onMouseOut() {
    this.setState({ recoHover: false });
  }

  render() {
    const { recommendations, imagesUrl,
      onCheckOutResource, onCheckOutAlternative, onCheckOutEditor,
      dismissReco, approveReco, reportReco } = this.props;
    const { recoHover } = this.state;

    // For now, this component is only capable of handling a single recommendation.
    // handling of several is TBD
    const recommendation = recommendations[0];
    const {visibility} = recommendation;

    console.log('RECO', recommendation);

    const mainClass = visibility === 'private' ? 'preview' : undefined;

    // console.log('RECO props', recommendation);

    const rateRecoButtons = (
      <ul>
        <li>
          <div className="button-directive">
            <button
              className="button button-compact with-tooltip"
              onClick={e => {
                approveReco(1);
              }}>
              <span><span>LIKE</span></span>
            </button>
          </div>
        </li>
        <li>
          <div className="button-directive">
            <button
              className="button button-compact with-tooltip"
              onClick={e => {
                dismissReco(1);
              }}>
              <span><span>DISMISS</span></span>
            </button>
          </div>
        </li>
        <li>
          <div className="button-directive">
            <button
              className="button button-compact with-tooltip"
              onClick={e => {
                reportReco(1);
              }}>
              <span><span>REPORT</span></span>
            </button>
          </div>
        </li>
      </ul>
    );

    return (<main className={mainClass}>
      <header className="sideframe lmem-header">
        <Editor
          editor={recommendation.resource.editor}
          author={recommendation.resource.author}
          onCheckOutEditor={onCheckOutEditor}
        />
        <Contributor contributor={recommendation.contributor} />
      </header>

      <div className="separation-bar" />

      <div className={classNames('recommendation', 'mainframe', 'highlight', {active: recoHover})}>
        <div className="reco-summary">
          <header className="summary-header reco-summary-header">
            <h3 className="reco-summary-title">
              <a
                target="_blank"
                href={recommendation.resource.url}
                onMouseOver={e => this.onMouseOver()}
                onMouseOut={e => this.onMouseOut()}>
                {recommendation.title}
              </a>
            </h3>
            {rateRecoButtons}
            <ul className="summary-tags">
              {recommendation.criteria
                .map(criterion => (
                  <li key={criterion.slug}>
                    <b className={'tag tag-' + criterion.slug}> {criterion.label} </b>
                  </li>
                ))
              }
            </ul>
          </header>
          <div className="reco-summary-content">
            <div className="reco-summary-link-referral">
              <a
                target="_blank"
                href={recommendation.resource.url}
                onMouseOver={e => this.onMouseOver()}
                onMouseOut={e => this.onMouseOut()}>
                {recommendation.resource.url}
              </a>
            </div>
            <RecoDescription description={recommendation.description} />
          </div>
        </div>
        <div className="summary-link-checkout-wrapper">
          <a
            onClick={(e) => onCheckOutResource(recommendation.resource)}
            href={recommendation.resource.url}
            target="_blank"
            onMouseOver={e => this.onMouseOver()}
            onMouseOut={e => this.onMouseOut()}
            className="button summary-link-checkout with-image">
            <img role="presentation" src={imagesUrl + 'read.svg'} />
            <span className="button-label">
              {recommendation.resource.label}
            </span>
          </a>
          { recommendation.alternatives && recommendation.alternatives[0] ? (
            <div>
              <small>ou bien</small>
              <a
                onClick={(e) => onCheckOutAlternative(recommendation.alternatives[0])}
                href={recommendation.alternatives[0].url_to_redirect}
                target="_blank"
                className="reco-alternative button summary-link-checkout with-image">
                <img role="presentation" src={imagesUrl + 'logo-bw.svg'} />
                <span className="button-label">
                  {recommendation.alternatives[0].label}
                </span>
              </a>
            </div>
          ) : undefined }
        </div>
      </div>
    </main>);
  }
}

RecoMain.propTypes = {
  imagesUrl: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    contributor: PropTypes.object.isRequired,
    criteria: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })),
    resource: PropTypes.shape({
      author: PropTypes.string,
      editor: PropTypes.object.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    alternatives: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      url_to_redirect: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default RecoMain;



