import React from 'react';

interface IPostsContextProps {
    isShowConfirmationDialog?: boolean;
    showConfirmationDialog: VoidFunction;
    hideConfirmationDialog: VoidFunction;
}

const EMPTY_POST_CONTEXT_VALUE: IPostsContextProps = {
    showConfirmationDialog: () => undefined,
    hideConfirmationDialog: () => undefined,
};

export const PostsContext = React.createContext<IPostsContextProps>(
    EMPTY_POST_CONTEXT_VALUE
);

export const PostsContextProvider = ({
    children,
}: {
    children?: React.ReactNode;
}): JSX.Element => {
    const [isShowConfirmationDialog, setIsShowConfirmationDialog] =
        React.useState<boolean>(false);

    return (
        <PostsContext.Provider
            value={{
                isShowConfirmationDialog,
                showConfirmationDialog: (): void => {
                    setIsShowConfirmationDialog(true);
                },
                hideConfirmationDialog: (): void => {
                    setIsShowConfirmationDialog(false);
                },
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};
