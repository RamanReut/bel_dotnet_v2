import { Command } from 'react-mde';

export interface ImageData {
    image: string;
    height: number;
    width: number;
}

export interface CreateImageInsertCommandProps {
    onClick: () => void;
    saveHook: (fn: (data: ImageData) => void) => void;
}

function createImageInsertCommand({
    onClick,
    saveHook,
}: CreateImageInsertCommandProps): Command {
    return {
        icon: (getIcon) => getIcon('image'),
        execute: ({ textApi }) => {
            onClick();
            saveHook(({ image, height, width }: ImageData) => {
                textApi.replaceSelection(`![](${image}|${width}x${height})`);
            });
        },
    };
}

export default createImageInsertCommand;
