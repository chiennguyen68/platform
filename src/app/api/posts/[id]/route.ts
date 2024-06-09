/* eslint-disable indent */
import { MOCK_POSTS } from '@/@mock/post.mock';
import { isEmpty } from '@/helpers/utils.helper';
import { NextRequest } from 'next/server';
import { validate } from '../common';

export async function GET(
    _: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    const { id } = params;

    const post = MOCK_POSTS.find((item) => item.id === id);

    return new Promise((resolve) => {
        setTimeout(async () => {
            if (isEmpty(post)) {
                resolve(
                    Response.json({
                        code: 3,
                        data: {
                            message: 'post not found',
                        },
                    })
                );
            }

            resolve(
                Response.json({
                    code: 0,
                    data: {
                        ...post,
                        content:
                            '<h2 id="title_0">A Problem in Need of a Creative Solution</h2>\n<p>In the 1870s, newspapers and printers faced a very specific and very costly problem. Photography was a new and exciting medium at the time. Readers wanted to see more pictures, but nobody could figure out how to print images quickly and cheaply.</p>\n<p>For example, if a newspaper wanted to print an image in the 1870s, they had to commission an engraver to etch a copy of the photograph onto a steel plate by hand. These plates were used to press the image onto the page, but they often broke after just a few uses. This process of photoengraving, you can imagine, was remarkably time consuming and expensive.</p>\n<p>The man who invented a solution to this problem was named Frederic Eugene Ives. He went on to become a trailblazer in the field of photography and held over 70 patents by the end of his career. His story of creativity and innovation, which I will share now, is a useful case study for understanding the 5 key steps of the creative process.</p>\n<h2 id="title_1">A Flash of Insight</h2>\n<p>Ives got his start as a printer&rsquo;s apprentice in Ithaca, New York. After two years of learning the ins and outs of the printing process, he began managing the photographic laboratory at nearby Cornell University. He spent the rest of the decade experimenting with new photography techniques and learning about cameras, printers, and optics.</p>\n<p>In 1881, Ives had a flash of insight regarding a better printing technique.</p>\n<p>&ldquo;While operating my photostereotype process in Ithaca, I studied the problem of halftone process,&rdquo; Ives said. &ldquo;I went to bed one night in a state of brain fog over the problem, and the instant I woke in the morning saw before me, apparently projected on the ceiling, the completely worked out process and equipment in operation.&rdquo;<a class="footnote-button" style="box-sizing: border-box; background: none; color: rgb(17, 17, 17); text-decoration: none; padding: 0.325em; border: none; transition: opacity 0.25s ease 0s; position: relative; z-index: 5; top: -0.2em; display: inline; margin: 0px 0.1em 0px 0.2em; height: 0.9em; width: 1.78em; border-radius: 0.6em; cursor: pointer; opacity: 0.5; backface-visibility: hidden; line-height: 0; vertical-align: middle;" href="https://jamesclear.com/five-step-creative-process" rel="footnote" name="note-1-19047" data-footnote-number="1" data-footnote-identifier="1" data-footnote-content="&lt;p&gt;This quote is excerpted from &lt;a href=&quot;https://jamesclear.com/book/a-technique-for-producing-ideas&quot;&gt;A Technique for Producing Ideas&lt;/a&gt; by James Webb Young. Page 21.&lt;/p&gt;"></a></p>\n<p>Ives quickly translated his vision into reality and patented his printing approach in 1881. He spent the remainder of the decade improving upon it. By 1885, he had developed a simplified process that delivered even better results. The Ives Process, as it came to be known, reduced the cost of printing images by 15x and remained the standard printing technique for the next 80 years.</p>\n<p>Alright, now let&rsquo;s discuss what lessons we can learn from Ives about the creative process.</p>',
                    },
                })
            );
        }, 500);
    });
}

export async function PUT(request: NextRequest): Promise<Response> {
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

export async function DELETE(): Promise<Response> {
    return new Promise((resolve) => {
        const res = Response.json({
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
