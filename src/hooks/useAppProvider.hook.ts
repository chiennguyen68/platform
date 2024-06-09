import React from 'react';
import { AppContext, IAppContextProps } from '@/providers/app.provider';

export const useAppProvider = (): IAppContextProps => {
    const context = React.useContext(AppContext);
    return context;
};
