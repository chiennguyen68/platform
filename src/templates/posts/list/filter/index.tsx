/* eslint-disable indent */
import React from 'react';
import styles from './styles.module.scss';
import FormInput from '@/components/other/form/input';
import FormSelect from '@/components/other/form/select';
import TopicsSelection from '../../common/topics';
import { Search as SearchIcon } from 'lucide-react';
import { PostStatusEnum } from '@/@types/enum.type';
import { useLocale } from '@/hooks/useLocale.hook';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { isEmpty } from '@/helpers/utils.helper';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/kit/select';

const PostsFilter = (): JSX.Element => {
    const translate = useLocale();
    const form = useFormProvider();

    const handleClearTopics = (): void => {
        form.updateFieldValue('topic', []);
    };

    return (
        <>
            <div className={styles.topics}>
                <div className={styles.title}>
                    <h3>{translate('common.label.topic')}</h3>
                    {!isEmpty(form.value('topic')) && (
                        <button onClick={handleClearTopics}>Clear</button>
                    )}
                </div>
                <TopicsSelection />
            </div>

            <div className={styles.container}>
                <div className={styles.selection}>
                    <FormSelect name="status">
                        <SelectTrigger>
                            <SelectValue placeholder={translate('common.table.filterStatus')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                {translate('common.table.filterStatus')}:{' '}
                                {translate('common.table.filterAll')}
                            </SelectItem>
                            <SelectItem value={PostStatusEnum.published}>
                                {translate('common.table.filterStatus')}:{' '}
                                {translate('common.table.filterTopicPublished')}
                            </SelectItem>
                            <SelectItem value={PostStatusEnum.draft}>
                                {translate('common.table.filterStatus')}:{' '}
                                {translate('common.table.filterTopicDraft')}
                            </SelectItem>
                        </SelectContent>
                    </FormSelect>
                </div>

                <div className={styles.rightArea}>
                    <div className={styles.search}>
                        <SearchIcon size={16} className={styles.icon} />
                        <FormInput
                            name="search"
                            placeholder={translate('common.table.filterSearch')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostsFilter;
