/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ErrorHandler, Injectable, InjectionToken, Injector, NgZone, PLATFORM_INITIALIZER, RendererFactoryV2, RootRenderer, Testability, createPlatformFactory, isDevMode, platformCore } from '@angular/core/index';
import { AnimationDriver, DOCUMENT, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser/index';
import { APP_ID_RANDOM_PROVIDER } from './private_import_core';
import { BROWSER_SANITIZATION_PROVIDERS, BrowserDomAdapter, BrowserGetTestability, DomEventsPlugin, DomRendererFactoryV2, DomRootRenderer, DomRootRenderer_, DomSharedStylesHost, HammerGesturesPlugin, KeyEventsPlugin, SharedStylesHost, WebAnimationsDriver, getDOM } from './private_import_platform-browser';
import { ON_WEB_WORKER } from './web_workers/shared/api';
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from './web_workers/shared/client_message_broker';
import { MessageBus } from './web_workers/shared/message_bus';
import { PostMessageBus, PostMessageBusSink, PostMessageBusSource } from './web_workers/shared/post_message_bus';
import { RenderStore } from './web_workers/shared/render_store';
import { Serializer } from './web_workers/shared/serializer';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from './web_workers/shared/service_message_broker';
import { MessageBasedRenderer } from './web_workers/ui/renderer';
/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@experimental WebWorker support is currently experimental.
 */
export class WebWorkerInstance {
    /**
     * \@internal
     * @param {?} worker
     * @param {?} bus
     * @return {?}
     */
    init(worker, bus) {
        this.worker = worker;
        this.bus = bus;
    }
}
WebWorkerInstance.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerInstance.ctorParameters = () => [];
function WebWorkerInstance_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerInstance.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WebWorkerInstance.ctorParameters;
    /** @type {?} */
    WebWorkerInstance.prototype.worker;
    /** @type {?} */
    WebWorkerInstance.prototype.bus;
}
/**
 * @experimental WebWorker support is currently experimental.
 */
export const /** @type {?} */ WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental WebWorker support is currently experimental.
 */
export const /** @type {?} */ WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
export const /** @type {?} */ _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: NgZone, useFactory: createNgZone, deps: [] },
    MessageBasedRenderer,
    { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer, multi: true },
    BROWSER_SANITIZATION_PROVIDERS,
    { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
    { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    APP_ID_RANDOM_PROVIDER,
    { provide: DomRootRenderer, useClass: DomRootRenderer_ },
    { provide: RootRenderer, useExisting: DomRootRenderer },
    DomRendererFactoryV2,
    { provide: RendererFactoryV2, useExisting: DomRendererFactoryV2 },
    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
    { provide: AnimationDriver, useFactory: _resolveDefaultAnimationDriver, deps: [] },
    Serializer,
    { provide: ON_WEB_WORKER, useValue: false },
    RenderStore,
    DomSharedStylesHost,
    Testability,
    EventManager,
    WebWorkerInstance,
    {
        provide: PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [Injector]
    },
    { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
];
/**
 * @param {?} injector
 * @return {?}
 */
function initializeGenericWorkerRenderer(injector) {
    const /** @type {?} */ bus = injector.get(MessageBus);
    const /** @type {?} */ zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    const /** @type {?} */ services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(() => { services.forEach((svc) => { svc.start(); }); });
}
/**
 * @param {?} instance
 * @return {?}
 */
function messageBusFactory(instance) {
    return instance.bus;
}
/**
 * @param {?} injector
 * @return {?}
 */
function initWebWorkerRenderPlatform(injector) {
    return () => {
        BrowserDomAdapter.makeCurrent();
        BrowserGetTestability.init();
        let /** @type {?} */ scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (e) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        const /** @type {?} */ instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @experimental WebWorker support is currently experimental.
 */
export const /** @type {?} */ platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
function _exceptionHandler() {
    return new ErrorHandler();
}
/**
 * @return {?}
 */
function _document() {
    return document;
}
/**
 * @return {?}
 */
function createNgZone() {
    return new NgZone({ enableLongStackTrace: isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 * @param {?} uri
 * @param {?} instance
 * @return {?}
 */
function spawnWebWorker(uri, instance) {
    const /** @type {?} */ webWorker = new Worker(uri);
    const /** @type {?} */ sink = new PostMessageBusSink(webWorker);
    const /** @type {?} */ source = new PostMessageBusSource(webWorker);
    const /** @type {?} */ bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
/**
 * @return {?}
 */
function _resolveDefaultAnimationDriver() {
    return getDOM().supportsWebAnimation() ? new WebAnimationsDriver() : AnimationDriver.NOOP;
}
//# sourceMappingURL=worker_render.js.map