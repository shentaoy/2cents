
export type CategoryConfig = {
    name: string;
    keywords: string[];
};

export const PREDEFINED_CATEGORIES = require('../data/predefined_categories.json') as CategoryConfig[];
export const EXCLUDE_CATEGORIES = ['Exclude', 'House'];