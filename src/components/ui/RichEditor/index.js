// import React, {Fragment} from 'react';
// import _ from 'lodash';
// import {intlShape, injectIntl} from 'react-intl';
// import {Row, Col, Input, Select, Button, Icon, Radio, Table} from 'antd';
// import {connect} from 'react-redux';
// import {Panel} from 'components/ui/index';
// import classNames from 'classnames/bind';
// import {EditorState, RichUtils, getDefaultKeyBinding, convertFromHTML, ContentState, convertToRaw, CompositeDecorator, convertFromRaw} from 'draft-js';
// import Editor, { composeDecorators } from 'draft-js-plugins-editor';
// import createImagePlugin from 'draft-js-image-plugin';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
//
// import createFocusPlugin from 'draft-js-focus-plugin';
//
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
//
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import ImageAdd from './imageAdd';
//
// import {decorator} from './decorator';
// import {stateToHTML} from 'draft-js-export-html';
//
// import styles from './richEditor.less';
//
// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
// const blockDndPlugin = createBlockDndPlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;
// const decoratorForImage = composeDecorators(
//     resizeablePlugin.decorator,
//     alignmentPlugin.decorator,
//     focusPlugin.decorator,
//     blockDndPlugin.decorator
// );
// const imagePlugin = createImagePlugin({ decoratorForImage });
// const plugins = [
//     blockDndPlugin,
//     focusPlugin,
//     alignmentPlugin,
//     resizeablePlugin,
//     imagePlugin
// ];
// const initialState = {
//     "entityMap": {
//         "0": {
//             "type": "image",
//             "mutability": "IMMUTABLE",
//             "data": {
//                 "src": "https://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png"
//             }
//         }
//     },
//     "blocks": [{
//         "key": "9gm3s",
//         "text": "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
//         "type": "unstyled",
//         "depth": 0,
//         "inlineStyleRanges": [],
//         "entityRanges": [],
//         "data": {}
//     }, {
//         "key": "ov7r",
//         "text": " ",
//         "type": "atomic",
//         "depth": 0,
//         "inlineStyleRanges": [],
//         "entityRanges": [{
//             "offset": 0,
//             "length": 1,
//             "key": 0
//         }],
//         "data": {}
//     }, {
//         "key": "e23a8",
//         "text": "See advanced examples further down …",
//         "type": "unstyled",
//         "depth": 0,
//         "inlineStyleRanges": [],
//         "entityRanges": [],
//         "data": {}
//     }]
// };
// const cx = classNames.bind(styles);
// // const sampleMarkup =
// //     '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
// //     '<a href="https://www.facebook.com">Example link</a><br /><br/ >' +
// //     '<img src="https://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png" height="112" width="200" />';
//
//
// class RichEditor extends React.Component {
//     constructor(props){
//         super(props);
//         const {registerGetContentHook, content} = this.props;
//         if(!!content && content !== '<p><br></p>'){
//             const blocksFromHTML = convertFromHTML(content);
//             const state = ContentState.createFromBlockArray(
//                 blocksFromHTML.contentBlocks,
//                 blocksFromHTML.entityMap
//             );
//             console.log('1123123', state)
//             this.setState({editorState: EditorState.createWithContent(state)})
//         }else{
//             // this.state = {editorState: EditorState.createEmpty()};
//             console.log('convertFromRaw(initialState)', convertFromRaw(initialState))
//             this.state = {editorState: EditorState.createWithContent(convertFromRaw(initialState))};
//         }
//         this.focus = () => this.refs.editor.focus();
//         this.onChange = (editorState) => this.setState({editorState});
//         this.handleKeyCommand = this._handleKeyCommand.bind(this);
//         this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//         this.toggleBlockType = this._toggleBlockType.bind(this);
//         this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//         this.getLocalHtml = this.getLocalHtml.bind(this);
//         this.previewHtml = this.previewHtml.bind(this);
//
//
//         registerGetContentHook &&
//         registerGetContentHook(() => {
//             console.log('12312312312131233', convertToRaw(this.state.editorState.getCurrentContent()))
//             return stateToHTML(this.state.editorState.getCurrentContent());
//             // return this.state.editorState.getCurrentContent ().getPlainText ();
//         });
//     }
//
//     componentWillReceiveProps(nextProps){
//         if(this.props.content !== nextProps.content){
//             //什么都没填的时候，content默认为<p><br></p>， 但convertFromHTML('<p><br></p>') 会报错，所以要做这个判断
//             if(!!nextProps.content && nextProps.content !== '<p><br></p>'){
//                 const blocksFromHTML = convertFromHTML(nextProps.content);
//                 const state = ContentState.createFromBlockArray(
//                     blocksFromHTML.contentBlocks,
//                     blocksFromHTML.entityMap
//                 );
//                 console.log('0000000', nextProps.content)
//                 console.log('111111111', blocksFromHTML)
//                 console.log('222222222', state)
//                 this.setState({editorState: EditorState.createWithContent(state)})
//             }else{
//                 // this.setState({editorState: EditorState.createEmpty()})
//                 console.log('convertFromRaw(initialState)', convertFromRaw(initialState))
//                 this.state = {editorState: EditorState.createWithContent(convertFromRaw(initialState))};
//             }
//         }
//     }
//
//     componentDidMount() {
//
//     }
//     _handleKeyCommand(command, editorState) {
//         const newState = RichUtils.handleKeyCommand(editorState, command);
//         if (newState) {
//             this.onChange(newState);
//             return true;
//         }
//         return false;
//     }
//     _mapKeyToEditorCommand(e) {
//         if (e.keyCode === 9 /* TAB */) {
//             const newEditorState = RichUtils.onTab(
//                 e,
//                 this.state.editorState,
//                 4, /* maxDepth */
//             );
//             if (newEditorState !== this.state.editorState) {
//                 this.onChange(newEditorState);
//             }
//             return;
//         }
//         return getDefaultKeyBinding(e);
//     }
//     _toggleBlockType(blockType) {
//         this.onChange(
//             RichUtils.toggleBlockType(
//                 this.state.editorState,
//                 blockType
//             )
//         );
//     }
//     _toggleInlineStyle(inlineStyle) {
//         this.onChange(
//             RichUtils.toggleInlineStyle(
//                 this.state.editorState,
//                 inlineStyle
//             )
//         );
//     }
//     getLocalHtml(){
//
//     }
//     previewHtml(){
//
//     }
//
//
//     render() {
//         const {editorState} = this.state;
//         const {intl, setContent} = this.props;
//         const { formatMessage } = intl;
//         // If the user changes block type before entering any text, we can
//         // either style the placeholder or hide it. Let's just hide it now.
//         let className = 'RichEditor-editor';
//         let contentState = editorState.getCurrentContent();
//         if (!contentState.hasText()) {
//             if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//                 className += ' RichEditor-hidePlaceholder';
//             }
//         }
//         return (
//             <div className="RichEditor-root">
//                 <ActionControls
//                     editorState={editorState}
//                     onToggle={this.toggleBlockType}
//                     formatMessage={formatMessage}
//                     getLocalHtml={this.getLocalHtml}
//                 >
//                     {this.props.additionalCtrl}
//                 </ActionControls>
//                 <ImageAdd
//                     editorState={editorState}
//                     onChange={this.onChange}
//                     modifier={imagePlugin.addImage}
//                 />
//                 <BlockStyleControls
//                     editorState={editorState}
//                     onToggle={this.toggleBlockType}
//                 />
//                 <InlineStyleControls
//                     editorState={editorState}
//                     onToggle={this.toggleInlineStyle}
//                 />
//                 <div className={className} onClick={this.focus}>
//                     <Editor
//                         blockStyleFn={getBlockStyle}
//                         customStyleMap={styleMap}
//                         editorState={editorState}
//                         handleKeyCommand={this.handleKeyCommand}
//                         keyBindingFn={this.mapKeyToEditorCommand}
//                         onChange={this.onChange}
//                         plugins={plugins}
//                         placeholder="Tell a story..."
//                         ref="editor"
//                         spellCheck={true}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }
//
// // Custom overrides for "code" style.
// const styleMap = {
//     CODE: {
//         backgroundColor: 'rgba(0, 0, 0, 0.05)',
//         fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//         fontSize: 16,
//         padding: 2,
//     },
// };
// function getBlockStyle(block) {
//     switch (block.getType()) {
//         case 'blockquote': return 'RichEditor-blockquote';
//         default: return null;
//     }
// }
// class StyleButton extends React.Component {
//     constructor() {
//         super();
//         this.onToggle = (e) => {
//             e.preventDefault();
//             this.props.onToggle(this.props.style);
//         };
//     }
//     render() {
//         let className = 'RichEditor-styleButton';
//         if (this.props.active) {
//             className += ' RichEditor-activeButton';
//         }
//         return (
//             <span className={className} onMouseDown={this.onToggle}>
//               {this.props.label}
//             </span>
//         );
//     }
// }
//
// const ActionControls = (props) => {
//     const {editorState, formatMessage, getLocalHtml, children} = props;
//     const selection = editorState.getSelection();
//     return (
//         <div className="RichEditor-controls">
//             {
//                 children
//             }
//
//         </div>
//     );
// };
// const BLOCK_TYPES = [
//     {label: 'H1', style: 'header-one'},
//     {label: 'H2', style: 'header-two'},
//     {label: 'H3', style: 'header-three'},
//     {label: 'H4', style: 'header-four'},
//     {label: 'H5', style: 'header-five'},
//     {label: 'H6', style: 'header-six'},
//     {label: 'Blockquote', style: 'blockquote'},
//     {label: 'UL', style: 'unordered-list-item'},
//     {label: 'OL', style: 'ordered-list-item'},
//     {label: 'Code Block', style: 'code-block'},
// ];
// const BlockStyleControls = (props) => {
//     const {editorState} = props;
//     const selection = editorState.getSelection();
//     const blockType = editorState
//         .getCurrentContent()
//         .getBlockForKey(selection.getStartKey())
//         .getType();
//     return (
//         <div className="RichEditor-controls">
//             {BLOCK_TYPES.map((type) =>
//                 <StyleButton
//                     key={type.label}
//                     active={type.style === blockType}
//                     label={type.label}
//                     onToggle={props.onToggle}
//                     style={type.style}
//                 />
//             )}
//         </div>
//     );
// };
// var INLINE_STYLES = [
//     {label: 'Bold', style: 'BOLD'},
//     {label: 'Italic', style: 'ITALIC'},
//     {label: 'Underline', style: 'UNDERLINE'},
//     {label: 'Monospace', style: 'CODE'},
// ];
// const InlineStyleControls = (props) => {
//     const currentStyle = props.editorState.getCurrentInlineStyle();
//
//     return (
//         <div className="RichEditor-controls">
//             {INLINE_STYLES.map((type) =>
//                 <StyleButton
//                     key={type.label}
//                     active={currentStyle.has(type.style)}
//                     label={type.label}
//                     onToggle={props.onToggle}
//                     style={type.style}
//                 />
//             )}
//         </div>
//     );
// };
//
// const mapStateToProps = ({ global }) => ({
//
// });
// const mapDispatchToProps = {
//
// };
//
// export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(RichEditor));