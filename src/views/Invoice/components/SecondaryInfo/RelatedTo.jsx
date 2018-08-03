import React, { Component, Fragment } from 'react';
import { RelatedToSelection } from 'components/ui/index';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class RelatedTo extends Component {
  componentDidMount() {}
  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    return (
      <Fragment>
        <div
          className="mb-sm ant-form-item-label"
          style={{ lineHeight: 1.5 }}
        >
          {formatMessage({ id: `${i18n}.relateTo` })}
        </div>
        <RelatedToSelection
          accounts={[]}
          opportunities={[]}
        />
      </Fragment>
    );
  }
}

RelatedTo.defaultProps = defaultProps;
RelatedTo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RelatedTo));
