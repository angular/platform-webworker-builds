/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵPLATFORM_WORKER_UI_ID as PLATFORM_WORKER_UI_ID } from '@angular/common';
import { ErrorHandler, Injectable, InjectionToken, Injector, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, isDevMode, platformCore, ɵAPP_ID_RANDOM_PROVIDER as APP_ID_RANDOM_PROVIDER } from '@angular/core';
import { DOCUMENT, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵBROWSER_SANITIZATION_PROVIDERS as BROWSER_SANITIZATION_PROVIDERS, ɵBrowserDomAdapter as BrowserDomAdapter, ɵBrowserGetTestability as BrowserGetTestability, ɵDomEventsPlugin as DomEventsPlugin, ɵDomRendererFactory2 as DomRendererFactory2, ɵDomSharedStylesHost as DomSharedStylesHost, ɵHammerGesturesPlugin as HammerGesturesPlugin, ɵKeyEventsPlugin as KeyEventsPlugin, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
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
    WebWorkerInstance = tslib_1.__decorate([
        Injectable()
    ], WebWorkerInstance);
    return WebWorkerInstance;
}());
export { WebWorkerInstance };
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
        catch (e) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFlLHNCQUFzQixJQUFJLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFlLGdCQUFnQixFQUFnQyxXQUFXLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6UyxPQUFPLEVBQUMsUUFBUSxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSwrQkFBK0IsSUFBSSw4QkFBOEIsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBRSxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUscUJBQXFCLElBQUksb0JBQW9CLEVBQUUsZ0JBQWdCLElBQUksZUFBZSxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFvQixNQUFNLDJCQUEyQixDQUFDO0FBRTlpQixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9C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LE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFlBQVk7SUFDbkIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxHQUFXLEVBQUUsUUFBMkI7SUFDOUQsSUFBTSxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELElBQU0sR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgybVQTEFURk9STV9XT1JLRVJfVUlfSUQgYXMgUExBVEZPUk1fV09SS0VSX1VJX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTmdab25lLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBSb290UmVuZGVyZXIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBpc0Rldk1vZGUsIHBsYXRmb3JtQ29yZSwgybVBUFBfSURfUkFORE9NX1BST1ZJREVSIGFzIEFQUF9JRF9SQU5ET01fUFJPVklERVJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVCwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXIsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgSGFtbWVyR2VzdHVyZUNvbmZpZywgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMgYXMgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLCDJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtUJyb3dzZXJHZXRUZXN0YWJpbGl0eSBhcyBCcm93c2VyR2V0VGVzdGFiaWxpdHksIMm1RG9tRXZlbnRzUGx1Z2luIGFzIERvbUV2ZW50c1BsdWdpbiwgybVEb21SZW5kZXJlckZhY3RvcnkyIGFzIERvbVJlbmRlcmVyRmFjdG9yeTIsIMm1RG9tU2hhcmVkU3R5bGVzSG9zdCBhcyBEb21TaGFyZWRTdHlsZXNIb3N0LCDJtUhhbW1lckdlc3R1cmVzUGx1Z2luIGFzIEhhbW1lckdlc3R1cmVzUGx1Z2luLCDJtUtleUV2ZW50c1BsdWdpbiBhcyBLZXlFdmVudHNQbHVnaW4sIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcjJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuXG5cblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgZXhwb3NlcyB0aGUgV29ya2VyXG4gKiBhbmQgdW5kZXJseWluZyB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGxvd2VyIGxldmVsIG1lc3NhZ2UgcGFzc2luZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJJbnN0YW5jZSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgd29ya2VyICE6IFdvcmtlcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBidXMgITogTWVzc2FnZUJ1cztcblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBpbml0KHdvcmtlcjogV29ya2VyLCBidXM6IE1lc3NhZ2VCdXMpIHtcbiAgICB0aGlzLndvcmtlciA9IHdvcmtlcjtcbiAgICB0aGlzLmJ1cyA9IGJ1cztcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9TQ1JJUFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignV2ViV29ya2VyU2NyaXB0Jyk7XG5cbi8qKlxuICogQSBtdWx0aS1wcm92aWRlciB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYHN0YXJ0KClgIG1ldGhvZCBhZnRlciB0aGUgc2VydmljZSBpc1xuICogY3JlYXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KHtzdGFydDogKCkgPT4gdm9pZH0pW10+KCdXb3JrZXJSZW5kZXJTdGFydGFibGVNc2dTZXJ2aWNlJyk7XG5cbmV4cG9ydCBjb25zdCBfV09SS0VSX1VJX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlRmFjdG9yeTogY3JlYXRlTmdab25lLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBNZXNzYWdlQmFzZWRSZW5kZXJlcjIsXG4gICAgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgTWVzc2FnZUJ1cywgU2VyaWFsaXplciwgUmVuZGVyU3RvcmUsIFJlbmRlcmVyRmFjdG9yeTJdXG4gIH0sXG4gIHtwcm92aWRlOiBXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFLCB1c2VFeGlzdGluZzogTWVzc2FnZUJhc2VkUmVuZGVyZXIyLCBtdWx0aTogdHJ1ZX0sXG4gIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbiAgLy8gVE9ETyhqdGVwbGl0ejYwMik6IEludmVzdGlnYXRlIGlmIHdlIGRlZmluaXRlbHkgbmVlZCBFVkVOVF9NQU5BR0VSIG9uIHRoZSByZW5kZXIgdGhyZWFkXG4gIC8vICM1Mjk4XG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZV0sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgZGVwczogW0RPQ1VNRU5UXSwgbXVsdGk6IHRydWV9LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIEhBTU1FUl9HRVNUVVJFX0NPTkZJR10sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbiAge3Byb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWcsIGRlcHM6IFtdfSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAge3Byb3ZpZGU6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3RdfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge1xuICAgIHByb3ZpZGU6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICB1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtNZXNzYWdlQnVzLCBTZXJpYWxpemVyXVxuICB9LFxuICB7cHJvdmlkZTogU2VyaWFsaXplciwgZGVwczogW1JlbmRlclN0b3JlXX0sXG4gIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogZmFsc2V9LFxuICB7cHJvdmlkZTogUmVuZGVyU3RvcmUsIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIHtwcm92aWRlOiBXZWJXb3JrZXJJbnN0YW5jZSwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX1VJX0lEfSxcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IG1lc3NhZ2VCdXNGYWN0b3J5LCBkZXBzOiBbV2ViV29ya2VySW5zdGFuY2VdfSxcbl07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IGJ1cyA9IGluamVjdG9yLmdldChNZXNzYWdlQnVzKTtcbiAgY29uc3Qgem9uZSA9IGluamVjdG9yLmdldDxOZ1pvbmU+KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBtZXNzYWdlIHNlcnZpY2VzIGFmdGVyIHRoZSBidXMgaGFzIGJlZW4gY3JlYXRlZFxuICBjb25zdCBzZXJ2aWNlcyA9IGluamVjdG9yLmdldChXT1JLRVJfVUlfU1RBUlRBQkxFX01FU1NBR0lOR19TRVJWSUNFKTtcbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHsgc2VydmljZXMuZm9yRWFjaCgoc3ZjOiBhbnkpID0+IHsgc3ZjLnN0YXJ0KCk7IH0pOyB9KTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUJ1c0ZhY3RvcnkoaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogTWVzc2FnZUJ1cyB7XG4gIHJldHVybiBpbnN0YW5jZS5idXM7XG59XG5cbmZ1bmN0aW9uIGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybShpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICAgIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG4gICAgbGV0IHNjcmlwdFVyaTogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBzY3JpcHRVcmkgPSBpbmplY3Rvci5nZXQoV09SS0VSX1NDUklQVCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdZb3UgbXVzdCBwcm92aWRlIHlvdXIgV2ViV29ya2VyXFwncyBpbml0aWFsaXphdGlvbiBzY3JpcHQgd2l0aCB0aGUgV09SS0VSX1NDUklQVCB0b2tlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gaW5qZWN0b3IuZ2V0KFdlYldvcmtlckluc3RhbmNlKTtcbiAgICBzcGF3bldlYldvcmtlcihzY3JpcHRVcmksIGluc3RhbmNlKTtcblxuICAgIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3IpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyVWkgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICd3b3JrZXJVaScsIF9XT1JLRVJfVUlfUExBVEZPUk1fUFJPVklERVJTKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogaXNEZXZNb2RlKCl9KTtcbn1cblxuLyoqXG4gKiBTcGF3bnMgYSBuZXcgY2xhc3MgYW5kIGluaXRpYWxpemVzIHRoZSBXZWJXb3JrZXJJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzcGF3bldlYldvcmtlcih1cmk6IHN0cmluZywgaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogdm9pZCB7XG4gIGNvbnN0IHdlYldvcmtlcjogV29ya2VyID0gbmV3IFdvcmtlcih1cmkpO1xuICBjb25zdCBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayh3ZWJXb3JrZXIpO1xuICBjb25zdCBzb3VyY2UgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTb3VyY2Uod2ViV29ya2VyKTtcbiAgY29uc3QgYnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKHNpbmssIHNvdXJjZSk7XG5cbiAgaW5zdGFuY2UuaW5pdCh3ZWJXb3JrZXIsIGJ1cyk7XG59XG4iXX0=