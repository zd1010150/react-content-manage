// import React, {Component} from 'react';
// import classNames from 'classnames/bind';
// import {Select, Input, Row, Col, Button, Icon} from 'antd';
// import { Panel, Upload } from 'components/ui/index';
// import styles from './imageAdd.less';
// const cx = classNames.bind(styles);
//
// export default class ImageAdd extends Component {
//     // Start the popover closed
//     state = {
//         url: '',
//         open: false,
//     };
//
//     // When the popover is open and users click anywhere on the page,
//     // the popover should close
//     componentDidMount() {
//         document.addEventListener('click', this.closePopover);
//     }
//
//     componentWillUnmount() {
//         document.removeEventListener('click', this.closePopover);
//     }
//
//     // Note: make sure whenever a click happens within the popover it is not closed
//     onPopoverClick = () => {
//         this.preventNextClose = true;
//     }
//
//     openPopover = () => {
//         if (!this.state.open) {
//             this.preventNextClose = true;
//             this.setState({
//                 open: true,
//             });
//         }
//     };
//
//     closePopover = () => {
//         if (!this.preventNextClose && this.state.open) {
//             this.setState({
//                 open: false,
//             });
//         }
//
//         this.preventNextClose = false;
//     };
//
//     addImage = () => {
//         const {editorState, onChange} = this.props;
//         onChange(this.props.modifier(editorState, this.state.url));
//     };
//
//     changeUrl = (evt) => {
//         this.setState({url: evt.target.value});
//     }
//     onAllDone(response, error) {
//         if (_.isEmpty(error)) {
//             const imageUrl = response && response[0].data.url;
//             this.setState({url: imageUrl});
//         }
//     }
//     render() {
//         const popoverClassName = this.state.open ?
//             cx('addImagePopover') :
//             cx('addImageClosedPopover');
//         const buttonClassName = this.state.open ?
//             cx('addImagePressedButton') :
//             cx('addImageButton');
//         const uploadProps = {
//             name: 'document',
//             action: '/admin/files/image',
//             accept: '[image/png, image/jpg, image/jpeg, image/bmp, image/gif, image/svg]',
//             withCredentials: true,
//         };
//         return (
//             <div className={cx('addImage')}>
//                 <button
//                     className={buttonClassName}
//                     onMouseUp={this.openPopover}
//                     type="button"
//                 >
//                     +
//                 </button>
//                 <div
//                     className={popoverClassName}
//                     onClick={this.onPopoverClick}
//                 >
//                     <input
//                         type="text"
//                         placeholder="Paste the image url …"
//                         className={cx('addImageInput')}
//                         onChange={this.changeUrl}
//                         value={this.state.url}
//                     />
//                     <button
//                         className={cx('addImageConfirmButton')}
//                         type="button"
//                         onClick={this.addImage}
//                     >
//                         Add
//                     </button>
//                     <Upload uploadConfig={uploadProps} onAllDone={(response, error) => this.onAllDone(response, error)} key={Math.random()}>
//                         <Button>
//                             <Icon type="upload" /> upload local image
//                         </Button>
//                     </Upload>
//                     {/*<div>*/}
//                         {/*<Input type='file' accept="image/*" style={{height: 35}} onChange={this.addLocalImage}/>*/}
//                     {/*</div>*/}
//
//                 </div>
//             </div>
//         );
//     }
// }