import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';
import { News } from '../reducer/types';

const REQUEST_ITEM_COUNT = 10;

interface NewsRequestData {
    id: number;
    title: {
        ru: string;
        be: string;
    },
    previewImage: string;
}

export default async function getNewList(): Promise<News[]> {
    const res = await ky.get(
        `/api/news/list/${REQUEST_ITEM_COUNT}`,
        {
            retry: REQUEST_RETRY_COUNT,
        },
    ).json<NewsRequestData[]>();

    return res.map((elem) => ({
        id: elem.id,
        title: elem.title,
        preview: elem.previewImage,
    }));
}
