import { InjectionToken, PlatformRef, StaticProvider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @experimental WebWorker support is currently experimental.
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_SCRIPT: InjectionToken<string>;
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: InjectionToken<{
    start: () => void;
}[]>;
export declare const _WORKER_UI_PLATFORM_PROVIDERS: StaticProvider[];
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const platformWorkerUi: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
