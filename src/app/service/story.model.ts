

export interface Story {
    title: string;
    ideas?: Node[];
    boards?: Board[];
}

export interface Node {
    uuid: string;
    ideas?: Node[];
    text?: string;
}

export interface Board {
    uuid: string;
    boxes: Box[];
}

export interface Box {
    uuid: string;
    action: string;
    layout?: {
        newLine?: boolean;
        rowSpan?: number;
        height?: number;
        width?: number;
    }
    speech?: SpeechItem[];
}

export interface SpeechItem {
    uuid: string;
    text: string;
    characterRef?: string;
}