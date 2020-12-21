import ky from 'ky';

interface DeleteResponse {
    id: number;
}

export default async function deleteNews(id: number): Promise<number> {
    const resp = await ky.delete(`/api/news/${id}`).json<DeleteResponse>();
    return resp.id;
}
