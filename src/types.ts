export interface IBoardData {
    frames: IFrameData[];
}

export interface IFrameData {
    index: number;
    imageData: string;
    imagePrompt: string;
    frameDescription: string;
}
