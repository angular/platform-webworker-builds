/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export const platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: PLATFORM_WORKER_APP_ID }]);
export function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
const _postMessage = {
    postMessage: (message, transferrables) => {
        postMessage(message, transferrables);
    }
};
export function createMessageBus(zone) {
    const sink = new PostMessageBusSink(_postMessage);
    const source = new PostMessageBusSource();
    const bus = new PostMessageBus(sink, source);
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
let WorkerAppModule = /** @class */ (() => {
    class WorkerAppModule {
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
})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNLLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBZSxnQkFBZ0IsRUFBa0IsZUFBZSxJQUFJLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyTyxPQUFPLEVBQUMsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxD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QUksRUFBRSxFQUFFLEVBQUM7b0JBQzNELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ2pFLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO2lCQUN0RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBWaWV3cG9ydFNjcm9sbGVyLCDJtU51bGxWaWV3cG9ydFNjcm9sbGVyIGFzIE51bGxWaWV3cG9ydFNjcm9sbGVyLCDJtVBMQVRGT1JNX1dPUktFUl9BUFBfSUQgYXMgUExBVEZPUk1fV09SS0VSX0FQUF9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBBcHBsaWNhdGlvbk1vZHVsZSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBFcnJvckhhbmRsZXIsIE5nTW9kdWxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBwbGF0Zm9ybUNvcmUsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBTdGF0aWNQcm92aWRlciwgybVJTkpFQ1RPUl9TQ09QRSBhcyBJTkpFQ1RPUl9TQ09QRX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1dlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyJztcbmltcG9ydCB7V29ya2VyRG9tQWRhcHRlcn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvd29ya2VyX2FkYXB0ZXInO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJBcHA6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW118dW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgICAgICBwbGF0Zm9ybUNvcmUsICd3b3JrZXJBcHAnLCBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX0FQUF9JRH1dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiByZW1vdmUgdGhpcyBhbmQgY29tcGlsZSB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cyAoIzM0OTIpXG5jb25zdCBfcG9zdE1lc3NhZ2UgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2ZlcnJhYmxlczogW1RyYW5zZmVyYWJsZV0pID0+IHtcbiAgICAoPGFueT5wb3N0TWVzc2FnZSkobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUJ1cyh6b25lOiBOZ1pvbmUpOiBNZXNzYWdlQnVzIHtcbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NpbmsoX3Bvc3RNZXNzYWdlKTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKCk7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICByZXR1cm4gYnVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJXb3JrZXIoKTogdm9pZCB7XG4gIFdvcmtlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgd29ya2VyIGFwcCBzaWRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IElOSkVDVE9SX1NDT1BFLCB1c2VWYWx1ZTogJ3Jvb3QnfSxcbiAgICBTZXJpYWxpemVyLFxuICAgIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlVmFsdWU6IG51bGx9LFxuICAgIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyLFxuICAgIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mn0sXG4gICAge3Byb3ZpZGU6IE9OX1dFQl9XT1JLRVIsIHVzZVZhbHVlOiB0cnVlfSxcbiAgICBSZW5kZXJTdG9yZSxcbiAgICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBlcnJvckhhbmRsZXIsIGRlcHM6IFtdfSxcbiAgICB7cHJvdmlkZTogTWVzc2FnZUJ1cywgdXNlRmFjdG9yeTogY3JlYXRlTWVzc2FnZUJ1cywgZGVwczogW05nWm9uZV19LFxuICAgIHtwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsIHVzZVZhbHVlOiBzZXR1cFdlYldvcmtlciwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBWaWV3cG9ydFNjcm9sbGVyLCB1c2VDbGFzczogTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIGRlcHM6IFtdfSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBcHBsaWNhdGlvbk1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXb3JrZXJBcHBNb2R1bGUge1xufVxuIl19