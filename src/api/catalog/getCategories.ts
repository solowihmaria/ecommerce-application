import { getUserToken } from '../auth/getToken';
import { requestGetCategories } from './requestGetCategories';

export const getCategories = async (loginStatus: boolean) => {
    const token = await getUserToken(loginStatus);
    const categories = await requestGetCategories(token);

    return categories;
};
