import { requestGetCategories } from './requestGetCategories';

export const getCategories = async () => {
    const categories = await requestGetCategories();

    return categories;
};
