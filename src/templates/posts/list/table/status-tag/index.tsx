import { PostStatusEnum } from '@/@types/enum.type';
import { Tag } from '@/components/kit/tag';
import { COLOR } from '@/components/token/color';
import { useLocale } from '@/hooks/useLocale.hook';

interface IProps {
    status: PostStatusEnum;
}

const StatusTag = ({ status }: IProps): JSX.Element => {
    const translate = useLocale();

    return (
        <Tag
            color={status === PostStatusEnum.published ? COLOR['green-1'] : ''}
            bgColor={
                status === PostStatusEnum.published ? COLOR['green-5'] : ''
            }
        >
            {translate(`common.label.${status}`)}
        </Tag>
    );
};

export default StatusTag;
