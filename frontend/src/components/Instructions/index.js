// Instructions.js
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const Instructions = ({ editorState, handleEditorStateChange }) => (
    <div style={{ flex: 3, marginLeft: '10px' }}>
        <div>
            <h4>Create Course Info Page</h4>
            <Editor editorState={editorState} onEditorStateChange={handleEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'image'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                        bold: { className: 'bordered-option-classname' },
                        italic: { className: 'bordered-option-classname' },
                        underline: { className: 'bordered-option-classname' },
                        strikethrough: { className: 'bordered-option-classname' },
                        code: { className: 'bordered-option-classname' },
                        fontSize: { className: 'bordered-option-classname' },
                    },
                    textAlign: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    blockType: {
                        className: 'bordered-option-classname',
                    },
                }}
            />
        </div>
    </div>
);

export default Instructions;