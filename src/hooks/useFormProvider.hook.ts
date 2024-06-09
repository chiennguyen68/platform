'use client';

import React from 'react';
import { FormContext, IFormContext } from '@/providers/form.provider';

export const useFormProvider = (): IFormContext => {
    const form = React.useContext(FormContext);
    return form;
};
