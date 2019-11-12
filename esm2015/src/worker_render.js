/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵPLATFORM_WORKER_UI_ID as PLATFORM_WORKER_UI_ID } from '@angular/common';
import { ErrorHandler, Injectable, InjectionToken, Injector, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, isDevMode, platformCore, ɵAPP_ID_RANDOM_PROVIDER as APP_ID_RANDOM_PROVIDER, ɵsetDocument } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵBROWSER_SANITIZATION_PROVIDERS as BROWSER_SANITIZATION_PROVIDERS, ɵBrowserDomAdapter as BrowserDomAdapter, ɵBrowserGetTestability as BrowserGetTestability, ɵDomEventsPlugin as DomEventsPlugin, ɵDomRendererFactory2 as DomRendererFactory2, ɵDomSharedStylesHost as DomSharedStylesHost, ɵHammerGesturesPlugin as HammerGesturesPlugin, ɵKeyEventsPlugin as KeyEventsPlugin, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { ON_WEB_WORKER } from './web_workers/shared/api';
import { ClientMessageBrokerFactory } from './web_workers/shared/client_message_broker';
import { MessageBus } from './web_workers/shared/message_bus';
import { PostMessageBus, PostMessageBusSink, PostMessageBusSource } from './web_workers/shared/post_message_bus';
import { RenderStore } from './web_workers/shared/render_store';
import { Serializer } from './web_workers/shared/serializer';
import { ServiceMessageBrokerFactory } from './web_workers/shared/service_message_broker';
import { MessageBasedRenderer2 } from './web_workers/ui/renderer';
/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    WebWorkerInstance.prototype.worker;
    /** @type {?} */
    WebWorkerInstance.prototype.bus;
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 * @type {?}
 */
