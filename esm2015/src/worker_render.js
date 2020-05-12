/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/worker_render.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, ɵPLATFORM_WORKER_UI_ID as PLATFORM_WORKER_UI_ID } from '@angular/common';
import { createPlatformFactory, ErrorHandler, Injectable, InjectionToken, Injector, isDevMode, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, Testability, ɵAPP_ID_RANDOM_PROVIDER as APP_ID_RANDOM_PROVIDER, ɵsetDocument } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵBROWSER_SANITIZATION_PROVIDERS as BROWSER_SANITIZATION_PROVIDERS, ɵBrowserDomAdapter as BrowserDomAdapter, ɵBrowserGetTestability as BrowserGetTestability, ɵDomEventsPlugin as DomEventsPlugin, ɵDomRendererFactory2 as DomRendererFactory2, ɵDomSharedStylesHost as DomSharedStylesHost, ɵHammerGesturesPlugin as HammerGesturesPlugin, ɵKeyEventsPlugin as KeyEventsPlugin, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { ON_WEB_WORKER } from './web_workers/shared/api';
import { ClientMessageBrokerFactory } from './web_workers/shared/client_message_broker';
import { MessageBus } from './web_workers/shared/message_bus';
import { PostMessageBus, PostMessageBusSink, PostMessageBusSource } from './web_workers/shared/post_message_bus';
import { RenderStore } from './web_workers/shared/render_store';
import { Serializer } from './web_workers/shared/serializer';
import { ServiceMessageBrokerFactory } from './web_workers/shared/service_message_broker';
import { MessageBasedRenderer2 } from './web_workers/ui/renderer';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
/** @nocollapse */ WebWorkerInstance.ɵfac = function WebWorkerInstance_Factory(t) { return new (t || WebWorkerInstance)(); };
/** @nocollapse */ WebWorkerInstance.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerInstance, factory: WebWorkerInstance.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerInstance, [{
        type: Injectable
    }], null, null); })();
if (false) {
    /** @type {?} */
    WebWorkerInstance.prototype.worker;
    /** @type {?} */
    WebWorkerInstance.prototype.bus;
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 * @type {?}
 */
export const WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 * @type {?}
 */
export const WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
/** @type {?} */
export const _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: NgZone, useFactory: createNgZone, deps: [] },
    {
        provide: MessageBasedRenderer2,
        deps: [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, RendererFactory2]
    },
    { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
    BROWSER_SANITIZATION_PROVIDERS,
    { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        deps: [DOCUMENT, NgZone],
        multi: true
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, deps: [DOCUMENT], multi: true },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG],
        multi: true
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] },
    APP_ID_RANDOM_PROVIDER,
    { provide: DomRendererFactory2, deps: [EventManager, DomSharedStylesHost] },
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
    {
        provide: ServiceMessageBrokerFactory,
        useClass: ServiceMessageBrokerFactory,
        deps: [MessageBus, Serializer]
    },
    {
        provide: ClientMessageBrokerFactory,
        useClass: ClientMessageBrokerFactory,
        deps: [MessageBus, Serializer]
    },
    { provide: Serializer, deps: [RenderStore] },
    { provide: ON_WEB_WORKER, useValue: false },
    { provide: RenderStore, deps: [] },
    { provide: DomSharedStylesHost, deps: [DOCUMENT] },
    { provide: Testability, deps: [NgZone] },
    { provide: EventManager, deps: [EVENT_MANAGER_PLUGINS, NgZone] },
    { provide: WebWorkerInstance, deps: [] },
    {
        provide: PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [Injector]
    },
    { provide: PLATFORM_ID, useValue: PLATFORM_WORKER_UI_ID },
    { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
];
/**
 * @param {?} injector
 * @return {?}
 */
