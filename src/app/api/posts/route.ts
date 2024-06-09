/* eslint-disable indent */
import { MOCK_POSTS } from '@/@mock/post.mock';
import { NextRequest } from 'next/server';
import { isNumber } from '@/helpers/number.helper';
import { DEFAULT_ITEMS_NUMBER_PER_PAGE } from '@/constants/common.constant';
import { isEmpty } from '@/helpers/utils.helper';
import { validate } from './common';

export async function GET(request: NextRequest): Promise<Response> {
    const topicId = request.nextUrl.searchParams.get('topic');
    const search = request.nextUrl.searchParams.get('search');
    const status = request.nextUrl.searchParams.get('status');
    const page = request.nextUrl.searchParams.get('page');
    const size = request.nextUrl.searchParams.get('size');
    const sortField = request.nextUrl.searchParams.get('sort_field');
    const sortDirection = request.nextUrl.searchParams.get('sort_dir');

    const postsThatMatchFilter = MOCK_POSTS.filter((item) => {
        if (status && item.status !== status) {
            return false;
        }

        if (search && item.title.toLowerCase().indexOf(search.toLowerCase()) < 0) {
            return false;
        }

        if (topicId) {
            let flag = false;
            item.topicId.forEach((id) => {
                if (
                    String(topicId || '')
                        .split(',')
                        .find((_id) => _id === id)
                ) {
                    flag = true;
                }
            });
            return flag;
        }

        return true;
    });

    const _page = page && isNumber(page) ? Number(page) : 0;
    const _size = size && isNumber(size) ? Number(size) : DEFAULT_ITEMS_NUMBER_PER_PAGE;

    return new Promise((resolve) => {
        const postsResult = postsThatMatchFilter.slice(_size * _page, _size * _page + _size);
        switch (`${sortField}-${sortDirection}`) {
            case 'title-asc':
                postsResult.sort((a, b) => (a.title < b.title ? -1 : 1));
                break;
            case 'title-des':
                postsResult.sort((a, b) => (a.title > b.title ? -1 : 1));
                break;
            case 'createdAt-asc':
                postsResult.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
                break;
            default:
                postsResult.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
                break;
        }

        setTimeout(() => {
            resolve(
                Response.json({
                    code: 0,
                    data: {
                        posts: postsResult,
                        total: postsThatMatchFilter.length,
                    },
                })
            );
        }, 500);
    });
}

export async function POST(request: NextRequest): Promise<Response> {
    let requestBody: Record<string, unknown> = {};
    try {
        requestBody = (await request.json()) as Record<string, unknown>;
    } catch (e) {
        //
    }
    const validationMessage = validate(requestBody);

    return new Promise((resolve) => {
        const res = !isEmpty(validationMessage)
            ? Response.json({
                  code: 1,
                  data: {
                      message: validationMessage,
                  },
              })
            : Response.json({
                  code: 0,
                  data: {
                      message: 'success',
                  },
              });

        setTimeout(async () => {
            resolve(res);
        }, 500);
    });
}
