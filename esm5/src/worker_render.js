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
import * as i0 from "@angular/core";
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @publicApi
 */
var WebWorkerInstance = /** @class */ (function () {
    function WebWorkerInstance() {
    }
    /** @internal */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    WebWorkerInstance.ngInjectableDef = i0.defineInjectable({ token: WebWorkerInstance, factory: function WebWorkerInstance_Factory(t) { return new (t || WebWorkerInstance)(); }, providedIn: null });
    return WebWorkerInstance;
}());
export { WebWorkerInstance };
/*@__PURE__*/ i0.ɵsetClassMetadata(WebWorkerInstance, [{
        type: Injectable
    }], null, null);
/**
 * @publicApi
 */
export var WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @publicApi
 */
export var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
export var _WORKER_UI_PLATFORM_PROVIDERS = [
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
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(MessageBus);
    var zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
}
function messageBusFactory(instance) {
    return instance.bus;
}
function initWebWorkerRenderPlatform(injector) {
    return function () {
        BrowserDomAdapter.makeCurrent();
        BrowserGetTestability.init();
        var scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (_a) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        var instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @publicApi
 */
export var platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
function _exceptionHandler() {
    return new ErrorHandler();
}
function _document() {
    return document;
}
function createNgZone() {
    return new NgZone({ enableLongStackTrace: isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 */
function spawnWebWorker(uri, instance) {
    var webWorker = new Worker(uri);
    var sink = new PostMessageBusSink(webWorker);
    var source = new PostMessageBusSource(webWorker);
    var bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFlLGdCQUFnQixFQUFrQixXQUFXLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzUixPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLCtCQUErQixJQUFJLDhCQUE4QixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVqaEIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixF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QUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFlBQVk7SUFDbkIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxHQUFXLEVBQUUsUUFBMkI7SUFDOUQsSUFBTSxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELElBQU0sR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtVBMQVRGT1JNX1dPUktFUl9VSV9JRCBhcyBQTEFURk9STV9XT1JLRVJfVUlfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Vycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgUGxhdGZvcm1SZWYsIFJlbmRlcmVyRmFjdG9yeTIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBpc0Rldk1vZGUsIHBsYXRmb3JtQ29yZSwgybVBUFBfSURfUkFORE9NX1BST1ZJREVSIGFzIEFQUF9JRF9SQU5ET01fUFJPVklERVJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlciwgSEFNTUVSX0dFU1RVUkVfQ09ORklHLCBIYW1tZXJHZXN0dXJlQ29uZmlnLCDJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXIsIMm1QnJvd3NlckdldFRlc3RhYmlsaXR5IGFzIEJyb3dzZXJHZXRUZXN0YWJpbGl0eSwgybVEb21FdmVudHNQbHVnaW4gYXMgRG9tRXZlbnRzUGx1Z2luLCDJtURvbVJlbmRlcmVyRmFjdG9yeTIgYXMgRG9tUmVuZGVyZXJGYWN0b3J5MiwgybVEb21TaGFyZWRTdHlsZXNIb3N0IGFzIERvbVNoYXJlZFN0eWxlc0hvc3QsIMm1SGFtbWVyR2VzdHVyZXNQbHVnaW4gYXMgSGFtbWVyR2VzdHVyZXNQbHVnaW4sIMm1S2V5RXZlbnRzUGx1Z2luIGFzIEtleUV2ZW50c1BsdWdpbiwgybVTaGFyZWRTdHlsZXNIb3N0IGFzIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcjJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuXG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgZXhwb3NlcyB0aGUgV29ya2VyXG4gKiBhbmQgdW5kZXJseWluZyB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGxvd2VyIGxldmVsIG1lc3NhZ2UgcGFzc2luZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJJbnN0YW5jZSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgd29ya2VyICE6IFdvcmtlcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBidXMgITogTWVzc2FnZUJ1cztcblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBpbml0KHdvcmtlcjogV29ya2VyLCBidXM6IE1lc3NhZ2VCdXMpIHtcbiAgICB0aGlzLndvcmtlciA9IHdvcmtlcjtcbiAgICB0aGlzLmJ1cyA9IGJ1cztcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9TQ1JJUFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignV2ViV29ya2VyU2NyaXB0Jyk7XG5cbi8qKlxuICogQSBtdWx0aS1wcm92aWRlciB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYHN0YXJ0KClgIG1ldGhvZCBhZnRlciB0aGUgc2VydmljZSBpc1xuICogY3JlYXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KHtzdGFydDogKCkgPT4gdm9pZH0pW10+KCdXb3JrZXJSZW5kZXJTdGFydGFibGVNc2dTZXJ2aWNlJyk7XG5cbmV4cG9ydCBjb25zdCBfV09SS0VSX1VJX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlRmFjdG9yeTogY3JlYXRlTmdab25lLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBNZXNzYWdlQmFzZWRSZW5kZXJlcjIsXG4gICAgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgTWVzc2FnZUJ1cywgU2VyaWFsaXplciwgUmVuZGVyU3RvcmUsIFJlbmRlcmVyRmFjdG9yeTJdXG4gIH0sXG4gIHtwcm92aWRlOiBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFLCB1c2VFeGlzdGluZzogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLCBtdWx0aTogdHJ1ZX0sXG4gIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbiAgLy8gVE9ETyhqdGVwbGl0ejYwMik6IEludmVzdGlnYXRlIGlmIHdlIGRlZmluaXRlbHkgbmVlZCBFVkVOVF9NQU5BR0VSIG9uIHRoZSByZW5kZXIgdGhyZWFkXG4gIC8vICM1Mjk4XG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZV0sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgZGVwczogW0RPQ1VNRU5UXSwgbXVsdGk6IHRydWV9LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIEhBTU1FUl9HRVNUVVJFX0NPTkZJR10sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWcsIGRlcHM6IFtdfSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAge3Byb3ZpZGU6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3RdfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge1xuICAgIHByb3ZpZGU6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICB1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7cHJvdmlkZTogU2VyaWFsaXplciwgZGVwczogW1JlbmRlclN0b3JlXX0sXG4gIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogZmFsc2V9LFxuICB7cHJvdmlkZTogUmVuZGVyU3RvcmUsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIHtwcm92aWRlOiBXZWJXb3JrZXJJbnN0YW5jZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX1VJX0lEfSxcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IG1lc3NhZ2VCdXNGYWN0b3J5LCBkZXBzOiBbV2ViV29ya2VySW5zdGFuY2VdfSxcbl07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IGJ1cyA9IGluamVjdG9yLmdldChNZXNzYWdlQnVzKTtcbiAgY29uc3Qgem9uZSA9IGluamVjdG9yLmdldDxOZ1pvbmU+KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBtZXNzYWdlIHNlcnZpY2VzIGFmdGVyIHRoZSBidXMgaGFzIGJlZW4gY3JlYXRlZFxuICBjb25zdCBzZXJ2aWNlcyA9IGluamVjdG9yLmdldChXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFKTtcbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHsgc2VydmljZXMuZm9yRWFjaCgoc3ZjOiBhbnkpID0+IHsgc3ZjLnN0YXJ0KCk7IH0pOyB9KTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUJ1c0ZhY3RvcnkoaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogTWVzc2FnZUJ1cyB7XG4gIHJldHVybiBpbnN0YW5jZS5idXM7XG59XG5cbmZ1bmN0aW9uIGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybShpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICAgIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG4gICAgbGV0IHNjcmlwdFVyaTogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBzY3JpcHRVcmkgPSBpbmplY3Rvci5nZXQoV09SS0VSX1NDUklQVCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1lvdSBtdXN0IHByb3ZpZGUgeW91ciBXZWJXb3JrZXJcXCdzIGluaXRpYWxpemF0aW9uIHNjcmlwdCB3aXRoIHRoZSBXT1JLRVJfU0NSSVBUIHRva2VuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbmplY3Rvci5nZXQoV2ViV29ya2VySW5zdGFuY2UpO1xuICAgIHNwYXduV2ViV29ya2VyKHNjcmlwdFVyaSwgaW5zdGFuY2UpO1xuXG4gICAgaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3Rvcik7XG4gIH07XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJVaSA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3dvcmtlclVpJywgX1dPUktFUl9VSV9QTEFURk9STV9QUk9WSURFUlMpO1xuXG5mdW5jdGlvbiBfZXhjZXB0aW9uSGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5mdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBpc0Rldk1vZGUoKX0pO1xufVxuXG4vKipcbiAqIFNwYXducyBhIG5ldyBjbGFzcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIFdlYldvcmtlckluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNwYXduV2ViV29ya2VyKHVyaTogc3RyaW5nLCBpbnN0YW5jZTogV2ViV29ya2VySW5zdGFuY2UpOiB2b2lkIHtcbiAgY29uc3Qgd2ViV29ya2VyOiBXb3JrZXIgPSBuZXcgV29ya2VyKHVyaSk7XG4gIGNvbnN0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKHdlYldvcmtlcik7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSh3ZWJXb3JrZXIpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcblxuICBpbnN0YW5jZS5pbml0KHdlYldvcmtlciwgYnVzKTtcbn1cbiJdfQ==