function initializeGenericWorkerRenderer(injector) {
    /** @type {?} */
    const bus = injector.get(MessageBus);
    /** @type {?} */
    const zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    /** @type {?} */
    const services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded((/**
     * @return {?}
     */
    () => {
        services.forEach((/**
         * @param {?} svc
         * @return {?}
         */
        (svc) => {
            svc.start();
        }));
    }));
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
    return (/**
     * @return {?}
     */
    () => {
        BrowserDomAdapter.makeCurrent();
        BrowserGetTestability.init();
        /** @type {?} */
        let scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (_a) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        /** @type {?} */
        const instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    });
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 * @type {?}
 */
export const platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
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
    // Tell ivy about the global document
    ɵsetDocument(document);
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
    /** @type {?} */
    const webWorker = new Worker(uri);
    // webWorker is casted to any because the lib.d.ts signature changed in TS3.5 to require the
    // transfer argument in postMessage method.
    // this seems wrong but since all of this code is deprecated it shouldn't matter that much.
    /** @type {?} */
    const sink = new PostMessageBusSink((/** @type {?} */ (webWorker)));
    /** @type {?} */
    const source = new PostMessageBusSource(webWorker);
    /** @type {?} */
    const bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRixPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBa0IsV0FBVyxFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1UixPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLCtCQUErQixJQUFJLDhCQUE4QixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVqaEIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFDLE1BQU0s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O0FBQ2xCLENBQUM7Ozs7QUFFRCxTQUFTLFlBQVk7SUFDbkIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDOzs7Ozs7O0FBS0QsU0FBUyxjQUFjLENBQUMsR0FBVyxFQUFFLFFBQTJCOztVQUN4RCxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDOzs7OztVQUluQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxtQkFBQSxTQUFTLEVBQU8sQ0FBQzs7VUFDL0MsTUFBTSxHQUFHLElBQUksb0JBQW9CLENBQUMsU0FBUyxDQUFDOztVQUM1QyxHQUFHLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztJQUU1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtVBMQVRGT1JNX1dPUktFUl9VSV9JRCBhcyBQTEFURk9STV9XT1JLRVJfVUlfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIGlzRGV2TW9kZSwgTmdab25lLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIHBsYXRmb3JtQ29yZSwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCDJtUFQUF9JRF9SQU5ET01fUFJPVklERVIgYXMgQVBQX0lEX1JBTkRPTV9QUk9WSURFUiwgybVzZXREb2N1bWVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyLCBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIEhhbW1lckdlc3R1cmVDb25maWcsIMm1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUywgybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlciwgybVCcm93c2VyR2V0VGVzdGFiaWxpdHkgYXMgQnJvd3NlckdldFRlc3RhYmlsaXR5LCDJtURvbUV2ZW50c1BsdWdpbiBhcyBEb21FdmVudHNQbHVnaW4sIMm1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyLCDJtURvbVNoYXJlZFN0eWxlc0hvc3QgYXMgRG9tU2hhcmVkU3R5bGVzSG9zdCwgybVIYW1tZXJHZXN0dXJlc1BsdWdpbiBhcyBIYW1tZXJHZXN0dXJlc1BsdWdpbiwgybVLZXlFdmVudHNQbHVnaW4gYXMgS2V5RXZlbnRzUGx1Z2luLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFJlbmRlcmVyMn0gZnJvbSAnLi93ZWJfd29ya2Vycy91aS9yZW5kZXJlcic7XG5cblxuXG4vKipcbiAqIFdyYXBwZXIgY2xhc3MgdGhhdCBleHBvc2VzIHRoZSBXb3JrZXJcbiAqIGFuZCB1bmRlcmx5aW5nIHtAbGluayBNZXNzYWdlQnVzfSBmb3IgbG93ZXIgbGV2ZWwgbWVzc2FnZSBwYXNzaW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VySW5zdGFuY2Uge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHVibGljIHdvcmtlciE6IFdvcmtlcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBidXMhOiBNZXNzYWdlQnVzO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGluaXQod29ya2VyOiBXb3JrZXIsIGJ1czogTWVzc2FnZUJ1cykge1xuICAgIHRoaXMud29ya2VyID0gd29ya2VyO1xuICAgIHRoaXMuYnVzID0gYnVzO1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1dlYldvcmtlclNjcmlwdCcpO1xuXG4vKipcbiAqIEEgbXVsdGktcHJvdmlkZXIgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGNhbGwgdGhlIGBzdGFydCgpYCBtZXRob2QgYWZ0ZXIgdGhlIHNlcnZpY2UgaXNcbiAqIGNyZWF0ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KHtzdGFydDogKCkgPT4gdm9pZH0pW10+KCdXb3JrZXJSZW5kZXJTdGFydGFibGVNc2dTZXJ2aWNlJyk7XG5cbmV4cG9ydCBjb25zdCBfV09SS0VSX1VJX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlRmFjdG9yeTogY3JlYXRlTmdab25lLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBNZXNzYWdlQmFzZWRSZW5kZXJlcjIsXG4gICAgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgTWVzc2FnZUJ1cywgU2VyaWFsaXplciwgUmVuZGVyU3RvcmUsIFJlbmRlcmVyRmFjdG9yeTJdXG4gIH0sXG4gIHtwcm92aWRlOiBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFLCB1c2VFeGlzdGluZzogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLCBtdWx0aTogdHJ1ZX0sXG4gIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbiAgLy8gVE9ETyhqdGVwbGl0ejYwMik6IEludmVzdGlnYXRlIGlmIHdlIGRlZmluaXRlbHkgbmVlZCBFVkVOVF9NQU5BR0VSIG9uIHRoZSByZW5kZXIgdGhyZWFkXG4gIC8vICM1Mjk4XG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZV0sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgZGVwczogW0RPQ1VNRU5UXSwgbXVsdGk6IHRydWV9LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIEhBTU1FUl9HRVNUVVJFX0NPTkZJR10sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWcsIGRlcHM6IFtdfSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAge3Byb3ZpZGU6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3RdfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge1xuICAgIHByb3ZpZGU6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICB1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7cHJvdmlkZTogU2VyaWFsaXplciwgZGVwczogW1JlbmRlclN0b3JlXX0sXG4gIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogZmFsc2V9LFxuICB7cHJvdmlkZTogUmVuZGVyU3RvcmUsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIHtwcm92aWRlOiBXZWJXb3JrZXJJbnN0YW5jZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX1VJX0lEfSxcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IG1lc3NhZ2VCdXNGYWN0b3J5LCBkZXBzOiBbV2ViV29ya2VySW5zdGFuY2VdfSxcbl07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IGJ1cyA9IGluamVjdG9yLmdldChNZXNzYWdlQnVzKTtcbiAgY29uc3Qgem9uZSA9IGluamVjdG9yLmdldDxOZ1pvbmU+KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBtZXNzYWdlIHNlcnZpY2VzIGFmdGVyIHRoZSBidXMgaGFzIGJlZW4gY3JlYXRlZFxuICBjb25zdCBzZXJ2aWNlcyA9IGluamVjdG9yLmdldChXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFKTtcbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICBzZXJ2aWNlcy5mb3JFYWNoKChzdmM6IGFueSkgPT4ge1xuICAgICAgc3ZjLnN0YXJ0KCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtZXNzYWdlQnVzRmFjdG9yeShpbnN0YW5jZTogV2ViV29ya2VySW5zdGFuY2UpOiBNZXNzYWdlQnVzIHtcbiAgcmV0dXJuIGluc3RhbmNlLmJ1cztcbn1cblxuZnVuY3Rpb24gaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gICAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbiAgICBsZXQgc2NyaXB0VXJpOiBzdHJpbmc7XG4gICAgdHJ5IHtcbiAgICAgIHNjcmlwdFVyaSA9IGluamVjdG9yLmdldChXT1JLRVJfU0NSSVBUKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3QgcHJvdmlkZSB5b3VyIFdlYldvcmtlclxcJ3MgaW5pdGlhbGl6YXRpb24gc2NyaXB0IHdpdGggdGhlIFdPUktFUl9TQ1JJUFQgdG9rZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGluamVjdG9yLmdldChXZWJXb3JrZXJJbnN0YW5jZSk7XG4gICAgc3Bhd25XZWJXb3JrZXIoc2NyaXB0VXJpLCBpbnN0YW5jZSk7XG5cbiAgICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyVWkgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICd3b3JrZXJVaScsIF9XT1JLRVJfVUlfUExBVEZPUk1fUFJPVklERVJTKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogaXNEZXZNb2RlKCl9KTtcbn1cblxuLyoqXG4gKiBTcGF3bnMgYSBuZXcgY2xhc3MgYW5kIGluaXRpYWxpemVzIHRoZSBXZWJXb3JrZXJJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzcGF3bldlYldvcmtlcih1cmk6IHN0cmluZywgaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogdm9pZCB7XG4gIGNvbnN0IHdlYldvcmtlcjogV29ya2VyID0gbmV3IFdvcmtlcih1cmkpO1xuICAvLyB3ZWJXb3JrZXIgaXMgY2FzdGVkIHRvIGFueSBiZWNhdXNlIHRoZSBsaWIuZC50cyBzaWduYXR1cmUgY2hhbmdlZCBpbiBUUzMuNSB0byByZXF1aXJlIHRoZVxuICAvLyB0cmFuc2ZlciBhcmd1bWVudCBpbiBwb3N0TWVzc2FnZSBtZXRob2QuXG4gIC8vIHRoaXMgc2VlbXMgd3JvbmcgYnV0IHNpbmNlIGFsbCBvZiB0aGlzIGNvZGUgaXMgZGVwcmVjYXRlZCBpdCBzaG91bGRuJ3QgbWF0dGVyIHRoYXQgbXVjaC5cbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1Npbmsod2ViV29ya2VyIGFzIGFueSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSh3ZWJXb3JrZXIpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcblxuICBpbnN0YW5jZS5pbml0KHdlYldvcmtlciwgYnVzKTtcbn1cbiJdfQ==