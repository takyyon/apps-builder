import { Problem } from "../problems/Problems.types";
import { Category } from "../categories/Categories.types";
import { Platform } from "../platforms/Platforms.types";
import { Tag } from "../tags/Tags.types";

export interface App {
    name: string;
    icon: string;
    description: string;
    images: string[];
    problems?: Problem[];
    categories?: Category[];
    platforms?: Platform[];
    tags?: Tag[];
    _id?: string;
}