import styles from './styles.module.scss';

interface IProps {
    message: string;
}

const FormValidationError = ({ message }: IProps): JSX.Element => {
    return <div className={styles.container}>
        {message}
    </div>;
};

export default FormValidationError;
