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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNLLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBZSxnQkFBZ0IsRUFBa0IsZUFBZSxJQUFJLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyTyxPQUFPLEVBQUMsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxD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QUksRUFBRSxFQUFFLEVBQUM7b0JBQzNELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ2pFLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO2lCQUN0RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgVmlld3BvcnRTY3JvbGxlciwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9XT1JLRVJfQVBQX0lEIGFzIFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Nb2R1bGUsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSwgTmdab25lLCBQTEFURk9STV9JRCwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIMm1SU5KRUNUT1JfU0NPUEUgYXMgSU5KRUNUT1JfU0NPUEV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyBhcyBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1Bvc3RNZXNzYWdlQnVzLCBQb3N0TWVzc2FnZUJ1c1NpbmssIFBvc3RNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlcic7XG5pbXBvcnQge1dvcmtlckRvbUFkYXB0ZXJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3dvcmtlcl9hZGFwdGVyJztcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyQXBwOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdfHVuZGVmaW5lZCkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgICAgICAgcGxhdGZvcm1Db3JlLCAnd29ya2VyQXBwJywgW3twcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9XSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogcmVtb3ZlIHRoaXMgYW5kIGNvbXBpbGUgd2l0aCBsaWIud2Vid29ya2VyLmQudHMgKCMzNDkyKVxuY29uc3QgX3Bvc3RNZXNzYWdlID0ge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXJyYWJsZXM6IFtUcmFuc2ZlcmFibGVdKSA9PiB7XG4gICAgKDxhbnk+cG9zdE1lc3NhZ2UpKG1lc3NhZ2UsIHRyYW5zZmVycmFibGVzKTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VCdXMoem9uZTogTmdab25lKTogTWVzc2FnZUJ1cyB7XG4gIGNvbnN0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKF9wb3N0TWVzc2FnZSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSgpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwV2ViV29ya2VyKCk6IHZvaWQge1xuICBXb3JrZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbi8qKlxuICogVGhlIG5nIG1vZHVsZSBmb3IgdGhlIHdvcmtlciBhcHAgc2lkZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLFxuICAgIHtwcm92aWRlOiBJTkpFQ1RPUl9TQ09QRSwgdXNlVmFsdWU6ICdyb290J30sXG4gICAgU2VyaWFsaXplcixcbiAgICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZVZhbHVlOiBudWxsfSxcbiAgICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5MixcbiAgICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9LFxuICAgIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogdHJ1ZX0sXG4gICAgUmVuZGVyU3RvcmUsXG4gICAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sXG4gICAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IGNyZWF0ZU1lc3NhZ2VCdXMsIGRlcHM6IFtOZ1pvbmVdfSxcbiAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogc2V0dXBXZWJXb3JrZXIsIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogVmlld3BvcnRTY3JvbGxlciwgdXNlQ2xhc3M6IE51bGxWaWV3cG9ydFNjcm9sbGVyLCBkZXBzOiBbXX0sXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQXBwbGljYXRpb25Nb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV29ya2VyQXBwTW9kdWxlIHtcbn1cbiJdfQ==