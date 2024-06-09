import { MOCK_TOPICS } from '@/@mock/topic.mock';

export async function GET(): Promise<Response> {
    return Response.json({
        topics: MOCK_TOPICS,
        total: MOCK_TOPICS.length,
    });
}
