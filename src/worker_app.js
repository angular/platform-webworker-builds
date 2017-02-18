/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common/index';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, NgModule, NgZone, RootRenderer, createPlatformFactory, platformCore } from '@angular/core/index';
import { DOCUMENT } from '@angular/platform-browser/index';
import { BROWSER_SANITIZATION_PROVIDERS } from './private_import_platform-browser';
import { ON_WEB_WORKER } from './web_workers/shared/api';
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from './web_workers/shared/client_message_broker';
import { MessageBus } from './web_workers/shared/message_bus';
import { PostMessageBus, PostMessageBusSink, PostMessageBusSource } from './web_workers/shared/post_message_bus';
import { RenderStore } from './web_workers/shared/render_store';
import { Serializer } from './web_workers/shared/serializer';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from './web_workers/shared/service_message_broker';
import { WebWorkerRootRenderer } from './web_workers/worker/renderer';
import { WorkerDomAdapter } from './web_workers/worker/worker_adapter';
/**
 * @experimental
 */
export const /** @type {?} */ platformWorkerApp = createPlatformFactory(platformCore, 'workerApp');
/**
 * @return {?}
 */
export function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
const /** @type {?} */ _postMessage = {
    postMessage: (message, transferrables) => {
        ((postMessage))(message, transferrables);
    }
};
/**
 * @param {?} zone
 * @return {?}
 */
export function createMessageBus(zone) {
    const /** @type {?} */ sink = new PostMessageBusSink(_postMessage);
    const /** @type {?} */ source = new PostMessageBusSource();
    const /** @type {?} */ bus = new PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
/**
 * @return {?}
 */
export function setupWebWorker() {
    WorkerDomAdapter.makeCurrent();
}
/**
 * The ng module for the worker app side.
 *
 * \@experimental
 */
export class WorkerAppModule {
}
WorkerAppModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    BROWSER_SANITIZATION_PROVIDERS, Serializer, { provide: DOCUMENT, useValue: null },
                    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
                    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
                    WebWorkerRootRenderer, { provide: RootRenderer, useExisting: WebWorkerRootRenderer },
                    { provide: ON_WEB_WORKER, useValue: true }, RenderStore,
                    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                    { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] },
                    { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true }
                ],
                exports: [CommonModule, ApplicationModule]
            },] },
];
/** @nocollapse */
WorkerAppModule.ctorParameters = () => [];
function WorkerAppModule_tsickle_Closure_declarations() {
    /** @type {?} */
    WorkerAppModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WorkerAppModule.ctorParameters;
}
//# sourceMappingURL=worker_app.js.map