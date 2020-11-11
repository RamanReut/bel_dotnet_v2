import ky from 'ky';
import { Page } from './types';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';

export interface UpdatePage extends Page {
    id: number;
}

async function updatePageRequest(data: UpdatePage): Promise<Response> {
    return ky.put('api/news', {
        json: {
            id: data.id,
            content: data.content,
            title: data.title,
            previewImage: data.previewImage,
        },
        retry: REQUEST_RETRY_COUNT,
    });
}

export default updatePageRequest;
