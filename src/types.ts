export enum AppPage {
    HOME = "Home",
    BOARD = "Board",
    ABOUT = "About",
}

export interface IBoardData {
    frames: IFrameData[];
}

export interface IFrameData {
    index: number;
    imageData: string;
    imagePrompt: string;
    frameDescription: string;
}
