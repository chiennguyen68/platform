'use client';

import FHeightArea from '@/components/other/f-height-area';
import FormInput from '@/components/other/form/input';
import FormItem from '@/components/other/form/item';
import FormValidationError from '@/components/other/form/validation-error';
import FormRadioGroup from '@/components/other/form/radio-group';
import TinyEditor from '@/components/other/form/tiny-editor';
import TopicsSelection from '../topics';
import styles from './styles.module.scss';
import { PostStatusEnum } from '@/@types/enum.type';
import { useLocale } from '@/hooks/useLocale.hook';
import { LoadableArea } from '@/components/kit/loadable-area';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { cn, isEmpty } from '@/helpers/utils.helper';

const PostForm = (): JSX.Element => {
    const translate = useLocale();
    const form = useFormProvider();
    const formTopicError = form.error('topic');

    const handleClearTopics = (): void => {
        form.updateFieldValue('topic', []);
    };

    return (
        <LoadableArea isLoading={form.value('isProcessing') as boolean}>
            <FHeightArea>
                <div className={styles.form}>
                    <div className={styles.leftArea}>
                        <FormItem
                            label={`${translate('postsManagement.titleFormPost')} `}
                            helperText={`${translate(
                                'postsManagement.validateTextMax'
                            )} 50 ${translate('postsManagement.characters')} `}
                            hasRequiredMarker
                        >
                            <FormInput
                                name="title"
                                placeholder={`${translate(
                                    'postsManagement.titleFormPlaceholderPost'
                                )} `}
                                className="w-full"
                            />
                        </FormItem>

                        <FormItem
                            label={`${translate('postsManagement.descriptionFormPost')} `}
                            helperText={`${translate(
                                'postsManagement.validateTextMax'
                            )} 100  ${translate('postsManagement.characters')} `}
                        >
                            <FormInput
                                name="description"
                                placeholder={`${translate(
                                    'postsManagement.descriptionFormPlaceholderPost'
                                )} `}
                                className="w-full"
                            />
                        </FormItem>

                        <FormItem
                            label={`${translate('postsManagement.topicFormFormPost')}`}
                            helperText={translate('postsManagement.validateAtLeast1Topic')}
                            hasRequiredMarker
                        >
                            <div className={cn(styles.topicTags)}>
                                <div
                                    className={cn(
                                        !isEmpty(formTopicError) && styles.hasError,
                                        styles.tags
                                    )}
                                >
                                    <TopicsSelection />
                                    {!isEmpty(form.value('topic')) && (
                                        <div className="flex justify-end">
                                            <button
                                                className={styles.clearButton}
                                                onClick={handleClearTopics}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {!isEmpty(formTopicError) && (
                                    <FormValidationError
                                        message={formTopicError?.message as string}
                                    />
                                )}
                            </div>
                        </FormItem>

                        <FormItem
                            label={`${translate('postsManagement.statusFormPost')}`}
                            hasRequiredMarker
                        >
                            <FormRadioGroup
                                name="status"
                                options={[
                                    {
                                        label: translate('common.table.filterTopicDraft'),
                                        value: PostStatusEnum.draft,
                                    },
                                    {
                                        label: translate('common.table.filterTopicPublished'),
                                        value: PostStatusEnum.published,
                                    },
                                ]}
                            />
                        </FormItem>

                        <FormItem
                            label={`${translate('postsManagement.contentFormPost')} `}
                            hasRequiredMarker
                        >
                            <TinyEditor
                                name="content"
                            />
                        </FormItem>
                    </div>
                </div>
            </FHeightArea>
        </LoadableArea>
    );
};

export default PostForm;
