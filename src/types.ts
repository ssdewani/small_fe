export interface Feed {
    id: number;
    ideas: Idea[];
    createdAt: Date;
}


// Interface for the items in the array
export interface Idea {
    title: string;
    description: string;
    liked: 'YES' | 'NO' | 'UNFILLED';
}