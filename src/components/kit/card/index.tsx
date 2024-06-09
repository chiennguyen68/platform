import styles from './styles.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const Card = ({ children }: IProps): JSX.Element => {
    return <div className={styles.container}>{children}</div>;
};

export { Card };
