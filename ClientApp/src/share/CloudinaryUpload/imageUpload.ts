import ky from 'ky';

const CLOUD = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_UPLOAD_PRESET as string;
const ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`;

function prepareForm(file: string): FormData {
    const form = new FormData();
    form.append('upload_preset', UPLOAD_PRESET);
    form.append('file', file);

    return form;
}

export default async function uploadImage(file: string): Promise<string> {
    const response = await ky.post(ENDPOINT, {
        body: prepareForm(file),
    });

    return response.json().then((data) => data.public_id as string);
}
