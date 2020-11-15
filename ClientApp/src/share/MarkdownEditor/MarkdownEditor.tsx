import React, {
    useState,
    useCallback,
    ReactElement,
} from 'react';
import ReactMde, { Command, getDefaultToolbarCommands } from 'react-mde';
import createImageInsertCommand from './imageInsertCommand';
import ImageUpload from './ImageUpload';

const TOOLBAR_COMMANDS = (() => {
    const commands = getDefaultToolbarCommands();
    commands[1].splice(commands[1].indexOf('image'), 1, 'imageInsert');
    return commands;
})();

export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MarkdownEditor({
    value,
    onChange,
}: MarkdownEditorProps): ReactElement {
    const [isImageDialogOpen, setIsOpenDialogOpen] = useState<boolean>(false);
    // eslint-disable-next-line operator-linebreak
    const [insertImageCallback, setInsertImageCallback] =
        useState<(image: string) => void>(() => {});

    const handleDialogOpen = useCallback(() => setIsOpenDialogOpen(true), []);
    const handleDialogClose = useCallback(() => setIsOpenDialogOpen(false), []);
    // Without this react cannot save function into state
    const handleInsertImage = useCallback(
        (fn: (image: string) => void) => {
            setInsertImageCallback(() => fn);
        },
        [],
    );

    const [imageInsertCommand] = useState<Command>(
        createImageInsertCommand({
            onClick: handleDialogOpen,
            saveHook: handleInsertImage,
        }),
    );

    return (
        <div>
            <ReactMde
                value={value}
                onChange={onChange}
                commands={{ imageInsert: imageInsertCommand }}
                toolbarCommands={TOOLBAR_COMMANDS}
                disablePreview
            />
            <ImageUpload
                isOpen={isImageDialogOpen}
                onClose={handleDialogClose}
                saveChange={insertImageCallback}
            />
        </div>
    );
}
