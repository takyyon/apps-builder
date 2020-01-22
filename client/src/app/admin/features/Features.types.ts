import { Problem } from "../problems/Problems.types";
import { Category } from "../categories/Categories.types";
import { Platform } from "../platforms/Platforms.types";
import { Tag } from "../tags/Tags.types";
import { App } from "../apps/Apps.types";

export interface Feature {
    name: string;
    icon: string;
    description: string;
    time: Number;
    cost: Number;
    images: string[];
    app?: App;
    problems?: Problem[];
    categories?: Category[];
    platforms?: Platform[];
    tags?: Tag[];
    _id?: string;
}