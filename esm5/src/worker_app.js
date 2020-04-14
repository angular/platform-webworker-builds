/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_WORKER_APP_ID as PLATFORM_WORKER_APP_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, createPlatformFactory, ErrorHandler, NgModule, NgZone, PLATFORM_ID, platformCore, RendererFactory2, ɵINJECTOR_SCOPE as INJECTOR_SCOPE } from '@angular/core';
import { ɵBROWSER_SANITIZATION_PROVIDERS as BROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
import { ON_WEB_WORKER } from './web_workers/shared/api';
import { ClientMessageBrokerFactory } from './web_workers/shared/client_message_broker';
import { MessageBus } from './web_workers/shared/message_bus';
import { PostMessageBus, PostMessageBusSink, PostMessageBusSource } from './web_workers/shared/post_message_bus';
import { RenderStore } from './web_workers/shared/render_store';
import { Serializer } from './web_workers/shared/serializer';
import { ServiceMessageBrokerFactory } from './web_workers/shared/service_message_broker';
import { WebWorkerRendererFactory2 } from './web_workers/worker/renderer';
import { WorkerDomAdapter } from './web_workers/worker/worker_adapter';
import * as i0 from "@angular/core";
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export var platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: PLATFORM_WORKER_APP_ID }]);
export function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        postMessage(message, transferrables);
    }
};
export function createMessageBus(zone) {
    var sink = new PostMessageBusSink(_postMessage);
    var source = new PostMessageBusSource();
    var bus = new PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
export function setupWebWorker() {
    WorkerDomAdapter.makeCurrent();
}
/**
 * The ng module for the worker app side.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var WorkerAppModule = /** @class */ (function () {
    function WorkerAppModule() {
    }
    WorkerAppModule.ɵmod = i0.ɵɵdefineNgModule({ type: WorkerAppModule });
    WorkerAppModule.ɵinj = i0.ɵɵdefineInjector({ factory: function WorkerAppModule_Factory(t) { return new (t || WorkerAppModule)(); }, providers: [
            BROWSER_SANITIZATION_PROVIDERS,
            { provide: INJECTOR_SCOPE, useValue: 'root' },
            Serializer,
            { provide: DOCUMENT, useValue: null },
            ClientMessageBrokerFactory,
            ServiceMessageBrokerFactory,
            WebWorkerRendererFactory2,
            { provide: RendererFactory2, useExisting: WebWorkerRendererFactory2 },
            { provide: ON_WEB_WORKER, useValue: true },
            RenderStore,
            { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
            { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] },
            { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true },
            { provide: ViewportScroller, useClass: NullViewportScroller, deps: [] },
        ], imports: [CommonModule,
            ApplicationModule] });
    return WorkerAppModule;
}());
export { WorkerAppModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WorkerAppModule, { exports: [CommonModule,
        ApplicationModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WorkerAppModule, [{
        type: NgModule,
        args: [{
                providers: [
                    BROWSER_SANITIZATION_PROVIDERS,
                    { provide: INJECTOR_SCOPE, useValue: 'root' },
                    Serializer,
                    { provide: DOCUMENT, useValue: null },
                    ClientMessageBrokerFactory,
                    ServiceMessageBrokerFactory,
                    WebWorkerRendererFactory2,
                    { provide: RendererFactory2, useExisting: WebWorkerRendererFactory2 },
                    { provide: ON_WEB_WORKER, useValue: true },
                    RenderStore,
                    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                    { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] },
                    { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true },
                    { provide: ViewportScroller, useClass: NullViewportScroller, deps: [] },
                ],
                exports: [
                    CommonModule,
                    ApplicationModule,
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNLLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBZSxnQkFBZ0IsRUFBa0IsZUFBZSxJQUFJLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyTyxPQUFPLEVBQUMsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFN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LElBQUksRUFBRSxFQUFFLEVBQUM7b0JBQzNELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ2pFLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO2lCQUN0RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgVmlld3BvcnRTY3JvbGxlciwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9XT1JLRVJfQVBQX0lEIGFzIFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Nb2R1bGUsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSwgTmdab25lLCBQTEFURk9STV9JRCwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIMm1SU5KRUNUT1JfU0NPUEUgYXMgSU5KRUNUT1JfU0NPUEV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlcic7XG5pbXBvcnQge1dvcmtlckRvbUFkYXB0ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3dvcmtlcl9hZGFwdGVyJztcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJBcHA6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW118dW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgICAgICBwbGF0Zm9ybUNvcmUsICd3b3JrZXJBcHAnLCBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX0FQUF9JRH1dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiByZW1vdmUgdGhpcyBhbmQgY29tcGlsZSB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cyAoIzM0OTIpXG5jb25zdCBfcG9zdE1lc3NhZ2UgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2ZlcnJhYmxlczogW1RyYW5zZmVyYWJsZV0pID0+IHtcbiAgICAoPGFueT5wb3N0TWVzc2FnZSkobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUJ1cyh6b25lOiBOZ1pvbmUpOiBNZXNzYWdlQnVzIHtcbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NpbmsoX3Bvc3RNZXNzYWdlKTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKCk7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICByZXR1cm4gYnVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJXb3JrZXIoKTogdm9pZCB7XG4gIFdvcmtlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgd29ya2VyIGFwcCBzaWRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogSU5KRUNUT1JfU0NPUEUsIHVzZVZhbHVlOiAncm9vdCd9LFxuICAgIFNlcmlhbGl6ZXIsXG4gICAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VWYWx1ZTogbnVsbH0sXG4gICAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIsXG4gICAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyfSxcbiAgICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IHRydWV9LFxuICAgIFJlbmRlclN0b3JlLFxuICAgIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICAgIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBjcmVhdGVNZXNzYWdlQnVzLCBkZXBzOiBbTmdab25lXX0sXG4gICAge3Byb3ZpZGU6IEFQUF9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IHNldHVwV2ViV29ya2VyLCBtdWx0aTogdHJ1ZX0sXG4gICAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlciwgZGVwczogW119LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFwcGxpY2F0aW9uTW9kdWxlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtlckFwcE1vZHVsZSB7XG59XG4iXX0=