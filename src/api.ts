import _dummyData from './dummyData.json';

export const modelURL = "https://bf.dallemini.ai/generate";

export const dummyData = _dummyData as IModelResponse;

export interface IModelRequest {
    prompt: string;
    signal?: AbortController;
}

export interface IModelResponse {
    version: string;
    images: string[];
}

export interface IAPIResponse {
    res?: IModelResponse;
    err?: object;
}

export async function generateImages(req: IModelRequest): Promise<IAPIResponse>{
    return await fetch(modelURL, {
        referrer: "https://hf.space/",
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
            prompt: req.prompt,
        }),
    })
    .then(res => res.json())
    .then(res => {
        if (!res) throw Error("No response from server");
        if (!("images" in res)) throw Error("API response missing `images`");
        return res;
    })
    .then(res => ({res}))
    .catch(err => ({err}));
}
