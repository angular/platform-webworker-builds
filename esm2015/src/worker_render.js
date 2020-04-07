/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/worker_render.ts
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFrQixXQUFXLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNVIsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSwrQkFBK0IsSUFBSSw4QkFBOEIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUscUJBQXFCLElBQUksb0JBQW9CLEVBQUUsZ0JBQWdCLElBQUksZUFBZSxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFamhCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFB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LFNBQVMsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDOzs7Ozs7O0FBS0QsU0FBUyxjQUFjLENBQUMsR0FBVyxFQUFFLFFBQTJCOztVQUN4RCxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDOzs7OztVQUluQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxtQkFBQSxTQUFTLEVBQU8sQ0FBQzs7VUFDL0MsTUFBTSxHQUFHLElBQUksb0JBQW9CLENBQUMsU0FBUyxDQUFDOztVQUM1QyxHQUFHLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztJQUU1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtVBMQVRGT1JNX1dPUktFUl9VSV9JRCBhcyBQTEFURk9STV9XT1JLRVJfVUlfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Vycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIGlzRGV2TW9kZSwgcGxhdGZvcm1Db3JlLCDJtUFQUF9JRF9SQU5ET01fUFJPVklERVIgYXMgQVBQX0lEX1JBTkRPTV9QUk9WSURFUiwgybVzZXREb2N1bWVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyLCBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIEhhbW1lckdlc3R1cmVDb25maWcsIMm1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUywgybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlciwgybVCcm93c2VyR2V0VGVzdGFiaWxpdHkgYXMgQnJvd3NlckdldFRlc3RhYmlsaXR5LCDJtURvbUV2ZW50c1BsdWdpbiBhcyBEb21FdmVudHNQbHVnaW4sIMm1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyLCDJtURvbVNoYXJlZFN0eWxlc0hvc3QgYXMgRG9tU2hhcmVkU3R5bGVzSG9zdCwgybVIYW1tZXJHZXN0dXJlc1BsdWdpbiBhcyBIYW1tZXJHZXN0dXJlc1BsdWdpbiwgybVLZXlFdmVudHNQbHVnaW4gYXMgS2V5RXZlbnRzUGx1Z2luLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFJlbmRlcmVyMn0gZnJvbSAnLi93ZWJfd29ya2Vycy91aS9yZW5kZXJlcic7XG5cblxuXG4vKipcbiAqIFdyYXBwZXIgY2xhc3MgdGhhdCBleHBvc2VzIHRoZSBXb3JrZXJcbiAqIGFuZCB1bmRlcmx5aW5nIHtAbGluayBNZXNzYWdlQnVzfSBmb3IgbG93ZXIgbGV2ZWwgbWVzc2FnZSBwYXNzaW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJJbnN0YW5jZSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgd29ya2VyICE6IFdvcmtlcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBidXMgITogTWVzc2FnZUJ1cztcblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBpbml0KHdvcmtlcjogV29ya2VyLCBidXM6IE1lc3NhZ2VCdXMpIHtcbiAgICB0aGlzLndvcmtlciA9IHdvcmtlcjtcbiAgICB0aGlzLmJ1cyA9IGJ1cztcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1dlYldvcmtlclNjcmlwdCcpO1xuXG4vKipcbiAqIEEgbXVsdGktcHJvdmlkZXIgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGNhbGwgdGhlIGBzdGFydCgpYCBtZXRob2QgYWZ0ZXIgdGhlIHNlcnZpY2UgaXNcbiAqIGNyZWF0ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9VSV9TVEFSVEFCTEVfTUVTU0FHSU5HX1NFUlZJQ0UgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoe3N0YXJ0OiAoKSA9PiB2b2lkfSlbXT4oJ1dvcmtlclJlbmRlclN0YXJ0YWJsZU1zZ1NlcnZpY2UnKTtcblxuZXhwb3J0IGNvbnN0IF9XT1JLRVJfVUlfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogTmdab25lLCB1c2VGYWN0b3J5OiBjcmVhdGVOZ1pvbmUsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IE1lc3NhZ2VCYXNlZFJlbmRlcmVyMixcbiAgICBkZXBzOiBbU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBNZXNzYWdlQnVzLCBTZXJpYWxpemVyLCBSZW5kZXJTdG9yZSwgUmVuZGVyZXJGYWN0b3J5Ml1cbiAgfSxcbiAge3Byb3ZpZGU6IFdPUktFUl9VSV9TVEFSVEFCTEVfTUVTU0FHSU5HX1NFUlZJQ0UsIHVzZUV4aXN0aW5nOiBNZXNzYWdlQmFzZWRSZW5kZXJlcjIsIG11bHRpOiB0cnVlfSxcbiAgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLFxuICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBfZXhjZXB0aW9uSGFuZGxlciwgZGVwczogW119LFxuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119LFxuICAvLyBUT0RPKGp0ZXBsaXR6NjAyKTogSW52ZXN0aWdhdGUgaWYgd2UgZGVmaW5pdGVseSBuZWVkIEVWRU5UX01BTkFHRVIgb24gdGhlIHJlbmRlciB0aHJlYWRcbiAgLy8gIzUyOThcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgTmdab25lXSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBkZXBzOiBbRE9DVU1FTlRdLCBtdWx0aTogdHJ1ZX0sXG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVzUGx1Z2luLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgSEFNTUVSX0dFU1RVUkVfQ09ORklHXSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9LFxuICB7cHJvdmlkZTogSEFNTUVSX0dFU1RVUkVfQ09ORklHLCB1c2VDbGFzczogSGFtbWVyR2VzdHVyZUNvbmZpZywgZGVwczogW119LFxuICBBUFBfSURfUkFORE9NX1BST1ZJREVSLFxuICB7cHJvdmlkZTogRG9tUmVuZGVyZXJGYWN0b3J5MiwgZGVwczogW0V2ZW50TWFuYWdlciwgRG9tU2hhcmVkU3R5bGVzSG9zdF19LFxuICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IERvbVJlbmRlcmVyRmFjdG9yeTJ9LFxuICB7cHJvdmlkZTogU2hhcmVkU3R5bGVzSG9zdCwgdXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9LFxuICB7XG4gICAgcHJvdmlkZTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgZGVwczogW01lc3NhZ2VCdXMsIFNlcmlhbGl6ZXJdXG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICB1c2VDbGFzczogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgZGVwczogW01lc3NhZ2VCdXMsIFNlcmlhbGl6ZXJdXG4gIH0sXG4gIHtwcm92aWRlOiBTZXJpYWxpemVyLCBkZXBzOiBbUmVuZGVyU3RvcmVdfSxcbiAge3Byb3ZpZGU6IE9OX1dFQl9XT1JLRVIsIHVzZVZhbHVlOiBmYWxzZX0sXG4gIHtwcm92aWRlOiBSZW5kZXJTdG9yZSwgZGVwczogW119LFxuICB7cHJvdmlkZTogRG9tU2hhcmVkU3R5bGVzSG9zdCwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIHtwcm92aWRlOiBUZXN0YWJpbGl0eSwgZGVwczogW05nWm9uZV19LFxuICB7cHJvdmlkZTogRXZlbnRNYW5hZ2VyLCBkZXBzOiBbRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IFdlYldvcmtlckluc3RhbmNlLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0luamVjdG9yXVxuICB9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9XT1JLRVJfVUlfSUR9LFxuICB7cHJvdmlkZTogTWVzc2FnZUJ1cywgdXNlRmFjdG9yeTogbWVzc2FnZUJ1c0ZhY3RvcnksIGRlcHM6IFtXZWJXb3JrZXJJbnN0YW5jZV19LFxuXTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgYnVzID0gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCdXMpO1xuICBjb25zdCB6b25lID0gaW5qZWN0b3IuZ2V0PE5nWm9uZT4oTmdab25lKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcblxuICAvLyBpbml0aWFsaXplIG1lc3NhZ2Ugc2VydmljZXMgYWZ0ZXIgdGhlIGJ1cyBoYXMgYmVlbiBjcmVhdGVkXG4gIGNvbnN0IHNlcnZpY2VzID0gaW5qZWN0b3IuZ2V0KFdPUktFUl9VSV9TVEFSVEFCTEVfTUVTU0FHSU5HX1NFUlZJQ0UpO1xuICB6b25lLnJ1bkd1YXJkZWQoKCkgPT4geyBzZXJ2aWNlcy5mb3JFYWNoKChzdmM6IGFueSkgPT4geyBzdmMuc3RhcnQoKTsgfSk7IH0pO1xufVxuXG5mdW5jdGlvbiBtZXNzYWdlQnVzRmFjdG9yeShpbnN0YW5jZTogV2ViV29ya2VySW5zdGFuY2UpOiBNZXNzYWdlQnVzIHtcbiAgcmV0dXJuIGluc3RhbmNlLmJ1cztcbn1cblxuZnVuY3Rpb24gaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gICAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbiAgICBsZXQgc2NyaXB0VXJpOiBzdHJpbmc7XG4gICAgdHJ5IHtcbiAgICAgIHNjcmlwdFVyaSA9IGluamVjdG9yLmdldChXT1JLRVJfU0NSSVBUKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnWW91IG11c3QgcHJvdmlkZSB5b3VyIFdlYldvcmtlclxcJ3MgaW5pdGlhbGl6YXRpb24gc2NyaXB0IHdpdGggdGhlIFdPUktFUl9TQ1JJUFQgdG9rZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGluamVjdG9yLmdldChXZWJXb3JrZXJJbnN0YW5jZSk7XG4gICAgc3Bhd25XZWJXb3JrZXIoc2NyaXB0VXJpLCBpbnN0YW5jZSk7XG5cbiAgICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJVaSA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3dvcmtlclVpJywgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlMpO1xuXG5mdW5jdGlvbiBfZXhjZXB0aW9uSGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5mdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBpc0Rldk1vZGUoKX0pO1xufVxuXG4vKipcbiAqIFNwYXducyBhIG5ldyBjbGFzcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIFdlYldvcmtlckluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNwYXduV2ViV29ya2VyKHVyaTogc3RyaW5nLCBpbnN0YW5jZTogV2ViV29ya2VySW5zdGFuY2UpOiB2b2lkIHtcbiAgY29uc3Qgd2ViV29ya2VyOiBXb3JrZXIgPSBuZXcgV29ya2VyKHVyaSk7XG4gIC8vIHdlYldvcmtlciBpcyBjYXN0ZWQgdG8gYW55IGJlY2F1c2UgdGhlIGxpYi5kLnRzIHNpZ25hdHVyZSBjaGFuZ2VkIGluIFRTMy41IHRvIHJlcXVpcmUgdGhlXG4gIC8vIHRyYW5zZmVyIGFyZ3VtZW50IGluIHBvc3RNZXNzYWdlIG1ldGhvZC5cbiAgLy8gdGhpcyBzZWVtcyB3cm9uZyBidXQgc2luY2UgYWxsIG9mIHRoaXMgY29kZSBpcyBkZXByZWNhdGVkIGl0IHNob3VsZG4ndCBtYXR0ZXIgdGhhdCBtdWNoLlxuICBjb25zdCBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayh3ZWJXb3JrZXIgYXMgYW55KTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKHdlYldvcmtlcik7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuXG4gIGluc3RhbmNlLmluaXQod2ViV29ya2VyLCBidXMpO1xufVxuIl19