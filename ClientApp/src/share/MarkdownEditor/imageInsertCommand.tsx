import { Command } from 'react-mde';

export interface CreateImageInsertCommandProps {
    onClick: () => void;
    saveHook: (fn: (image: string) => void) => void;
}

function createImageInsertCommand({
    onClick,
    saveHook,
}: CreateImageInsertCommandProps): Command {
    return {
        icon: (getIcon) => getIcon('image'),
        execute: ({ textApi }) => {
            onClick();
            saveHook((image: string) => {
                textApi.replaceSelection(`![](//${image})`);
            });
        },
    };
}

export default createImageInsertCommand;
