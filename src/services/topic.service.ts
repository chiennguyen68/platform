import { ITopic } from '@/@types/topic.type';
import { httpService } from './http.service';
import { TOPIC_API_URL } from '@/constants/api.constant';

class TopicService {
    getAllTopics = async (): Promise<ITopic[]> => {
        try {
            const res = await httpService.get(TOPIC_API_URL);
            return res.data.topics;
        } catch (e) {
            return [];
        }
    };
}

export const topicService = new TopicService();
