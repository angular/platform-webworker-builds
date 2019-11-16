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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQWtCLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1UixPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLCtCQUErQixJQUFJLDhCQUE4QixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVqaEIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFD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U0FBUyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7Ozs7Ozs7QUFLRCxTQUFTLGNBQWMsQ0FBQyxHQUFXLEVBQUUsUUFBMkI7O1VBQ3hELFNBQVMsR0FBVyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7O1VBSW5DLElBQUksR0FBRyxJQUFJLGtCQUFrQixDQUFDLG1CQUFBLFNBQVMsRUFBTyxDQUFDOztVQUMvQyxNQUFNLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLENBQUM7O1VBQzVDLEdBQUcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0lBRTVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1UExBVEZPUk1fV09SS0VSX1VJX0lEIGFzIFBMQVRGT1JNX1dPUktFUl9VSV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIE5nWm9uZSwgUExBVEZPUk1fSUQsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBSZW5kZXJlckZhY3RvcnkyLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgaXNEZXZNb2RlLCBwbGF0Zm9ybUNvcmUsIMm1QVBQX0lEX1JBTkRPTV9QUk9WSURFUiBhcyBBUFBfSURfUkFORE9NX1BST1ZJREVSLCDJtXNldERvY3VtZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXIsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgSGFtbWVyR2VzdHVyZUNvbmZpZywgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMgYXMgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLCDJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtUJyb3dzZXJHZXRUZXN0YWJpbGl0eSBhcyBCcm93c2VyR2V0VGVzdGFiaWxpdHksIMm1RG9tRXZlbnRzUGx1Z2luIGFzIERvbUV2ZW50c1BsdWdpbiwgybVEb21SZW5kZXJlckZhY3RvcnkyIGFzIERvbVJlbmRlcmVyRmFjdG9yeTIsIMm1RG9tU2hhcmVkU3R5bGVzSG9zdCBhcyBEb21TaGFyZWRTdHlsZXNIb3N0LCDJtUhhbW1lckdlc3R1cmVzUGx1Z2luIGFzIEhhbW1lckdlc3R1cmVzUGx1Z2luLCDJtUtleUV2ZW50c1BsdWdpbiBhcyBLZXlFdmVudHNQbHVnaW4sIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9hcGknO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtQb3N0TWVzc2FnZUJ1cywgUG9zdE1lc3NhZ2VCdXNTaW5rLCBQb3N0TWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkUmVuZGVyZXIyfSBmcm9tICcuL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyJztcblxuXG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyB0aGF0IGV4cG9zZXMgdGhlIFdvcmtlclxuICogYW5kIHVuZGVybHlpbmcge0BsaW5rIE1lc3NhZ2VCdXN9IGZvciBsb3dlciBsZXZlbCBtZXNzYWdlIHBhc3NpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlckluc3RhbmNlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyB3b3JrZXIgITogV29ya2VyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHVibGljIGJ1cyAhOiBNZXNzYWdlQnVzO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGluaXQod29ya2VyOiBXb3JrZXIsIGJ1czogTWVzc2FnZUJ1cykge1xuICAgIHRoaXMud29ya2VyID0gd29ya2VyO1xuICAgIHRoaXMuYnVzID0gYnVzO1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9TQ1JJUFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignV2ViV29ya2VyU2NyaXB0Jyk7XG5cbi8qKlxuICogQSBtdWx0aS1wcm92aWRlciB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYHN0YXJ0KClgIG1ldGhvZCBhZnRlciB0aGUgc2VydmljZSBpc1xuICogY3JlYXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCh7c3RhcnQ6ICgpID0+IHZvaWR9KVtdPignV29ya2VyUmVuZGVyU3RhcnRhYmxlTXNnU2VydmljZScpO1xuXG5leHBvcnQgY29uc3QgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBOZ1pvbmUsIHVzZUZhY3Rvcnk6IGNyZWF0ZU5nWm9uZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLFxuICAgIGRlcHM6IFtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXIsIFJlbmRlclN0b3JlLCBSZW5kZXJlckZhY3RvcnkyXVxuICB9LFxuICB7cHJvdmlkZTogV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSwgdXNlRXhpc3Rpbmc6IE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiwgbXVsdGk6IHRydWV9LFxuICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG4gIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBJbnZlc3RpZ2F0ZSBpZiB3ZSBkZWZpbml0ZWx5IG5lZWQgRVZFTlRfTUFOQUdFUiBvbiB0aGUgcmVuZGVyIHRocmVhZFxuICAvLyAjNTI5OFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmVdLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIGRlcHM6IFtET0NVTUVOVF0sIG11bHRpOiB0cnVlfSxcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBIQU1NRVJfR0VTVFVSRV9DT05GSUddLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBkZXBzOiBbXX0sXG4gIEFQUF9JRF9SQU5ET01fUFJPVklERVIsXG4gIHtwcm92aWRlOiBEb21SZW5kZXJlckZhY3RvcnkyLCBkZXBzOiBbRXZlbnRNYW5hZ2VyLCBEb21TaGFyZWRTdHlsZXNIb3N0XX0sXG4gIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogRG9tUmVuZGVyZXJGYWN0b3J5Mn0sXG4gIHtwcm92aWRlOiBTaGFyZWRTdHlsZXNIb3N0LCB1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0sXG4gIHtcbiAgICBwcm92aWRlOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFNlcmlhbGl6ZXIsIGRlcHM6IFtSZW5kZXJTdG9yZV19LFxuICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IGZhbHNlfSxcbiAge3Byb3ZpZGU6IFJlbmRlclN0b3JlLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCBkZXBzOiBbTmdab25lXX0sXG4gIHtwcm92aWRlOiBFdmVudE1hbmFnZXIsIGRlcHM6IFtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIE5nWm9uZV19LFxuICB7cHJvdmlkZTogV2ViV29ya2VySW5zdGFuY2UsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbSW5qZWN0b3JdXG4gIH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9VSV9JRH0sXG4gIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBtZXNzYWdlQnVzRmFjdG9yeSwgZGVwczogW1dlYldvcmtlckluc3RhbmNlXX0sXG5dO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCBidXMgPSBpbmplY3Rvci5nZXQoTWVzc2FnZUJ1cyk7XG4gIGNvbnN0IHpvbmUgPSBpbmplY3Rvci5nZXQ8Tmdab25lPihOZ1pvbmUpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuXG4gIC8vIGluaXRpYWxpemUgbWVzc2FnZSBzZXJ2aWNlcyBhZnRlciB0aGUgYnVzIGhhcyBiZWVuIGNyZWF0ZWRcbiAgY29uc3Qgc2VydmljZXMgPSBpbmplY3Rvci5nZXQoV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSk7XG4gIHpvbmUucnVuR3VhcmRlZCgoKSA9PiB7IHNlcnZpY2VzLmZvckVhY2goKHN2YzogYW55KSA9PiB7IHN2Yy5zdGFydCgpOyB9KTsgfSk7XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2VCdXNGYWN0b3J5KGluc3RhbmNlOiBXZWJXb3JrZXJJbnN0YW5jZSk6IE1lc3NhZ2VCdXMge1xuICByZXR1cm4gaW5zdGFuY2UuYnVzO1xufVxuXG5mdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oaW5qZWN0b3I6IEluamVjdG9yKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgICBCcm93c2VyR2V0VGVzdGFiaWxpdHkuaW5pdCgpO1xuICAgIGxldCBzY3JpcHRVcmk6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgc2NyaXB0VXJpID0gaW5qZWN0b3IuZ2V0KFdPUktFUl9TQ1JJUFQpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdZb3UgbXVzdCBwcm92aWRlIHlvdXIgV2ViV29ya2VyXFwncyBpbml0aWFsaXphdGlvbiBzY3JpcHQgd2l0aCB0aGUgV09SS0VSX1NDUklQVCB0b2tlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gaW5qZWN0b3IuZ2V0KFdlYldvcmtlckluc3RhbmNlKTtcbiAgICBzcGF3bldlYldvcmtlcihzY3JpcHRVcmksIGluc3RhbmNlKTtcblxuICAgIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3IpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVdvcmtlclVpID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnd29ya2VyVWknLCBfV09SS0VSX1VJX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbmZ1bmN0aW9uIF9leGNlcHRpb25IYW5kbGVyKCk6IEVycm9ySGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXJyb3JIYW5kbGVyKCk7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGlzRGV2TW9kZSgpfSk7XG59XG5cbi8qKlxuICogU3Bhd25zIGEgbmV3IGNsYXNzIGFuZCBpbml0aWFsaXplcyB0aGUgV2ViV29ya2VySW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc3Bhd25XZWJXb3JrZXIodXJpOiBzdHJpbmcsIGluc3RhbmNlOiBXZWJXb3JrZXJJbnN0YW5jZSk6IHZvaWQge1xuICBjb25zdCB3ZWJXb3JrZXI6IFdvcmtlciA9IG5ldyBXb3JrZXIodXJpKTtcbiAgLy8gd2ViV29ya2VyIGlzIGNhc3RlZCB0byBhbnkgYmVjYXVzZSB0aGUgbGliLmQudHMgc2lnbmF0dXJlIGNoYW5nZWQgaW4gVFMzLjUgdG8gcmVxdWlyZSB0aGVcbiAgLy8gdHJhbnNmZXIgYXJndW1lbnQgaW4gcG9zdE1lc3NhZ2UgbWV0aG9kLlxuICAvLyB0aGlzIHNlZW1zIHdyb25nIGJ1dCBzaW5jZSBhbGwgb2YgdGhpcyBjb2RlIGlzIGRlcHJlY2F0ZWQgaXQgc2hvdWxkbid0IG1hdHRlciB0aGF0IG11Y2guXG4gIGNvbnN0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKHdlYldvcmtlciBhcyBhbnkpO1xuICBjb25zdCBzb3VyY2UgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTb3VyY2Uod2ViV29ya2VyKTtcbiAgY29uc3QgYnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKHNpbmssIHNvdXJjZSk7XG5cbiAgaW5zdGFuY2UuaW5pdCh3ZWJXb3JrZXIsIGJ1cyk7XG59XG4iXX0=