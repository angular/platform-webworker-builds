import { InjectionToken, StaticProvider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
import * as i0 from "@angular/core";
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
    static ɵfac: i0.ɵɵFactoryDef<WebWorkerInstance, never>;
    static ɵprov: i0.ɵɵInjectableDef<WebWorkerInstance>;
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare const WORKER_SCRIPT: InjectionToken<string>;
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: InjectionToken<{
    start: () => void;
}[]>;
export declare const _WORKER_UI_PLATFORM_PROVIDERS: StaticProvider[];
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare const platformWorkerUi: (extraProviders?: StaticProvider[] | undefined) => import("@angular/core").PlatformRef;
