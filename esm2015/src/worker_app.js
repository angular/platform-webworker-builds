import { CommonModule, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_WORKER_APP_ID as PLATFORM_WORKER_APP_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, NgModule, NgZone, PLATFORM_ID, RendererFactory2, createPlatformFactory, platformCore, ɵAPP_ROOT as APP_ROOT } from '@angular/core';
import { DOCUMENT, ɵBROWSER_SANITIZATION_PROVIDERS as BROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@publicApi
 * @type {?}
 */
export const platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: PLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
export function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
/** @type {?} */
const _postMessage = {
    postMessage: (message, transferrables) => {
        ((/** @type {?} */ (postMessage)))(message, transferrables);
    }
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
            },] },
];
/** @nocollapse */ WorkerAppModule.ngModuleDef = i0.ɵdefineNgModule({ type: WorkerAppModule, exports: [CommonModule,
        ApplicationModule] });
/** @nocollapse */ WorkerAppModule.ngInjectorDef = i0.defineInjector({ factory: function WorkerAppModule_Factory(t) { return new (t || WorkerAppModule)(); }, providers: [
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
    ], imports: [[
            CommonModule,
            ApplicationModule,
        ]] });
/*@__PURE__*/ i0.ɵsetClassMetadata(WorkerAppModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDakssT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQWUsZ0JBQWdCLEVBQWdDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxTQUFTLElBQUksUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZPLE9BQU8sRUFBQyxRQUFRLEVBQUUsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV0SCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7Ozs7Ozs7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WixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBWaWV3cG9ydFNjcm9sbGVyLCDJtU51bGxWaWV3cG9ydFNjcm9sbGVyIGFzIE51bGxWaWV3cG9ydFNjcm9sbGVyLCDJtVBMQVRGT1JNX1dPUktFUl9BUFBfSUQgYXMgUExBVEZPUk1fV09SS0VSX0FQUF9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBBcHBsaWNhdGlvbk1vZHVsZSwgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSwgTmdab25lLCBQTEFURk9STV9JRCwgUGxhdGZvcm1SZWYsIFJlbmRlcmVyRmFjdG9yeTIsIFJvb3RSZW5kZXJlciwgU3RhdGljUHJvdmlkZXIsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlLCDJtUFQUF9ST09UIGFzIEFQUF9ST09UfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlQsIMm1QlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTIGFzIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7UG9zdE1lc3NhZ2VCdXMsIFBvc3RNZXNzYWdlQnVzU2luaywgUG9zdE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1dlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyJztcbmltcG9ydCB7V29ya2VyRG9tQWRhcHRlcn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvd29ya2VyX2FkYXB0ZXInO1xuXG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVdvcmtlckFwcCA9IGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShcbiAgICBwbGF0Zm9ybUNvcmUsICd3b3JrZXJBcHAnLCBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX0FQUF9JRH1dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiByZW1vdmUgdGhpcyBhbmQgY29tcGlsZSB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cyAoIzM0OTIpXG5jb25zdCBfcG9zdE1lc3NhZ2UgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2ZlcnJhYmxlcz86IFtBcnJheUJ1ZmZlcl0pID0+IHtcbiAgICAoPGFueT5wb3N0TWVzc2FnZSkobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUJ1cyh6b25lOiBOZ1pvbmUpOiBNZXNzYWdlQnVzIHtcbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NpbmsoX3Bvc3RNZXNzYWdlKTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKCk7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICByZXR1cm4gYnVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJXb3JrZXIoKTogdm9pZCB7XG4gIFdvcmtlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgd29ya2VyIGFwcCBzaWRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLFxuICAgIHtwcm92aWRlOiBBUFBfUk9PVCwgdXNlVmFsdWU6IHRydWV9LFxuICAgIFNlcmlhbGl6ZXIsXG4gICAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VWYWx1ZTogbnVsbH0sXG4gICAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIsXG4gICAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyfSxcbiAgICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IHRydWV9LFxuICAgIFJlbmRlclN0b3JlLFxuICAgIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICAgIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBjcmVhdGVNZXNzYWdlQnVzLCBkZXBzOiBbTmdab25lXX0sXG4gICAge3Byb3ZpZGU6IEFQUF9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IHNldHVwV2ViV29ya2VyLCBtdWx0aTogdHJ1ZX0sXG4gICAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlciwgZGVwczogW119LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFwcGxpY2F0aW9uTW9kdWxlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtlckFwcE1vZHVsZSB7XG59XG4iXX0=