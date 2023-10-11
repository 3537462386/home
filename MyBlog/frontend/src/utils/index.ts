export interface IndexInitData {
    headContent:any[];
    headTile:string;
    currentTime:string;
    bgImg:string;
    posts:any[];
}

export type Post = {
    title: string;
    content: string;
    sketch: string;
    imgs: string;
    comments?: string[];
    likes?: number;
    createdAt?: Date;
    views?: number;
};