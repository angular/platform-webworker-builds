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
import { ErrorHandler, Injectable, InjectionToken, Injector, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, isDevMode, platformCore, ɵAPP_ID_RANDOM_PROVIDER as APP_ID_RANDOM_PROVIDER } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQWUsZ0JBQWdCLEVBQWtCLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNSLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsK0JBQStCLElBQUksOEJBQThCLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUUsZ0JBQWdCLElBQUksZUFBZSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWpoQixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FB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YyxDQUFDLEdBQVcsRUFBRSxRQUEyQjs7VUFDeEQsU0FBUyxHQUFXLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQzs7Ozs7VUFJbkMsSUFBSSxHQUFHLElBQUksa0JBQWtCLENBQUMsbUJBQUEsU0FBUyxFQUFPLENBQUM7O1VBQy9DLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQzs7VUFDNUMsR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7SUFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVQTEFURk9STV9XT1JLRVJfVUlfSUQgYXMgUExBVEZPUk1fV09SS0VSX1VJX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTmdab25lLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgaXNEZXZNb2RlLCBwbGF0Zm9ybUNvcmUsIMm1QVBQX0lEX1JBTkRPTV9QUk9WSURFUiBhcyBBUFBfSURfUkFORE9NX1BST1ZJREVSfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXIsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgSGFtbWVyR2VzdHVyZUNvbmZpZywgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMgYXMgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLCDJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtUJyb3dzZXJHZXRUZXN0YWJpbGl0eSBhcyBCcm93c2VyR2V0VGVzdGFiaWxpdHksIMm1RG9tRXZlbnRzUGx1Z2luIGFzIERvbUV2ZW50c1BsdWdpbiwgybVEb21SZW5kZXJlckZhY3RvcnkyIGFzIERvbVJlbmRlcmVyRmFjdG9yeTIsIMm1RG9tU2hhcmVkU3R5bGVzSG9zdCBhcyBEb21TaGFyZWRTdHlsZXNIb3N0LCDJtUhhbW1lckdlc3R1cmVzUGx1Z2luIGFzIEhhbW1lckdlc3R1cmVzUGx1Z2luLCDJtUtleUV2ZW50c1BsdWdpbiBhcyBLZXlFdmVudHNQbHVnaW4sIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9hcGknO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtQb3N0TWVzc2FnZUJ1cywgUG9zdE1lc3NhZ2VCdXNTaW5rLCBQb3N0TWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkUmVuZGVyZXIyfSBmcm9tICcuL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyJztcblxuXG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyB0aGF0IGV4cG9zZXMgdGhlIFdvcmtlclxuICogYW5kIHVuZGVybHlpbmcge0BsaW5rIE1lc3NhZ2VCdXN9IGZvciBsb3dlciBsZXZlbCBtZXNzYWdlIHBhc3NpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlckluc3RhbmNlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyB3b3JrZXIgITogV29ya2VyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHVibGljIGJ1cyAhOiBNZXNzYWdlQnVzO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGluaXQod29ya2VyOiBXb3JrZXIsIGJ1czogTWVzc2FnZUJ1cykge1xuICAgIHRoaXMud29ya2VyID0gd29ya2VyO1xuICAgIHRoaXMuYnVzID0gYnVzO1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9TQ1JJUFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignV2ViV29ya2VyU2NyaXB0Jyk7XG5cbi8qKlxuICogQSBtdWx0aS1wcm92aWRlciB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYHN0YXJ0KClgIG1ldGhvZCBhZnRlciB0aGUgc2VydmljZSBpc1xuICogY3JlYXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCh7c3RhcnQ6ICgpID0+IHZvaWR9KVtdPignV29ya2VyUmVuZGVyU3RhcnRhYmxlTXNnU2VydmljZScpO1xuXG5leHBvcnQgY29uc3QgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBOZ1pvbmUsIHVzZUZhY3Rvcnk6IGNyZWF0ZU5nWm9uZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLFxuICAgIGRlcHM6IFtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXIsIFJlbmRlclN0b3JlLCBSZW5kZXJlckZhY3RvcnkyXVxuICB9LFxuICB7cHJvdmlkZTogV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSwgdXNlRXhpc3Rpbmc6IE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiwgbXVsdGk6IHRydWV9LFxuICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG4gIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBJbnZlc3RpZ2F0ZSBpZiB3ZSBkZWZpbml0ZWx5IG5lZWQgRVZFTlRfTUFOQUdFUiBvbiB0aGUgcmVuZGVyIHRocmVhZFxuICAvLyAjNTI5OFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmVdLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIGRlcHM6IFtET0NVTUVOVF0sIG11bHRpOiB0cnVlfSxcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBIQU1NRVJfR0VTVFVSRV9DT05GSUddLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG4gIHtwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBkZXBzOiBbXX0sXG4gIEFQUF9JRF9SQU5ET01fUFJPVklERVIsXG4gIHtwcm92aWRlOiBEb21SZW5kZXJlckZhY3RvcnkyLCBkZXBzOiBbRXZlbnRNYW5hZ2VyLCBEb21TaGFyZWRTdHlsZXNIb3N0XX0sXG4gIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogRG9tUmVuZGVyZXJGYWN0b3J5Mn0sXG4gIHtwcm92aWRlOiBTaGFyZWRTdHlsZXNIb3N0LCB1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0sXG4gIHtcbiAgICBwcm92aWRlOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIHVzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBkZXBzOiBbTWVzc2FnZUJ1cywgU2VyaWFsaXplcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFNlcmlhbGl6ZXIsIGRlcHM6IFtSZW5kZXJTdG9yZV19LFxuICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IGZhbHNlfSxcbiAge3Byb3ZpZGU6IFJlbmRlclN0b3JlLCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCBkZXBzOiBbTmdab25lXX0sXG4gIHtwcm92aWRlOiBFdmVudE1hbmFnZXIsIGRlcHM6IFtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIE5nWm9uZV19LFxuICB7cHJvdmlkZTogV2ViV29ya2VySW5zdGFuY2UsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbSW5qZWN0b3JdXG4gIH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9VSV9JRH0sXG4gIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBtZXNzYWdlQnVzRmFjdG9yeSwgZGVwczogW1dlYldvcmtlckluc3RhbmNlXX0sXG5dO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICBjb25zdCBidXMgPSBpbmplY3Rvci5nZXQoTWVzc2FnZUJ1cyk7XG4gIGNvbnN0IHpvbmUgPSBpbmplY3Rvci5nZXQ8Tmdab25lPihOZ1pvbmUpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuXG4gIC8vIGluaXRpYWxpemUgbWVzc2FnZSBzZXJ2aWNlcyBhZnRlciB0aGUgYnVzIGhhcyBiZWVuIGNyZWF0ZWRcbiAgY29uc3Qgc2VydmljZXMgPSBpbmplY3Rvci5nZXQoV09SS0VSX1VJX1NUQVJUQUJMRV9NRVNTQUdJTkdfU0VSVklDRSk7XG4gIHpvbmUucnVuR3VhcmRlZCgoKSA9PiB7IHNlcnZpY2VzLmZvckVhY2goKHN2YzogYW55KSA9PiB7IHN2Yy5zdGFydCgpOyB9KTsgfSk7XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2VCdXNGYWN0b3J5KGluc3RhbmNlOiBXZWJXb3JrZXJJbnN0YW5jZSk6IE1lc3NhZ2VCdXMge1xuICByZXR1cm4gaW5zdGFuY2UuYnVzO1xufVxuXG5mdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oaW5qZWN0b3I6IEluamVjdG9yKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgICBCcm93c2VyR2V0VGVzdGFiaWxpdHkuaW5pdCgpO1xuICAgIGxldCBzY3JpcHRVcmk6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgc2NyaXB0VXJpID0gaW5qZWN0b3IuZ2V0KFdPUktFUl9TQ1JJUFQpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdZb3UgbXVzdCBwcm92aWRlIHlvdXIgV2ViV29ya2VyXFwncyBpbml0aWFsaXphdGlvbiBzY3JpcHQgd2l0aCB0aGUgV09SS0VSX1NDUklQVCB0b2tlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gaW5qZWN0b3IuZ2V0KFdlYldvcmtlckluc3RhbmNlKTtcbiAgICBzcGF3bldlYldvcmtlcihzY3JpcHRVcmksIGluc3RhbmNlKTtcblxuICAgIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3IpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyVWkgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICd3b3JrZXJVaScsIF9XT1JLRVJfVUlfUExBVEZPUk1fUFJPVklERVJTKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogaXNEZXZNb2RlKCl9KTtcbn1cblxuLyoqXG4gKiBTcGF3bnMgYSBuZXcgY2xhc3MgYW5kIGluaXRpYWxpemVzIHRoZSBXZWJXb3JrZXJJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzcGF3bldlYldvcmtlcih1cmk6IHN0cmluZywgaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogdm9pZCB7XG4gIGNvbnN0IHdlYldvcmtlcjogV29ya2VyID0gbmV3IFdvcmtlcih1cmkpO1xuICAvLyB3ZWJXb3JrZXIgaXMgY2FzdGVkIHRvIGFueSBiZWNhdXNlIHRoZSBsaWIuZC50cyBzaWduYXR1cmUgY2hhbmdlZCBpbiBUUzMuNSB0byByZXF1aXJlIHRoZVxuICAvLyB0cmFuc2ZlciBhcmd1bWVudCBpbiBwb3N0TWVzc2FnZSBtZXRob2QuXG4gIC8vIHRoaXMgc2VlbXMgd3JvbmcgYnV0IHNpbmNlIGFsbCBvZiB0aGlzIGNvZGUgaXMgZGVwcmVjYXRlZCBpdCBzaG91bGRuJ3QgbWF0dGVyIHRoYXQgbXVjaC5cbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1Npbmsod2ViV29ya2VyIGFzIGFueSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSh3ZWJXb3JrZXIpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcblxuICBpbnN0YW5jZS5pbml0KHdlYldvcmtlciwgYnVzKTtcbn1cbiJdfQ==