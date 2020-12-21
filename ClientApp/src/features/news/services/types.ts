export interface Page {
    content: {
        ru: string;
        be: string;
    };
    title: {
        ru: string;
        be: string;
    };
    previewImage: string;
}

export interface UpdatePage extends Page {
    id: number;
}
