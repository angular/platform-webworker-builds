/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_WORKER_APP_ID as PLATFORM_WORKER_APP_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, NgModule, NgZone, PLATFORM_ID, RendererFactory2, createPlatformFactory, platformCore, ɵAPP_ROOT as APP_ROOT } from '@angular/core';
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
const ɵ0 = PLATFORM_WORKER_APP_ID;
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 * @type {?}
 */
export const platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: ɵ0 }]);
/**
 * @return {?}
 */
export function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
const ɵ1 = /**
 * @param {?} message
 * @param {?=} transferrables
 * @return {?}
 */
(message, transferrables) => {
    ((/** @type {?} */ (postMessage)))(message, transferrables);
};
/** @type {?} */
const _postMessage = {
    postMessage: (ɵ1)
};
/**
 * @param {?} zone
 * @return {?}
 */
export function createMessageBus(zone) {
    /** @type {?} */
    const sink = new PostMessageBusSink(_postMessage);
    /** @type {?} */
    const source = new PostMessageBusSource();
    /** @type {?} */
    const bus = new PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
/**
 * @return {?}
 */
export function setupWebWorker() {
    WorkerDomAdapter.makeCurrent();
}
/**
 * The ng module for the worker app side.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export class WorkerAppModule {
}
WorkerAppModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    BROWSER_SANITIZATION_PROVIDERS,
                    { provide: APP_ROOT, useValue: true },
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
            },] }
];
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0ssT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQWUsZ0JBQWdCLEVBQWdDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxTQUFTLElBQUksUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZPLE9BQU8sRUFBQywrQkFBK0IsSUFBSSw4QkFBOEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTVHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9HLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7V0FTSixzQkFBc0I7Ozs7OztBQUR2RixNQUFNLE9BQU8saUJBQWlCLEdBQUcscUJBQXFCLENBQ2xELFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxJQUF3QixFQUFDLENBQUMsQ0FBQzs7OztBQUUxRixNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPLElBQUksWUFBWSxFQUFFLENBQUM7QUFDNUIsQ0FBQzs7Ozs7OztBQUtjLENBQUMsT0FBWSxFQUFFLGNBQThCLEVBQUUsRUFBRTtJQUM1RCxDQUFDLG1CQUFLLFdBQVcsRUFBQSxDQUFDLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7O01BSEcsWUFBWSxHQUFHO0lBQ25CLFdBQVcsTUFFVjtDQUNGOzs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZOztVQUNyQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUM7O1VBQzNDLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixFQUFFOztVQUNuQyxHQUFHLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztJQUM1QyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxjQUFjO0lBQzVCLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLENBQUM7Ozs7Ozs7QUE4QkQsTUFBTSxPQUFPLGVBQWU7OztZQXRCM0IsUUFBUSxTQUFDO2dCQUNSLFNBQVMsRUFBRTtvQkFDVCw4QkFBOEI7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO29CQUNuQyxVQUFVO29CQUNWLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO29CQUNuQywwQkFBMEI7b0JBQzFCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO29CQUN4QyxXQUFXO29CQUNYLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7b0JBQzNELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ2pFLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO2lCQUN0RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgVmlld3BvcnRTY3JvbGxlciwgybVOdWxsVmlld3BvcnRTY3JvbGxlciBhcyBOdWxsVmlld3BvcnRTY3JvbGxlciwgybVQTEFURk9STV9XT1JLRVJfQVBQX0lEIGFzIFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Nb2R1bGUsIEVycm9ySGFuZGxlciwgTmdNb2R1bGUsIE5nWm9uZSwgUExBVEZPUk1fSUQsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBSb290UmVuZGVyZXIsIFN0YXRpY1Byb3ZpZGVyLCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIHBsYXRmb3JtQ29yZSwgybVBUFBfUk9PVCBhcyBBUFBfUk9PVH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1dlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyJztcbmltcG9ydCB7V29ya2VyRG9tQWRhcHRlcn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvd29ya2VyX2FkYXB0ZXInO1xuXG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Xb3JrZXJBcHAgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGxhdGZvcm1Db3JlLCAnd29ya2VyQXBwJywgW3twcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9XSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogcmVtb3ZlIHRoaXMgYW5kIGNvbXBpbGUgd2l0aCBsaWIud2Vid29ya2VyLmQudHMgKCMzNDkyKVxuY29uc3QgX3Bvc3RNZXNzYWdlID0ge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXJyYWJsZXM/OiBbQXJyYXlCdWZmZXJdKSA9PiB7XG4gICAgKDxhbnk+cG9zdE1lc3NhZ2UpKG1lc3NhZ2UsIHRyYW5zZmVycmFibGVzKTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VCdXMoem9uZTogTmdab25lKTogTWVzc2FnZUJ1cyB7XG4gIGNvbnN0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKF9wb3N0TWVzc2FnZSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSgpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwV2ViV29ya2VyKCk6IHZvaWQge1xuICBXb3JrZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbi8qKlxuICogVGhlIG5nIG1vZHVsZSBmb3IgdGhlIHdvcmtlciBhcHAgc2lkZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IEFQUF9ST09ULCB1c2VWYWx1ZTogdHJ1ZX0sXG4gICAgU2VyaWFsaXplcixcbiAgICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZVZhbHVlOiBudWxsfSxcbiAgICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5MixcbiAgICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9LFxuICAgIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogdHJ1ZX0sXG4gICAgUmVuZGVyU3RvcmUsXG4gICAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sXG4gICAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IGNyZWF0ZU1lc3NhZ2VCdXMsIGRlcHM6IFtOZ1pvbmVdfSxcbiAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogc2V0dXBXZWJXb3JrZXIsIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogVmlld3BvcnRTY3JvbGxlciwgdXNlQ2xhc3M6IE51bGxWaWV3cG9ydFNjcm9sbGVyLCBkZXBzOiBbXX0sXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQXBwbGljYXRpb25Nb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV29ya2VyQXBwTW9kdWxlIHtcbn1cbiJdfQ==