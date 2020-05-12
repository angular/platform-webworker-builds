import { ErrorHandler, NgZone, PlatformRef, StaticProvider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export declare const platformWorkerApp: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
export declare function errorHandler(): ErrorHandler;
export declare function createMessageBus(zone: NgZone): MessageBus;
export declare function setupWebWorker(): void;
/**
 * The ng module for the worker app side.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export declare class WorkerAppModule {
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<WorkerAppModule, never, never, [typeof i1.CommonModule, typeof i0.ApplicationModule]>;
    static ɵinj: i0.ɵɵInjectorDef<WorkerAppModule>;
}
