import { Button, Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { addNewItem } from '../../flow/itemsList/actions';
import ItemsTable from './ItemsTable';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class ItemsList extends Component {
  onAddNewClick = () => this.props.addNewItem()

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui';

    return (
      <Fragment>
        <div className="text-right mb-sm">
          <Button
            size="small"
            onClick={this.onAddNewClick}
          >
            <Icon className="font-sm" type="plus" />
            {formatMessage({ id: `${i18n}.button.add` })}
          </Button>
        </div>
        <ItemsTable />
      </Fragment>
    );
  }
}

ItemsList.defaultProps = defaultProps;
ItemsList.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  addNewItem,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ItemsList));
