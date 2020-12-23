import ky from 'ky';
import { REQUEST_RETRY_COUNT } from '../../../share/constants';

interface ResponseGetNewsCount {
    count: number;
}

export default async function getNewsCount(): Promise<number> {
    return ky
        .get(
            '/api/news/count',
            {
                retry: REQUEST_RETRY_COUNT,
            },
        )
        .json<ResponseGetNewsCount>()
        .then((respData: ResponseGetNewsCount) => respData.count);
}
