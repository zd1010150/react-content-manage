import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table} from 'antd';
import {connect} from 'react-redux';
import {Panel, RichEditor} from 'components/ui/index';
import classNames from 'classnames/bind';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);

class TemplateContent extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {

    }

    render() {
        const {intl, setNewTemplateContent, registerGetContentHook, content} = this.props;
        const { formatMessage } = intl;
        console.log('???', content)

        const selectTemplate = <label>
            <input type="file" id="uploadFile" onChange={() => {}} style={{display: 'none'}}/>
            <a size="small" className={`mr-md ${cx('new-template-link-button')}`}><Icon className={cx('new-template-import-icon')} type="download" />
                {formatMessage({id: 'page.emailTemplates.importHtmlTemplate'})}
            </a>
        </label>;
        const attachment = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="link" />{ formatMessage({ id: 'page.emailTemplates.attachment' }) }</Button>
       const preview = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="eye-o" />
            {formatMessage({id: 'page.emailTemplates.preview'})}
        </Button>
        const additionalCtrl = <Fragment>{selectTemplate}{attachment}{preview}</Fragment>
        return (
            <RichEditor content={content} registerGetContentHook={registerGetContentHook} setContent={setNewTemplateContent} additionalCtrl={additionalCtrl}/>
        );
    }
}

const mapStateToProps = ({ global }) => ({

});
const mapDispatchToProps = {

};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateContent));

