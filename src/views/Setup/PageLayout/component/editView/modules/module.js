/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Panel } from 'components/ui/index';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { ItemTypes } from '../../../flow/edit/itemType';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

const spec = {
  beginDrag(props) {
    console.log('module beging drap', props.code);
    return {
      code: props.code,
      sourceCode: props.code,
    };
  },
};
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class Module extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      connectDragSource, isDragging, intl, code, theme, cols,
    } = this.props;
    const { formatMessage } = intl;
    return connectDragSource(<div className="module-panel">
      <Panel
        panelClasses={classNames(`${theme}-theme-panel`, isDragging ? cx('field-btn-dragging') : '')}
        contentClasses="pb-md"
        panelTitle={formatMessage({ id: `global.ui.detailModules.${code}` })}
      >
        <table style={{ width: '100%' }}>
          <thead className="ant-table-thead">
            <tr>
              { cols.map(c => <th key={c.dataIndex}>{ formatMessage({ id: c.titleId })}</th>) }

            </tr>
          </thead>

        </table>
      </Panel>
                             </div>);
  }
}


Module.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  cols: PropTypes.array.isRequired,
};


export default DragSource(ItemTypes.MODULE, spec, collect)(injectIntl(Module));

