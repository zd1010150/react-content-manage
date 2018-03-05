/* eslint-disable no-shadow */
import React from 'react';
import { Modal, Button } from 'antd';


class Dialogs extends React.Component {
    state = {
      loading: false,
      visible: false,
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    }
    handleCancel = () => {
      this.setState({ visible: false });
    }
    render() {
      const { visible, loading } = this.state;
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
                    Open
          </Button>
          <Modal
            visible={visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>Return</Button>,

                    ]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      );
    }
}
export default Dialogs;
