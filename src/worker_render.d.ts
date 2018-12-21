/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken, PlatformRef, StaticProvider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @publicApi
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * @publicApi
 */
export declare const WORKER_SCRIPT: InjectionToken<string>;
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @publicApi
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: InjectionToken<{
    start: () => void;
}[]>;
export declare const _WORKER_UI_PLATFORM_PROVIDERS: StaticProvider[];
/**
 * @publicApi
 */
export declare const platformWorkerUi: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
