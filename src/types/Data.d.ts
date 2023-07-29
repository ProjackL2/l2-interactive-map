import { PinOutput } from "./validators";

export interface IType {
    id: string;
    title: string;
    description: string | null;
    categoryId: string;
    visible: boolean;
    icon?: string;
}

export interface ICategory {
    id: string;
    title: string;
    icon: string;
    description: string | null;
}

export interface IAlert {
    id?: string;
    title: string;
    text: string[];
}
