import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';
import { Page } from './types';

async function getPage(id: number): Promise<Page> {
    return ky.get(
        `/api/news/${id}`,
        {
            retry: REQUEST_RETRY_COUNT,
        },
    ).json<Page>();
}

export default getPage;
