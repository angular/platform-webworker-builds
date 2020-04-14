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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUYsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQWtCLFdBQVcsRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNVIsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSwrQkFBK0IsSUFBSSw4QkFBOEIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUscUJBQXFCLElBQUksb0JBQW9CLEVBQUUsZ0JBQWdCLElBQUksZUFBZSxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFamhCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFB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RSxTQUFTLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7OztBQUtELFNBQVMsY0FBYyxDQUFDLEdBQVcsRUFBRSxRQUEyQjs7VUFDeEQsU0FBUyxHQUFXLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQzs7Ozs7VUFJbkMsSUFBSSxHQUFHLElBQUksa0JBQWtCLENBQUMsbUJBQUEsU0FBUyxFQUFPLENBQUM7O1VBQy9DLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQzs7VUFDNUMsR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7SUFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVQTEFURk9STV9XT1JLRVJfVUlfSUQgYXMgUExBVEZPUk1fV09SS0VSX1VJX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBpc0Rldk1vZGUsIE5nWm9uZSwgUExBVEZPUk1fSUQsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBwbGF0Zm9ybUNvcmUsIFJlbmRlcmVyRmFjdG9yeTIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgybVBUFBfSURfUkFORE9NX1BST1ZJREVSIGFzIEFQUF9JRF9SQU5ET01fUFJPVklERVIsIMm1c2V0RG9jdW1lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlciwgSEFNTUVSX0dFU1RVUkVfQ09ORklHLCBIYW1tZXJHZXN0dXJlQ29uZmlnLCDJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXIsIMm1QnJvd3NlckdldFRlc3RhYmlsaXR5IGFzIEJyb3dzZXJHZXRUZXN0YWJpbGl0eSwgybVEb21FdmVudHNQbHVnaW4gYXMgRG9tRXZlbnRzUGx1Z2luLCDJtURvbVJlbmRlcmVyRmFjdG9yeTIgYXMgRG9tUmVuZGVyZXJGYWN0b3J5MiwgybVEb21TaGFyZWRTdHlsZXNIb3N0IGFzIERvbVNoYXJlZFN0eWxlc0hvc3QsIMm1SGFtbWVyR2VzdHVyZXNQbHVnaW4gYXMgSGFtbWVyR2VzdHVyZXNQbHVnaW4sIMm1S2V5RXZlbnRzUGx1Z2luIGFzIEtleUV2ZW50c1BsdWdpbiwgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcjJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuXG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgZXhwb3NlcyB0aGUgV29ya2VyXG4gKiBhbmQgdW5kZXJseWluZyB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGxvd2VyIGxldmVsIG1lc3NhZ2UgcGFzc2luZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VySW5zdGFuY2Uge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHVibGljIHdvcmtlciE6IFdvcmtlcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBidXMhOiBNZXNzYWdlQnVzO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGluaXQod29ya2VyOiBXb3JrZXIsIGJ1czogTWVzc2FnZUJ1cykge1xuICAgIHRoaXMud29ya2VyID0gd29ya2VyO1xuICAgIHRoaXMuYnVzID0gYnVzO1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9TQ1JJUFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignV2ViV29ya2VyU2NyaXB0Jyk7XG5cbi8qKlxuICogQSBtdWx0aS1wcm92aWRlciB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYHN0YXJ0KClgIG1ldGhvZCBhZnRlciB0aGUgc2VydmljZSBpc1xuICogY3JlYXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCh7c3RhcnQ6ICgpID0+IHZvaWR9KVtdPignV29ya2VyUmVuZGVyU3RhcnRhYmxlTXNnU2VydmljZScpO1xuXG5leHBvcnQgY29uc3QgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBOZ1pvbmUsIHVzZUZhY3Rvcnk6IGNyZWF0ZU5nWm9uZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLFxuICAgIGRlcHM6IFtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXIsIFJlbmRlclN0b3JlLCBSZW5kZXJlckZhY3RvcnkyXVxuICB9LFxuICB7cHJvdmlkZTogV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSwgdXNlRXhpc3Rpbmc6IE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiwgbXVsdGk6IHRydWV9LFxuICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG4gIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBJbnZlc3RpZ2F0ZSBpZiB3ZSBkZWZpbml0ZWx5IG5lZWQgRVZFTlRfTUFOQUdFUiBvbiB0aGUgcmVuZGVyIHRocmVhZFxuICAvLyAjNTI5OFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmVdLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIGRlcHM6IFtET0NVTUVOVF0sIG11bHRpOiB0cnVlfSxcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBIQU1NRVJfR0VTVFVSRV9DT05GSUddLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBkZXBzOiBbXX0sXG4gIEFQUF9JRF9SQU5ET01fUFJPVklERVIsXG4gIHtwcm92aWRlOiBEb21SZW5kZXJlckZhY3RvcnkyLCBkZXBzOiBbRXZlbnRNYW5hZ2VyLCBEb21TaGFyZWRTdHlsZXNIb3N0XX0sXG4gIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogRG9tUmVuZGVyZXJGYWN0b3J5Mn0sXG4gIHtwcm92aWRlOiBTaGFyZWRTdHlsZXNIb3N0LCB1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0sXG4gIHtcbiAgICBwcm92aWRlOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFNlcmlhbGl6ZXIsIGRlcHM6IFtSZW5kZXJTdG9yZV19LFxuICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IGZhbHNlfSxcbiAge3Byb3ZpZGU6IFJlbmRlclN0b3JlLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCBkZXBzOiBbTmdab25lXX0sXG4gIHtwcm92aWRlOiBFdmVudE1hbmFnZXIsIGRlcHM6IFtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIE5nWm9uZV19LFxuICB7cHJvdmlkZTogV2ViV29ya2VySW5zdGFuY2UsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbSW5qZWN0b3JdXG4gIH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9VSV9JRH0sXG4gIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBtZXNzYWdlQnVzRmFjdG9yeSwgZGVwczogW1dlYldvcmtlckluc3RhbmNlXX0sXG5dO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCBidXMgPSBpbmplY3Rvci5nZXQoTWVzc2FnZUJ1cyk7XG4gIGNvbnN0IHpvbmUgPSBpbmplY3Rvci5nZXQ8Tmdab25lPihOZ1pvbmUpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuXG4gIC8vIGluaXRpYWxpemUgbWVzc2FnZSBzZXJ2aWNlcyBhZnRlciB0aGUgYnVzIGhhcyBiZWVuIGNyZWF0ZWRcbiAgY29uc3Qgc2VydmljZXMgPSBpbmplY3Rvci5nZXQoV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSk7XG4gIHpvbmUucnVuR3VhcmRlZCgoKSA9PiB7XG4gICAgc2VydmljZXMuZm9yRWFjaCgoc3ZjOiBhbnkpID0+IHtcbiAgICAgIHN2Yy5zdGFydCgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUJ1c0ZhY3RvcnkoaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogTWVzc2FnZUJ1cyB7XG4gIHJldHVybiBpbnN0YW5jZS5idXM7XG59XG5cbmZ1bmN0aW9uIGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybShpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICAgIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG4gICAgbGV0IHNjcmlwdFVyaTogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBzY3JpcHRVcmkgPSBpbmplY3Rvci5nZXQoV09SS0VSX1NDUklQVCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1lvdSBtdXN0IHByb3ZpZGUgeW91ciBXZWJXb3JrZXJcXCdzIGluaXRpYWxpemF0aW9uIHNjcmlwdCB3aXRoIHRoZSBXT1JLRVJfU0NSSVBUIHRva2VuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbmplY3Rvci5nZXQoV2ViV29ya2VySW5zdGFuY2UpO1xuICAgIHNwYXduV2ViV29ya2VyKHNjcmlwdFVyaSwgaW5zdGFuY2UpO1xuXG4gICAgaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3Rvcik7XG4gIH07XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyVWkgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICd3b3JrZXJVaScsIF9XT1JLRVJfVUlfUExBVEZPUk1fUFJPVklERVJTKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogaXNEZXZNb2RlKCl9KTtcbn1cblxuLyoqXG4gKiBTcGF3bnMgYSBuZXcgY2xhc3MgYW5kIGluaXRpYWxpemVzIHRoZSBXZWJXb3JrZXJJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzcGF3bldlYldvcmtlcih1cmk6IHN0cmluZywgaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogdm9pZCB7XG4gIGNvbnN0IHdlYldvcmtlcjogV29ya2VyID0gbmV3IFdvcmtlcih1cmkpO1xuICAvLyB3ZWJXb3JrZXIgaXMgY2FzdGVkIHRvIGFueSBiZWNhdXNlIHRoZSBsaWIuZC50cyBzaWduYXR1cmUgY2hhbmdlZCBpbiBUUzMuNSB0byByZXF1aXJlIHRoZVxuICAvLyB0cmFuc2ZlciBhcmd1bWVudCBpbiBwb3N0TWVzc2FnZSBtZXRob2QuXG4gIC8vIHRoaXMgc2VlbXMgd3JvbmcgYnV0IHNpbmNlIGFsbCBvZiB0aGlzIGNvZGUgaXMgZGVwcmVjYXRlZCBpdCBzaG91bGRuJ3QgbWF0dGVyIHRoYXQgbXVjaC5cbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1Npbmsod2ViV29ya2VyIGFzIGFueSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSh3ZWJXb3JrZXIpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcblxuICBpbnN0YW5jZS5pbml0KHdlYldvcmtlciwgYnVzKTtcbn1cbiJdfQ==