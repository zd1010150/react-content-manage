import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import _ from 'lodash';

class Panel extends React.Component {
  render() {
    const {
      panelTitle, actionsLeft, actionsRight, content, panelClasses, contentClasses,
    } = this.props;
    const isRenderHeader = !(_.isEmpty(actionsLeft) && _.isEmpty(actionsRight) && _.isEmpty(panelTitle));
    const $panelTitle = _.isEmpty(panelTitle) ? '' : <h2 className="panel-title"> {panelTitle} </h2>;
    const $panelTitleAction = (() => {
      const actions = [];
      const isRenderLeftActions = _.isEmpty($panelTitle) && !_.isEmpty(actionsLeft);
      if (isRenderLeftActions) {
        actions.push(<div className="actions-left" key="actions-left">{ actionsLeft }</div>);
      }
      if (!_.isEmpty(actionsRight)) {
        actions.push(<div className="actions-right" key="actions-right">{ actionsRight }</div>);
      }
      return _.isEmpty(actions) ? '' : <div className={classNames('panel-actions clearfix', isRenderLeftActions ? 'panel-no-title-actions' : '')}>{ actions }</div>;
    })();

    return (
      <div className={classNames('panel', panelClasses)}>
        { isRenderHeader ? <div className="panel-header clearfix"> { $panelTitle} { $panelTitleAction} </div> : ''}
        <div className={classNames('panel-content', contentClasses)}>
          {_.isEmpty(content) ? this.props.children : content }
        </div>
      </div>
    );
  }
}
Panel.defaultProps = {
  panelTitle: '',
  actionsLeft: null,
  actionsRight: null,
  content: '',
  panelClasses: '',
  contentClasses: '',
};
Panel.propTypes = {
  panelTitle: PropTypes.string,
  actionsLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  actionsRight: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  panelClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  contentClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
export default Panel;
