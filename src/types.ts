export enum AppPage {
    HOME = "home",
    BOARD = "board",
    ABOUT = "about",
}

export interface IBoardData {
    frames: IFrameData[];
}

export interface IFrameData {
    index: number;
    imageData?: string;
    imagePrompt?: string;
    frameDescription?: string;
}
