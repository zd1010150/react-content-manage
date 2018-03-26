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
        const { formatMessage } = this.props.intl;
        return (
            <RichEditor />
        );
    }
}

const mapStateToProps = ({ global }) => ({

});
const mapDispatchToProps = {

};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateContent));

