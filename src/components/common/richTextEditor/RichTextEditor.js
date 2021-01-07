import React, { Component } from 'react'
import { EditorState, ContentState, convertToRaw, createWithContent } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props)
        const { intialHtmlLoad } = props;

        this.state = {
            contentState : null,
            editorState: this.convertHtmlToTextEditor(intialHtmlLoad)
        }
    }

    convertHtmlToTextEditor = (htmlString) =>{
        const contentBlock = htmlToDraft(htmlString);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
    }

    onContentStateChange = contentState => {
        const { onChaneTextEditorValue }  = this.props
        this.setState({ contentState }, ()=>{
            onChaneTextEditorValue(draftToHtml(contentState))
        });
    }

    render() {
        const {placeholder} = this.props;
        const { editorState  } = this.state
    
        const content = editorState.getCurrentContent();

        return (
            <Editor
                placeholder={placeholder} 
                initialContentState={convertToRaw(content)}
                onContentStateChange={this.onContentStateChange}
                wrapperClassName="rich-editor-wrapper"
                editorClassName="rich-editor"
                toolbar={{options: ['inline', 'list'],
                inline: {
                    options: ['bold', 'italic', 'underline'],
                },
                list: {
                    options: ['unordered', 'ordered'],
                }
            }}
            />
        )
    }
}

