import React from 'react'
import ReactMde from 'react-mde';

export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MarkdownEditor({
    value,
    onChange,
}: MarkdownEditorProps) {
    return (
        <ReactMde
            value={value}
            onChange={onChange}
            disablePreview={true}
        />
    );
}
