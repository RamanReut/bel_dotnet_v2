import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';

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
            retry: REQUEST_RETRY_COUNT,
        },
    );
}

export default newPageRequest;
