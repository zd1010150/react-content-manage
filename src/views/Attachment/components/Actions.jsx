import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { getTheme } from 'components/hoc/index';


class Actions extends PureComponent {
  componentDidMount() {}

  onSaveClick = () => {}
  onCancelClick = () => {}

  render() {
    const { theme } = this.props;
    return (
      <Row>
        <Button
          size="small"
          className={`${theme}-theme-btn mr-sm`}
          onClick={this.onSaveClick}
        >
          <Icon type="save" className="font-sm icon-thinner" />
          Save
        </Button>
        <Button size="small" onClick={this.onCancelClick}>
          <Icon type="close" className="font-sm icon-thinner" />
          Cancel
        </Button>
      </Row>
    );
  }
}

export default getTheme(Actions);
