import { DEBOUCE_TIMEOUT } from '@/constants/common.constant';

class Deboucer {
    handler: ReturnType<typeof setTimeout> | undefined;

    constructor() {
        this.handler = undefined;
    }

    exec = (callback: VoidFunction): void => {
        this.destroy();
        this.handler = setTimeout(() => {
            callback();
        }, DEBOUCE_TIMEOUT);
    };

    destroy = (): void => {
        clearTimeout(this.handler);
    };
}

export default Deboucer;
