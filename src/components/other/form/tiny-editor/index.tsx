/* eslint-disable react/display-name */
import React from 'react';
import FormValidationError from '../validation-error';
import styles from './styles.module.scss';
import { NUNITO_GOOGLE_FONT_URL } from '@/constants/common.constant';
import { COLOR } from '@/components/token/color';
import { Editor } from '@tinymce/tinymce-react';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { cn, isEmpty } from '@/helpers/utils.helper';
import { LoadableArea } from '@/components/kit/loadable-area';

import './styles.scss';

interface IEditorProps {
    name: string;
    placeholder?: string;
    className?: string;
    hasError?: boolean;
    initValue?: string;
    height?: string;
    AddToolbar?: string;
    menubar?: boolean;
    branding?: boolean;
    statusbar?: boolean;
    selector?: undefined;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

const TinyEditor = ({
    name,
    className,
    initValue,
    height = '600px',
    AddToolbar,
    menubar = false,
    branding = false,
    statusbar = false,
    selector,
    onChange,
    onBlur,
}: IEditorProps): JSX.Element => {
    const form = useFormProvider();
    const error = form.error(name);
    const value = form.value(name);

    const [isProcessing, setIsProcessing] = React.useState<boolean>(true);

    const handleOnChange = (e: string): void => {
        const value = e;
        form.updateFieldValue(name, value);
        form.clearFieldError(name);
        onChange?.(e);
    };

    const handleOnBlur = (): void => {
        form.validate(name);
        onBlur?.(String(form.value(name)));
    };
    return (
        <LoadableArea
            isLoading={isProcessing}
            className={cn(
                'custom-tiny-editor-container',
                className,
                styles.container,
                isProcessing && styles.loading,
                !isEmpty(error) && styles.hasError
            )}
        >
            <Editor
                apiKey="vpjxn6qscrghczhae8hd1i5brd81bgr0ec0nr77d8l0utndy"
                onEditorChange={(newText) => handleOnChange(newText)}
                onBlur={handleOnBlur}
                initialValue={initValue}
                value={!isEmpty(value) ? String(value) : undefined}
                init={{
                    height: height,
                    menubar: menubar,
                    branding: branding,
                    statusbar: statusbar,
                    selector: selector,
                    toolbar:
                        'undo redo | formatselect | ' +
                        'blocks | fontsize | bold italic | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat' +
                        `${AddToolbar}`,
                    content_style: `
                        @import url("${NUNITO_GOOGLE_FONT_URL}"); 
                        body{
                            font-size: 12pt;
                            font-family: Nunito, sans-serif; scrollbar-width: thin;
                            scrollbar-color: ${COLOR['grey-6']} #fbfbfb;
                            &::-webkit-scrollbar {
                                width: 6px;
                                height: 6px;
                                border-radius: 25px;
                            }
                            &::-webkit-scrollbar-track {
                                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.15);
                            }
                            &::-webkit-scrollbar-thumb {
                                background-color: ${COLOR['grey-6']};
                                border-radius: 25px;
                                height: 6px;
                            }
                            &::-webkit-scrollbar-thumb:hover{
                                background-color: ${COLOR['grey-4']};
                            }
                        }`,
                    setup: (editor) => {
                        editor.on('init', () => {
                            setIsProcessing(false);
                        });
                    },
                }}
            />
            {!!error && <FormValidationError message={String(error.message)} />}
        </LoadableArea>
    );
};

export default TinyEditor;
