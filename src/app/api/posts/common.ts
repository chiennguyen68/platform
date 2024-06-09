import { PostStatusEnum } from '@/@types/enum.type';
import { isEmpty } from '@/helpers/utils.helper';

export const validate = (requestBody: Record<string, unknown>): string | undefined => {
    const { title, description, topic_id, status, content } = requestBody;

    if (isEmpty(title)) return 'title is required';
    if (typeof title !== 'string') return 'title must be string';
    if (!isEmpty(description) && typeof description !== 'string')
        return 'description must be string';
    if (isEmpty(topic_id)) return 'topic_id is required';
    if (!Array.isArray(topic_id)) return 'topic_id must be a list';
    if (isEmpty(content)) return 'content is required';
    if (![PostStatusEnum.draft, PostStatusEnum.published].find((item) => item === status)) {
        return 'status must be draft or published';
    }

    return undefined;
};
