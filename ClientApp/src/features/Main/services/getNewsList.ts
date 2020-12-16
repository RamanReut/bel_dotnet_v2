import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';
import { News } from '../reducer/types';

interface NewsRequestData {
    id: number;
    title: {
        ru: string;
        be: string;
    },
    previewImage: string;
}

async function getNewsList(start: number, end: number): Promise<News[]> {
    const res = await ky.get(
        `/api/news/list/${start}/${end}`,
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

export default getNewsList;
