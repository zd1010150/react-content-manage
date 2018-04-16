import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon} from 'antd';
import {Panel} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import Card from './card';



class LeftSection extends React.Component{


    render(){
        return (
            <div>
                <Row>
                    <Col className="gutter-row mr-md" span={7} >
                        <Panel panelTitle="New Leads">
                            <div className="pl-lg pt-md pb-md">aba</div>
                        </Panel>
                    </Col>
                    <Col className="gutter-row mr-md" span={7}>
                        <Panel panelTitle="New Leads">
                        </Panel>
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <Panel panelTitle="New Leads">
                        </Panel>
                    </Col>
                </Row>

                <div>
                </div>
            </div>
        )
    }
}

export default LeftSection