import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';
import { News } from '../reducer/types';

const REQUEST_ITEM_COUNT = 10;

export default function getNewList(): Promise<News[]> {
    return ky.get(
        `/api/news/list/${REQUEST_ITEM_COUNT}`,
        {
            retry: REQUEST_RETRY_COUNT,
        },
    ).json<News[]>();
}
