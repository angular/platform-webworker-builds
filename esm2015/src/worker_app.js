/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/worker_app.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_WORKER_APP_ID as PLATFORM_WORKER_APP_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, NgModule, NgZone, PLATFORM_ID, RendererFactory2, createPlatformFactory, platformCore, ɵINJECTOR_SCOPE as INJECTOR_SCOPE } from '@angular/core';
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
 * @param {?} transferrables
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
            },] }
];
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsSUFBSSxvQkFBb0IsRUFBRSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNLLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFlLGdCQUFnQixFQUFrQixxQkFBcUIsRUFBRSxZQUFZLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyTyxPQUFPLEVBQUMsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO1dBUUEsc0JBQXNCOzs7Ozs7QUFGM0YsTUFBTSxPQUFPLGlCQUFpQixHQUMxQixxQkFBcUIsQ0FDakIsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLElBQXdCLEVBQUMsQ0FBQyxDQUFDOzs7O0FBRTlGLE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM1QixDQUFDOzs7Ozs7O0FBS2MsQ0FBQyxPQUFZLEVBQUUsY0FBOEIsRUFBRSxFQUFFO0lBQzVELENBQUMsbUJBQUssV0FBVyxFQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsQ0FBQzs7TUFIRyxZQUFZLEdBQUc7SUFDbkIsV0FBVyxNQUVWO0NBQ0Y7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVk7O1VBQ3JDLElBQUksR0FBRyxJQUFJLGtCQUFrQixDQUFDLFlBQVksQ0FBQzs7VUFDM0MsTUFBTSxHQUFHLElBQUksb0JBQW9CLEVBQUU7O1VBQ25DLEdBQUcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0lBQzVDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLGNBQWM7SUFDNUIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakMsQ0FBQzs7Ozs7OztBQThCRCxNQUFNLE9BQU8sZUFBZTs7O1lBdEIzQixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULDhCQUE4QjtvQkFDOUIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7b0JBQzNDLFVBQVU7b0JBQ1YsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7b0JBQ25DLDBCQUEwQjtvQkFDMUIsMkJBQTJCO29CQUMzQix5QkFBeUI7b0JBQ3pCLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBQztvQkFDbkUsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7b0JBQ3hDLFdBQVc7b0JBQ1gsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztvQkFDM0QsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQztvQkFDbkUsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztvQkFDakUsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7aUJBQ3RFO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBWaWV3cG9ydFNjcm9sbGVyLCDJtU51bGxWaWV3cG9ydFNjcm9sbGVyIGFzIE51bGxWaWV3cG9ydFNjcm9sbGVyLCDJtVBMQVRGT1JNX1dPUktFUl9BUFBfSUQgYXMgUExBVEZPUk1fV09SS0VSX0FQUF9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBBcHBsaWNhdGlvbk1vZHVsZSwgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSwgTmdab25lLCBQTEFURk9STV9JRCwgUGxhdGZvcm1SZWYsIFJlbmRlcmVyRmFjdG9yeTIsIFN0YXRpY1Byb3ZpZGVyLCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIHBsYXRmb3JtQ29yZSwgybVJTkpFQ1RPUl9TQ09QRSBhcyBJTkpFQ1RPUl9TQ09QRX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1dlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyJztcbmltcG9ydCB7V29ya2VyRG9tQWRhcHRlcn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvd29ya2VyX2FkYXB0ZXInO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVdvcmtlckFwcDogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSB8IHVuZGVmaW5lZCkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgICAgICAgcGxhdGZvcm1Db3JlLCAnd29ya2VyQXBwJywgW3twcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1dPUktFUl9BUFBfSUR9XSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogcmVtb3ZlIHRoaXMgYW5kIGNvbXBpbGUgd2l0aCBsaWIud2Vid29ya2VyLmQudHMgKCMzNDkyKVxuY29uc3QgX3Bvc3RNZXNzYWdlID0ge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXJyYWJsZXM6IFtUcmFuc2ZlcmFibGVdKSA9PiB7XG4gICAgKDxhbnk+cG9zdE1lc3NhZ2UpKG1lc3NhZ2UsIHRyYW5zZmVycmFibGVzKTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VCdXMoem9uZTogTmdab25lKTogTWVzc2FnZUJ1cyB7XG4gIGNvbnN0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKF9wb3N0TWVzc2FnZSk7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSgpO1xuICBjb25zdCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwV2ViV29ya2VyKCk6IHZvaWQge1xuICBXb3JrZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbi8qKlxuICogVGhlIG5nIG1vZHVsZSBmb3IgdGhlIHdvcmtlciBhcHAgc2lkZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IElOSkVDVE9SX1NDT1BFLCB1c2VWYWx1ZTogJ3Jvb3QnfSxcbiAgICBTZXJpYWxpemVyLFxuICAgIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlVmFsdWU6IG51bGx9LFxuICAgIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyLFxuICAgIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mn0sXG4gICAge3Byb3ZpZGU6IE9OX1dFQl9XT1JLRVIsIHVzZVZhbHVlOiB0cnVlfSxcbiAgICBSZW5kZXJTdG9yZSxcbiAgICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBlcnJvckhhbmRsZXIsIGRlcHM6IFtdfSxcbiAgICB7cHJvdmlkZTogTWVzc2FnZUJ1cywgdXNlRmFjdG9yeTogY3JlYXRlTWVzc2FnZUJ1cywgZGVwczogW05nWm9uZV19LFxuICAgIHtwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsIHVzZVZhbHVlOiBzZXR1cFdlYldvcmtlciwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBWaWV3cG9ydFNjcm9sbGVyLCB1c2VDbGFzczogTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIGRlcHM6IFtdfSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBcHBsaWNhdGlvbk1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXb3JrZXJBcHBNb2R1bGUge1xufVxuIl19