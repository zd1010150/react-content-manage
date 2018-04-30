import {apiDomain} from '../../config/env.config.js';
export default {
    toolbar: [
        {name: 'document', items: ['Print']},
        {name: 'clipboard', items: ['Undo', 'Redo']},
        {name: 'styles', items: ['Format', 'Font', 'FontSize']},
        {name: 'colors', items: ['TextColor', 'BGColor']},
        {name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
        '/',
        {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']},
        {name: 'links', items: ['Link', 'Unlink']},
        {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']},
        {name: 'insert', items: ['Image', 'Table']},
        {name: 'tools', items: ['Maximize']},
        {name: 'editing', items: ['Scayt']}
    ],

    extraAllowedContent: 'h3{clear};h2{line-height};h2 h3{margin-left,margin-top}',

    // Adding drag and drop image upload.
    // extraPlugins: 'print,format,font,colorbutton,justify,uploadimage',
    uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

    // Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?type=Images',
    // filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
    filebrowserImageUploadUrl: apiDomain + '/api/v1/admin/files/image',

    height: 560,

    removeDialogTabs: 'image:advanced;link:advanced'
}