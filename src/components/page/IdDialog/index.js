import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Modal, Icon, Input } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { idNumberReg } from 'utils/regex';
import { CHINA_CODE } from 'config/app.config';
import { Upload } from 'components/ui/index';
import styles from './IdDialog.less';

const cx = classNames.bind(styles);
class id extends React.Component {
  state = {
    orginal: {
      idFront: this.props.idFront,
      idBack: this.props.idBack,
      idNumber: this.props.idNumber,
      country: this.props.country,
    },
    errorMsg: '',
    idNumber: this.props.idNumber,
    idFront: this.props.idFront,
    idBack: this.props.idFront,
    key: Math.random(), // 为了让upload重新渲染
  };
  componentWillReceiveProps(nextProps) {
    const orginal = Object.assign({}, this.state.orginal, {
      idFront: nextProps.idFront,
      idBack: nextProps.idBack,
      idNumber: nextProps.idNumber,
      country: nextProps.country,
    });
    this.setState({
      idFront: nextProps.idFront,
      idBack: nextProps.idBack,
      idNumber: nextProps.idNumber,
      country: nextProps.country,
      errorMsg: '',
      orginal,
      key: Math.random(), // 为了让upload重新渲染
    });
  }
  handleIdNumberChange(idNumber) {
    this.setState({
      idNumber,
    });
  }
  handleSubmit() {
    const { onOk, intl } = this.props;
    const { formatMessage } = intl;
    if (this.state.country === CHINA_CODE && _.isEmpty(this.state.idNumber)) {
      this.setState({
        errorMsg: formatMessage({ id: 'global.error.ERROR_CHINA_REQUIRE_ID' }),
      });
      return;
    }
    if (this.state.idNumber && (!idNumberReg.test(this.state.idNumber))) {
      this.setState({
        errorMsg: formatMessage({ id: 'global.error.ERROR_INVALID_ID' }),
      });
      return;
    }
    if (this.state.orginal.idNumber === this.state.idNumber && this.state.orginal.idFront === this.state.idFront && this.state.orginal.idBack === this.state.idBack) {
      this.setState({
        errorMsg: formatMessage({ id: 'global.error.ERROR_NO_MODIFY' }),
      });
    } else {
      onOk(this.state.idNumber, this.state.idFront, this.state.idBack);
    }
  }
  render() {
    const {
      intl, visible, idFront, idBack, onCancel, rejectReseason, allRejectReasons,
    } = this.props;
    const { formatMessage } = intl;
    const getRejectReason = () => {
      const reason = allRejectReasons.filter(item => (Number(item.id) === Number(rejectReseason)));
      if (reason && reason.length > 0) {
        return (<div className="col-md-12 col-sm-12 text-danger text-center" ><Icon type="warning" />{ reason[0].name }</div>);
      } return null;
    };
    return (
      <Modal
        title={formatMessage({ id: 'page.Leads.editId' })}
        visible={visible}
        onOk={() => this.handleSubmit()}
        onCancel={() => onCancel()}
      >
        <div className="row">
          <div className="col-md-12 pb-md text-danger" >{getRejectReason()}</div>
        </div>
        <div className="row">
          <div className="col-md-12 pb-md text-danger" >{this.state.errorMsg}</div>
        </div>
        <div className="row">
          <div className="col-md-10 col-sm-offset-2" >
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label">{formatMessage({ id: 'global.form.ID' })}：</label>
                <Input
                  className={classNames('form-control', cx('id-number-input'))}
                  placeholder={formatMessage({ id: 'global.ui.input.inputIdNumber' })}
                  value={this.state.idNumber}
                  onChange={e => this.handleIdNumberChange(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
            <p className="text-center">{formatMessage({ id: 'global.form.idFront' })}</p>
            <Upload
              key={this.state.key}
              pictureQuantity={1}
              uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })}
              file={idFront}
              onChange={fileList => this.setState({ idFront: (fileList && fileList.length > 0 && fileList[0]) || '' })}
            />
          </div>
          <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
            <p className="text-center">{formatMessage({ id: 'global.form.idBack' })}</p>
            <Upload
              key={this.state.key}
              pictureQuantity={1}
              uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })}
              file={idBack}
              onChange={fileList => this.setState({ idBack: (fileList && fileList.length > 0 && fileList[0]) || '' })}
            />
          </div>
        </div>
      </Modal>
    );
  }
}


id.defaultProps = {
  visible: false,
  idNumber: '',
  idFront: '',
  idBack: '',
  rejectReseason: 0,
  allRejectReasons: [],
  country: CHINA_CODE,
};
id.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
  idNumber: PropTypes.string,
  idFront: PropTypes.string,
  idBack: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  rejectReseason: PropTypes.number,
  allRejectReasons: PropTypes.array,
  country: PropTypes.string,
};
const mapStateToProps = ({ global }) => ({
  allRejectReasons: global.settings.rejectReasons,
});
const ID = connect(mapStateToProps)(injectIntl(id));
export default ID;
