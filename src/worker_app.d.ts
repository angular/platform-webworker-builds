import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ErrorHandler, NgZone, PlatformRef, StaticProvider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * @publicApi
 */
export declare const platformWorkerApp: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
export declare function errorHandler(): ErrorHandler;
export declare function createMessageBus(zone: NgZone): MessageBus;
export declare function setupWebWorker(): void;
/**
 * The ng module for the worker app side.
 *
 * @publicApi
 */
export declare class WorkerAppModule {
    static ngModuleDef: i0.ɵNgModuleDefWithMeta<WorkerAppModule, never, never, [typeof i1.CommonModule, typeof i0.ApplicationModule]>;
    static ngInjectorDef: i0.ɵInjectorDef<WorkerAppModule>;
}
