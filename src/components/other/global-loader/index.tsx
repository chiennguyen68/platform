import styles from './styles.module.scss';
import { LoadableArea } from '@/components/kit/loadable-area';

const GlobalLoader = (): JSX.Element => {
    return <LoadableArea isLoading className={styles.container} />;
};

export default GlobalLoader;
