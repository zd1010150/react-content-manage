import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
const loadScript = require('load-script');

const defaultScriptUrl = "https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js";

class CKEditor extends React.Component {
    constructor(props) {
        super(props);

        //Bindings
        this.onLoad = this.onLoad.bind(this);

        //State initialization
        this.state = {
            isScriptLoaded: this.props.isScriptLoaded,
            config: this.props.config
        };
    }

    //load ckeditor script as soon as component mounts if not already loaded
    componentDidMount() {
        if(!this.state.isScriptLoaded){
            loadScript(this.props.scriptUrl, ()=>this.onLoad(this.props));
        }else{
            this.onLoad(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('2')
        if(this.props.content !== nextProps.content){
            window.CKEDITOR.replaceAll();
            loadScript(nextProps, ()=>this.onLoad(nextProps));
        }
    }

    componentWillUnmount() {
        this.unmounting = true;
    }

    onLoad(props) {
        if (this.unmounting) return;

        this.setState({
            isScriptLoaded: true
        });

        if (!window.CKEDITOR) {
            console.error("CKEditor not found");
            return;
        }

        this.editorInstance = window.CKEDITOR.appendTo(
            ReactDOM.findDOMNode(this),
            this.state.config,
            props.content
        );

        //Register listener for custom events if any
        for(const event in props.events){
            const eventHandler = props.events[event];

            this.editorInstance.on(event, eventHandler);
        }
    }

    render() {
        return <div className={this.props.activeClass} />;
    }
}

CKEditor.defaultProps = {
    content: "",
    config: {},
    isScriptLoaded: false,
    scriptUrl: defaultScriptUrl,
    activeClass: "",
    events: {}
};

CKEditor.propTypes = {
    content: PropTypes.any,
    config: PropTypes.object,
    isScriptLoaded: PropTypes.bool,
    scriptUrl: PropTypes.string,
    activeClass: PropTypes.string,
    events: PropTypes.object
};

export default CKEditor;