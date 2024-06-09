import { IPost } from '@/@types/post.type';
import { httpService } from './http.service';
import { isEmpty } from '@/helpers/utils.helper';
import { POST_API_URL } from '@/constants/api.constant';
import { DEFAULT_ITEMS_NUMBER_PER_PAGE } from '@/constants/common.constant';


interface ICreatPost {
    message: string;
  }
interface IEditPost {
    message: string;
  }
interface IGetPostsRequestParams {
  page: number;
  size?: number;
  search?: string;
  topic?: string;
  status?: string;
}
interface IGetPostsResponse {
  posts: IPost[];
  total: number;
}

interface ICreatePostRequestParams {
  title: string;
  description?: string;
  topic: string | number;
  status: string;
  content: string;
}

interface ICreatePostResponse {
  code?: number;
  data?: ICreatPost[];
}

interface IEditPostRequestParams {
  id: string;
  title: string;
  description?: string;
  topic: string | number;
  status: string;
  content: string;
}

interface IEditPostResponse {
  code?: number;
  data?: IEditPost[];
}

interface IDetailPostRequestParams {
  id: string | number | Date;
}
interface IDetailPostResponse {
  code?: number;
  data?: IPost;
}

class PostService {
    getPosts = async ({
        page,
        size,
        search,
        topic,
        status,
    }: IGetPostsRequestParams): Promise<IGetPostsResponse> => {
        let url = `${POST_API_URL}?page=${page}&size=${
            size || DEFAULT_ITEMS_NUMBER_PER_PAGE
        }`;
        if (!isEmpty(search)) url += `&search=${search}`;
        if (!isEmpty(topic)) url += `&topic=${topic}`;
        if (!isEmpty(status)) url += `&status=${status}`;

        try {
            const res = await httpService.get(url);
            return res.data.data;
        } catch (e) {
            return {
                posts: [],
                total: 0,
            };
        }
    };

    createPost = async ({
        title,
        description,
        topic,
        status,
        content,
    }: ICreatePostRequestParams): Promise<ICreatePostResponse> => {
        const payload = {
            title,
            description,
            topic_id: topic,
            status,
            content,
        };
        const url = POST_API_URL;
        try {
            const res = await httpService.post(url, payload);
            return res.data;
        } catch (e) {
            return {};
        }
    };
    editPost = async ({
        id,
        title,
        description,
        topic,
        status,
        content,
    }: IEditPostRequestParams): Promise<IEditPostResponse> => {
        const payload = {
            id,
            title,
            description,
            topic_id: topic,
            status,
            content,
        };
        const url = POST_API_URL;
        try {
            const res = await httpService.put(url, payload);
            return res.data;
        } catch (e) {
            return {};
        }
    };

    detailPost = async ({
        id,
    }: IDetailPostRequestParams): Promise<IDetailPostResponse> => {
        const url = `${POST_API_URL}/${id}`;
        try {
            const res = await httpService.get(url);
            return res.data;
        } catch (e) {
            return {};
        }
    };
}

export const postService = new PostService();
