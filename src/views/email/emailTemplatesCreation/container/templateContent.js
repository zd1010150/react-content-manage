import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table, Modal, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {Panel, RichEditor} from 'components/ui/index';
import classNames from 'classnames/bind';
import {SelectComponentVertical, InputComponent, TextAreaComponent} from '../component/formController';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;

const Radios = ({handleRadioClick, formatMessage}) => (
    <RadioGroup defaultValue={1} onChange={e => {
        e.target.value === 1 ? handleRadioClick(true) : handleRadioClick(false)
    }}>
        <Radio className="email-theme-radio"
               value={1}>{formatMessage({id: 'page.emailTemplates.chooseCloudAttachment'})}</Radio>
        <Radio className="email-theme-radio"
               value={2}>{formatMessage({id: 'page.emailTemplates.attachLocalFiles'})}</Radio>
    </RadioGroup>
);
class TemplateContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, chooseCloudAttachment: true}
    }

    componentDidMount() {

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleSave = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleRadioClick = (flag) => {
        this.setState({
            chooseCloudAttachment: flag,
        });
    }

    handleCheck = (e) => {
        // e.target.checked
        console.log(e.target.checked)
    }

    render() {
        const {intl, setNewTemplateContent, registerGetContentHook, content} = this.props;
        const {formatMessage} = intl;

        const columns = [
            {
                key: 'check',
                render: record => (
                    <span>
               <Checkbox className="email-theme-checkbox" onChange={this.handleCheck}/>
          </span>
                ),
            }, {
                title: formatMessage({id: 'page.emailTemplates.name'}),
                dataIndex: 'name',
                key: 'name',
            }, {
                title: formatMessage({id: 'page.emailTemplates.type'}),
                dataIndex: 'type',
                key: 'subscriberList.id',
            }, {
                title: formatMessage({id: 'page.emailTemplates.description'}),
                dataIndex: 'description',
            }, {

                key: 'id',
                render: record => (
                    <span>
                <Icon type="delete" className="danger pl-lg" onClick={() => this.delete(record.id)}/>
              </span>
                ),

            }
        ];

        const selectTemplate = <label>
            <input type="file" id="uploadFile" onChange={() => {
            }} style={{display: 'none'}}/>
            <a size="small" className={`mr-md ${cx('new-template-link-button')}`}><Icon
                className={cx('new-template-import-icon')} type="download"/>
                {formatMessage({id: 'page.emailTemplates.importHtmlTemplate'})}
            </a>
        </label>;
        const attachment = <Button className="email-theme-btn ml-sm" size="small" onClick={this.showModal}><Icon
            type="link"/>{ formatMessage({id: 'page.emailTemplates.attachment'}) }</Button>
        const preview = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {
        }}><Icon type="eye-o"/>
            {formatMessage({id: 'page.emailTemplates.preview'})}
        </Button>
        const additionalCtrl = <Fragment>{selectTemplate}{attachment}{preview}</Fragment>
        const modalHeader = <Row>
            <Col className="gutter-row field-label pt-md" span={20}>
                {formatMessage({id: 'page.emailTemplates.attachFiles'})}
            </Col>
            <Col className="gutter-row field-label" span={4}>
                <Button className="email-theme-btn mr-sm" shape="circle" icon="save" onClick={this.handleSave}></Button>
                <Button shape="circle" icon="close" onClick={this.handleCancel}></Button>
            </Col>
        </Row>
        const CloudAttachment = <div className="mt-lg"><SelectComponentVertical
            label={formatMessage({id: 'page.emailTemplates.chooseFolder'})}/>
            <Table dataSource={[{name: 'abc', type: 'test', description: 'testing'}]} columns={columns} rowKey="id" pagination={false}/></div>
        const LocalAttachment = <div><InputComponent style={{paddingLeft: 0}}
                                                     label={formatMessage({id: 'page.emailTemplates.fileName'})}/>
            <InputComponent style={{paddingLeft: 0}} type='file'
                            label={formatMessage({id: 'page.emailTemplates.fileName'})}/>
            <TextAreaComponent label={formatMessage({id: 'page.emailTemplates.description'})} style={{paddingLeft: 0}}/>
        </div>
        return (
            <Fragment>
                <Modal
                    title={modalHeader}
                    visible={this.state.visible}
                    footer={null}
                    closable={null}
                >
                    <Radios formatMessage={formatMessage} handleRadioClick={this.handleRadioClick}></Radios>
                    {this.state.chooseCloudAttachment ? CloudAttachment : LocalAttachment}
                </Modal>
                <RichEditor content={content} registerGetContentHook={registerGetContentHook}
                            setContent={setNewTemplateContent} additionalCtrl={additionalCtrl}/>
            </Fragment>
        );
    }
}

const mapStateToProps = ({global}) => ({});
const mapDispatchToProps = {};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateContent));