export const WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
    () => { services.forEach((/**
     * @param {?} svc
     * @return {?}
     */
    (svc) => { svc.start(); })); }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQWtCLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1UixPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLCtCQUErQixJQUFJLDhCQUE4QixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVqaEIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFD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QUFTLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7OztBQUtELFNBQVMsY0FBYyxDQUFDLEdBQVcsRUFBRSxRQUEyQjs7VUFDeEQsU0FBUyxHQUFXLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQzs7Ozs7VUFJbkMsSUFBSSxHQUFHLElBQUksa0JBQWtCLENBQUMsbUJBQUEsU0FBUyxFQUFPLENBQUM7O1VBQy9DLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQzs7VUFDNUMsR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7SUFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVQTEFURk9STV9XT1JLRVJfVUlfSUQgYXMgUExBVEZPUk1fV09SS0VSX1VJX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTmdab25lLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFJlbmRlcmVyRmFjdG9yeTIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBpc0Rldk1vZGUsIHBsYXRmb3JtQ29yZSwgybVBUFBfSURfUkFORE9NX1BST1ZJREVSIGFzIEFQUF9JRF9SQU5ET01fUFJPVklERVIsIMm1c2V0RG9jdW1lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlciwgSEFNTUVSX0dFU1RVUkVfQ09ORklHLCBIYW1tZXJHZXN0dXJlQ29uZmlnLCDJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXIsIMm1QnJvd3NlckdldFRlc3RhYmlsaXR5IGFzIEJyb3dzZXJHZXRUZXN0YWJpbGl0eSwgybVEb21FdmVudHNQbHVnaW4gYXMgRG9tRXZlbnRzUGx1Z2luLCDJtURvbVJlbmRlcmVyRmFjdG9yeTIgYXMgRG9tUmVuZGVyZXJGYWN0b3J5MiwgybVEb21TaGFyZWRTdHlsZXNIb3N0IGFzIERvbVNoYXJlZFN0eWxlc0hvc3QsIMm1SGFtbWVyR2VzdHVyZXNQbHVnaW4gYXMgSGFtbWVyR2VzdHVyZXNQbHVnaW4sIMm1S2V5RXZlbnRzUGx1Z2luIGFzIEtleUV2ZW50c1BsdWdpbiwgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcjJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuXG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgZXhwb3NlcyB0aGUgV29ya2VyXG4gKiBhbmQgdW5kZXJseWluZyB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGxvd2VyIGxldmVsIG1lc3NhZ2UgcGFzc2luZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VySW5zdGFuY2Uge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHVibGljIHdvcmtlciAhOiBXb3JrZXI7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgYnVzICE6IE1lc3NhZ2VCdXM7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgaW5pdCh3b3JrZXI6IFdvcmtlciwgYnVzOiBNZXNzYWdlQnVzKSB7XG4gICAgdGhpcy53b3JrZXIgPSB3b3JrZXI7XG4gICAgdGhpcy5idXMgPSBidXM7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1NDUklQVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdXZWJXb3JrZXJTY3JpcHQnKTtcblxuLyoqXG4gKiBBIG11bHRpLXByb3ZpZGVyIHVzZWQgdG8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBgc3RhcnQoKWAgbWV0aG9kIGFmdGVyIHRoZSBzZXJ2aWNlIGlzXG4gKiBjcmVhdGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KHtzdGFydDogKCkgPT4gdm9pZH0pW10+KCdXb3JrZXJSZW5kZXJTdGFydGFibGVNc2dTZXJ2aWNlJyk7XG5cbmV4cG9ydCBjb25zdCBfV09SS0VSX1VJX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlRmFjdG9yeTogY3JlYXRlTmdab25lLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBNZXNzYWdlQmFzZWRSZW5kZXJlcjIsXG4gICAgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgTWVzc2FnZUJ1cywgU2VyaWFsaXplciwgUmVuZGVyU3RvcmUsIFJlbmRlcmVyRmFjdG9yeTJdXG4gIH0sXG4gIHtwcm92aWRlOiBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFLCB1c2VFeGlzdGluZzogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLCBtdWx0aTogdHJ1ZX0sXG4gIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbiAgLy8gVE9ETyhqdGVwbGl0ejYwMik6IEludmVzdGlnYXRlIGlmIHdlIGRlZmluaXRlbHkgbmVlZCBFVkVOVF9NQU5BR0VSIG9uIHRoZSByZW5kZXIgdGhyZWFkXG4gIC8vICM1Mjk4XG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZV0sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgZGVwczogW0RPQ1VNRU5UXSwgbXVsdGk6IHRydWV9LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIEhBTU1FUl9HRVNUVVJFX0NPTkZJR10sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWcsIGRlcHM6IFtdfSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAge3Byb3ZpZGU6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3RdfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge1xuICAgIHByb3ZpZGU6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICB1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7cHJvdmlkZTogU2VyaWFsaXplciwgZGVwczogW1JlbmRlclN0b3JlXX0sXG4gIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogZmFsc2V9LFxuICB7cHJvdmlkZTogUmVuZGVyU3RvcmUsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIHtwcm92aWRlOiBXZWJXb3JrZXJJbnN0YW5jZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX1VJX0lEfSxcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IG1lc3NhZ2VCdXNGYWN0b3J5LCBkZXBzOiBbV2ViV29ya2VySW5zdGFuY2VdfSxcbl07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IGJ1cyA9IGluamVjdG9yLmdldChNZXNzYWdlQnVzKTtcbiAgY29uc3Qgem9uZSA9IGluamVjdG9yLmdldDxOZ1pvbmU+KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBtZXNzYWdlIHNlcnZpY2VzIGFmdGVyIHRoZSBidXMgaGFzIGJlZW4gY3JlYXRlZFxuICBjb25zdCBzZXJ2aWNlcyA9IGluamVjdG9yLmdldChXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFKTtcbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHsgc2VydmljZXMuZm9yRWFjaCgoc3ZjOiBhbnkpID0+IHsgc3ZjLnN0YXJ0KCk7IH0pOyB9KTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUJ1c0ZhY3RvcnkoaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogTWVzc2FnZUJ1cyB7XG4gIHJldHVybiBpbnN0YW5jZS5idXM7XG59XG5cbmZ1bmN0aW9uIGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybShpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICAgIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG4gICAgbGV0IHNjcmlwdFVyaTogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBzY3JpcHRVcmkgPSBpbmplY3Rvci5nZXQoV09SS0VSX1NDUklQVCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1lvdSBtdXN0IHByb3ZpZGUgeW91ciBXZWJXb3JrZXJcXCdzIGluaXRpYWxpemF0aW9uIHNjcmlwdCB3aXRoIHRoZSBXT1JLRVJfU0NSSVBUIHRva2VuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbmplY3Rvci5nZXQoV2ViV29ya2VySW5zdGFuY2UpO1xuICAgIHNwYXduV2ViV29ya2VyKHNjcmlwdFVyaSwgaW5zdGFuY2UpO1xuXG4gICAgaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3Rvcik7XG4gIH07XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJVaSA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3dvcmtlclVpJywgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlMpO1xuXG5mdW5jdGlvbiBfZXhjZXB0aW9uSGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5mdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBpc0Rldk1vZGUoKX0pO1xufVxuXG4vKipcbiAqIFNwYXducyBhIG5ldyBjbGFzcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIFdlYldvcmtlckluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNwYXduV2ViV29ya2VyKHVyaTogc3RyaW5nLCBpbnN0YW5jZTogV2ViV29ya2VySW5zdGFuY2UpOiB2b2lkIHtcbiAgY29uc3Qgd2ViV29ya2VyOiBXb3JrZXIgPSBuZXcgV29ya2VyKHVyaSk7XG4gIC8vIHdlYldvcmtlciBpcyBjYXN0ZWQgdG8gYW55IGJlY2F1c2UgdGhlIGxpYi5kLnRzIHNpZ25hdHVyZSBjaGFuZ2VkIGluIFRTMy41IHRvIHJlcXVpcmUgdGhlXG4gIC8vIHRyYW5zZmVyIGFyZ3VtZW50IGluIHBvc3RNZXNzYWdlIG1ldGhvZC5cbiAgLy8gdGhpcyBzZWVtcyB3cm9uZyBidXQgc2luY2UgYWxsIG9mIHRoaXMgY29kZSBpcyBkZXByZWNhdGVkIGl0IHNob3VsZG4ndCBtYXR0ZXIgdGhhdCBtdWNoLlxuICBjb25zdCBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayh3ZWJXb3JrZXIgYXMgYW55KTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKHdlYldvcmtlcik7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuXG4gIGluc3RhbmNlLmluaXQod2ViV29ya2VyLCBidXMpO1xufVxuIl19