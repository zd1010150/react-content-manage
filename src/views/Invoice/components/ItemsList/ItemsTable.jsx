import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class ItemsTable extends Component {
  renderColumns = () => {
    return [];
  }

  render() {
    return (
      <Table
        columns={this.renderColumns()}
        dataSource={[]}
      />
    );
  }
}

ItemsTable.defaultProps = defaultProps;
ItemsTable.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ItemsTable));
