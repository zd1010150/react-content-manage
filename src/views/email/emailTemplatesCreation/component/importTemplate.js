import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {Select, Input, Row, Col, Button, Icon} from 'antd';
import { Panel, Upload } from 'components/ui/index';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);

export default class ImportTemplateButton extends Component {
    // Start the popover closed
    state = {
        url: ''
    };

    // When the popover is open and users click anywhere on the page,
    // the popover should close
    componentDidMount() {

    }

    componentWillUnmount() {

    }



    addTemplate = () => {
        const {editorState, onChange} = this.props;
        onChange(this.props.modifier(editorState, this.state.url));
    };

    changeUrl = (evt) => {
        this.setState({url: evt.target.value});
    }
    onAllDone(response, error) {
        const {setTemplateContent} = this.props;
        if (_.isEmpty(error)) {
            response && setTemplateContent(response[0].content);
            // const imageUrl = response && response[0].data.url;
            // this.setState({url: imageUrl});
        }
    }
    render() {
        const uploadProps = {
            name: 'document',
            action: '/admin/email_templates/zip_file',
            accept: '[application/x-zip-compressed, application/x-rar-compressed]',
            withCredentials: true,
        };
        return (
            <Upload style={{display: 'inline-block'}} isShowMaxSizeTip={false} uploadConfig={uploadProps} onAllDone={(response, error) => this.onAllDone(response, error)} key={Math.random()}>
                <Button size="small" className={`mr-md email-theme-btn ${cx('new-template-link-button')}`}>
                    <Icon className={cx('new-template-import-icon')} type="download" /> Import HTML Template
                </Button>
            </Upload>
        );
    }
}