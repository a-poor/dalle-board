export enum AppPage {
    HOME = "home",
    BOARD = "board",
    ABOUT = "about",
}

export interface IBoardData {
    frames: IFrameData[];
}

export interface IFrameData {
    imageData?: string;
    imagePrompt?: string;
    frameDescription?: string;
}
