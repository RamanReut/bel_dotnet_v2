import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';
import { News } from '../reducer/types';
import { Page } from './types';

async function getPage(id: number): Promise<News> {
    const resp = await ky.get(
        `/api/news/${id}`,
        {
            retry: REQUEST_RETRY_COUNT,
        },
    ).json<Page>();

    return {
        id,
        type: 'full',
        content: resp.content,
        title: resp.title,
        previewImage: resp.previewImage,
    };
}

export default getPage;
