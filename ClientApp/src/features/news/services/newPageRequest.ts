import ky from 'ky';

const RETRY_COUNT = 5;

export interface PageData {
    content: {
        ru: string;
        be: string;
    };
    title: {
        ru: string;
        be: string;
    };
}

async function newPageRequest(data: PageData): Promise<Response> {
    return ky.put(
        '/api/news',
        {
            json: { content: data.content, title: data.title },
            retry: RETRY_COUNT,
        },
    );
}

export default newPageRequest;
