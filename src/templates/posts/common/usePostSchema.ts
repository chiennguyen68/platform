import { FormValidationEnum, PostStatusEnum } from '@/@types/enum.type';
import { useLocale } from '@/hooks/useLocale.hook';
import { FormSchemaType } from '@/providers/form.provider';

export const usePostSchema = (): FormSchemaType => {
    const translate = useLocale();

    return {
        isProcessing: {
            type: 'boolean',
            value: false,
        },
        title: {
            type: 'string',
            validations: [
                {
                    type: FormValidationEnum.required,
                    message: translate('postsManagement.requirePostTitle'),
                },
                {
                    type: FormValidationEnum.maxLength,
                    value: 50,
                    message: translate('postsManagement.validateMaxLengthTitle'),
                },
            ],
        },
        description: {
            type: 'string',
            validations: [
                {
                    type: FormValidationEnum.maxLength,
                    value: 100,
                    message: translate('postsManagement.validateMaxLengthDescription'),
                },
            ],
        },
        topic: {
            type: 'list',
            value: [],
            validations: [
                {
                    type: FormValidationEnum.required,
                    message: 'Topic is required',
                },
            ],
        },
        status: {
            type: 'string',
            value: PostStatusEnum.draft,
        },
        content: {
            type: 'string',
            validations: [
                {
                    type: FormValidationEnum.required,
                    message: translate('postsManagement.requirePostContent'),
                },
            ],
        },
    };
};
