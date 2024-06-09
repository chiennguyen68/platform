/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React from 'react';
import { isEmpty } from '@/helpers/utils.helper';
import { FormValidationEnum } from '@/@types/enum.type';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { getAllKeyChainsOfObject, getObjectFieldByKeyChain } from '@/helpers/object.helper';

type FormValueType = string | number | boolean | Date | unknown[] | undefined;
export type FormSchemaType = Record<string, IFormSchemaItem> | Record<string, unknown>;

interface IFormProviderProps {
    children?: React.ReactNode;
    schema: FormSchemaType;
}
interface IFormValidation {
    type: FormValidationEnum;
    value?: FormValueType;
    message?: string;
}
interface IFormValidationError {
    type: FormValidationEnum;
    value?: FormValueType;
    message?: string;
}
interface IFormSchemaItem {
    type: 'string' | 'number' | 'boolean' | 'date' | 'list';
    value?: FormValueType;
    error?: IFormValidationError;
    validations?: IFormValidation[];
}

export interface IFormContext {
    fields: FormSchemaType | undefined;
    value: (key: string) => FormValueType;
    error: (key: string) => IFormValidationError | undefined;
    clearFieldError: (key: string) => void;
    updateFieldValue: (key: string, value: FormValueType) => void;
    validate: (key: string | string[]) => boolean;
    validateAll: () => boolean;
}

export const FormContext = React.createContext<IFormContext>({
    fields: undefined,
    value: () => undefined,
    error: () => undefined,
    clearFieldError: () => undefined,
    updateFieldValue: () => undefined,
    validate: () => true,
    validateAll: () => true,
});

export const FormProvider = ({ schema, children }: IFormProviderProps): JSX.Element => {
    const [fields, setFields] = React.useState<FormSchemaType>(schema);

    const { lang } = useAppProvider();

    const value = (keyChain: string): FormValueType => {
        const field = getObjectFieldByKeyChain(fields, keyChain) as IFormSchemaItem;
        if (isEmpty(field)) return undefined;

        switch (field.type) {
            case 'string':
                return isEmpty(field.value) ? undefined : String(field.value);
            case 'number':
                return isEmpty(field.value) ? undefined :Number(field.value);
            case 'boolean':
                return Boolean(field.value);
            case 'date':
                return isEmpty(field.value) ? undefined : new Date(field.value as Date);
            case 'list':
                return Array.isArray(field.value) ? field.value : [];
            default:
                return undefined;
        }
    };

    const error = (key: string): IFormValidationError | undefined => {
        const field = getObjectFieldByKeyChain(fields, key) as IFormSchemaItem;
        if (isEmpty(field)) return undefined;
        return field.error;
    };

    const updateFieldValue = (key: string, value: FormValueType): void => {
        const _fields = { ...fields };
        const field = getObjectFieldByKeyChain(_fields, key) as IFormSchemaItem;
        if (isEmpty(field)) return;
        field.value = value;
        setFields(_fields);
    };

    const clearFieldError = (key: string): void => {
        setFields((current) => {
            const _current = { ...current };
            const field = getObjectFieldByKeyChain(_current, key) as IFormSchemaItem;
            if (!isEmpty(field)) field.error = undefined;
            return _current;
        });
    };

    const isValidValue = (value: FormValueType, validation: IFormValidation): boolean => {
        switch (validation.type) {
            case FormValidationEnum.required: {
                if (isEmpty(value)) return false;
                return true;
            }
            case FormValidationEnum.maxLength: {
                if (isEmpty(value) || isEmpty(validation.value)) return true;
                if (String(value).length > Number(validation.value)) return false;
                return true;
            }
            default:
                return true;
        }
    };

    const validateSingleField = (key: string): boolean => {
        const field = getObjectFieldByKeyChain(fields, key) as IFormSchemaItem;

        if (isEmpty(field) || isEmpty(field.validations)) return true;
        const validations = field.validations as IFormValidation[];

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i];
            if (!isValidValue(field.value, validation)) {
                setFields((current) => {
                    const _current = { ...current };
                    const _field = getObjectFieldByKeyChain(_current, key) as IFormSchemaItem;
                    _field.error = {
                        type: validation.type,
                        message: validation.message || 'validation message',
                    };
                    return _current;
                });
                return false;
            }
        }

        return true;
    };

    const validate = (key: string | string[]): boolean => {
        if (!Array.isArray(key)) {
            return validateSingleField(key);
        } else {
            let flag = true;
            key.forEach((_key) => {
                if (!validateSingleField(_key)) {
                    flag = false;
                }
            });

            return flag;
        }
    };

    const validateAll = (): boolean => {
        const keyChains = getAllKeyChainsOfObject(fields, (data) =>
            Boolean(Object(data).type && Object(data).validations)
        );
        return validate(keyChains);
    };

    React.useEffect(() => {
        const keyChains = getAllKeyChainsOfObject(fields, (data) =>
            Boolean(Object(data).type && Object(data).validations)
        );
        keyChains.forEach((key) => {
            setFields((current) => {
                const _current = {
                    ...current,
                };
                const fieldOfCurrent = getObjectFieldByKeyChain(_current, key) as IFormSchemaItem;
                const fieldOfSchema = getObjectFieldByKeyChain(schema, key) as IFormSchemaItem;

                if (isEmpty(fieldOfCurrent) || isEmpty(fieldOfSchema)) {
                    return _current;
                }

                fieldOfCurrent.validations = fieldOfSchema.validations;
                const fieldOfCurrentError = fieldOfCurrent.error as IFormValidationError;
                if (isEmpty(fieldOfCurrentError)) {
                    return _current;
                }

                fieldOfCurrentError.message = (fieldOfCurrent.validations || []).find(
                    (item) => item.type === fieldOfCurrentError.type
                )?.message;

                return _current;
            });
        });
    }, [lang]);

    return (
        <FormContext.Provider
            value={{
                fields,
                value,
                error,
                clearFieldError,
                updateFieldValue,
                validate,
                validateAll,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
