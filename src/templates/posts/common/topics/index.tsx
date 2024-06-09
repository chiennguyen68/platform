/* eslint-disable indent */
import styles from './styles.module.scss';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { ITopic } from '@/@types/topic.type';
import { Tag } from '@/components/kit/tag';
import { COLOR } from '@/components/token/color';
import { cn } from '@/helpers/utils.helper';

interface IProps {
    className?: string;
}

const TopicsSelection = ({ className }: IProps): JSX.Element => {
    const form = useFormProvider();
    const { topics } = useAppProvider();

    const isTopicSelected = (topic: ITopic): boolean => {
        const selectedTopicId = [...((form.value('topic') as string[]) || [])];
        return !!selectedTopicId.find((id) => id === topic.id);
    };

    const handleToggleTopic =
        (topic: ITopic): VoidFunction =>
        (): void => {
            let selectedTopicId = [...((form.value('topic') as string[]) || [])];
            if (!isTopicSelected(topic)) selectedTopicId.push(String(topic.id));
            else selectedTopicId = selectedTopicId.filter((id) => id !== topic.id);

            form.updateFieldValue('topic', selectedTopicId);
            form.clearFieldError('topic');
        };

    return (
        <div className={cn(styles.tags, className)}>
            {topics.map((item) => {
                const isSelected = isTopicSelected(item);

                return (
                    <Tag
                        key={item.id}
                        isBlur
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={handleToggleTopic(item)}
                        bgColor={isSelected ? COLOR['orange-5'] : ''}
                        color={isSelected ? COLOR['orange-1'] : ''}
                    >
                        {item.name.en}
                    </Tag>
                );
            })}
        </div>
    );
};

export default TopicsSelection;
