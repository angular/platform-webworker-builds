/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/worker_app.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
    postMessage: (/**
     * @param {?} message
     * @param {?} transferrables
     * @return {?}
     */
    (message, transferrables) => {
        ((/** @type {?} */ (postMessage)))(message, transferrables);
    })
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
            },] },
];
/** @nocollapse */ WorkerAppModule.ɵmod = i0.ɵɵdefineNgModule({ type: WorkerAppModule });
/** @nocollapse */ WorkerAppModule.ɵinj = i0.ɵɵdefineInjector({ factory: function WorkerAppModule_Factory(t) { return new (t || WorkerAppModule)(); }, providers: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixJQUFJLG9CQUFvQixFQUFFLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0ssT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQWUsZ0JBQWdCLEVBQWtCLHFCQUFxQixFQUFFLFlBQVksRUFBRSxlQUFlLElBQUksY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JPLE9BQU8sRUFBQywrQkFBK0IsSUFBSSw4QkFBOEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTVHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9HLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDeEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7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QUNQLFlBQVk7b0JBQ1osaUJBQWlCO2lCQUNsQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIFZpZXdwb3J0U2Nyb2xsZXIsIMm1TnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgTnVsbFZpZXdwb3J0U2Nyb2xsZXIsIMm1UExBVEZPUk1fV09SS0VSX0FQUF9JRCBhcyBQTEFURk9STV9XT1JLRVJfQVBQX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uTW9kdWxlLCBFcnJvckhhbmRsZXIsIE5nTW9kdWxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBQbGF0Zm9ybVJlZiwgUmVuZGVyZXJGYWN0b3J5MiwgU3RhdGljUHJvdmlkZXIsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlLCDJtUlOSkVDVE9SX1NDT1BFIGFzIElOSkVDVE9SX1NDT1BFfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMgYXMgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9hcGknO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtQb3N0TWVzc2FnZUJ1cywgUG9zdE1lc3NhZ2VCdXNTaW5rLCBQb3N0TWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7V2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXInO1xuaW1wb3J0IHtXb3JrZXJEb21BZGFwdGVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlcic7XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyQXBwOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdIHwgdW5kZWZpbmVkKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgICAgICBwbGF0Zm9ybUNvcmUsICd3b3JrZXJBcHAnLCBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fV09SS0VSX0FQUF9JRH1dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiByZW1vdmUgdGhpcyBhbmQgY29tcGlsZSB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cyAoIzM0OTIpXG5jb25zdCBfcG9zdE1lc3NhZ2UgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2ZlcnJhYmxlczogW1RyYW5zZmVyYWJsZV0pID0+IHtcbiAgICAoPGFueT5wb3N0TWVzc2FnZSkobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUJ1cyh6b25lOiBOZ1pvbmUpOiBNZXNzYWdlQnVzIHtcbiAgY29uc3Qgc2luayA9IG5ldyBQb3N0TWVzc2FnZUJ1c1NpbmsoX3Bvc3RNZXNzYWdlKTtcbiAgY29uc3Qgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKCk7XG4gIGNvbnN0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICByZXR1cm4gYnVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJXb3JrZXIoKTogdm9pZCB7XG4gIFdvcmtlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgd29ya2VyIGFwcCBzaWRlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogSU5KRUNUT1JfU0NPUEUsIHVzZVZhbHVlOiAncm9vdCd9LFxuICAgIFNlcmlhbGl6ZXIsXG4gICAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VWYWx1ZTogbnVsbH0sXG4gICAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgIFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIsXG4gICAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyfSxcbiAgICB7cHJvdmlkZTogT05fV0VCX1dPUktFUiwgdXNlVmFsdWU6IHRydWV9LFxuICAgIFJlbmRlclN0b3JlLFxuICAgIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICAgIHtwcm92aWRlOiBNZXNzYWdlQnVzLCB1c2VGYWN0b3J5OiBjcmVhdGVNZXNzYWdlQnVzLCBkZXBzOiBbTmdab25lXX0sXG4gICAge3Byb3ZpZGU6IEFQUF9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IHNldHVwV2ViV29ya2VyLCBtdWx0aTogdHJ1ZX0sXG4gICAge3Byb3ZpZGU6IFZpZXdwb3J0U2Nyb2xsZXIsIHVzZUNsYXNzOiBOdWxsVmlld3BvcnRTY3JvbGxlciwgZGVwczogW119LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFwcGxpY2F0aW9uTW9kdWxlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtlckFwcE1vZHVsZSB7XG59XG4iXX0=