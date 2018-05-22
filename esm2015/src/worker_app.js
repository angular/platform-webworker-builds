/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, ɵPLATFORM_WORKER_APP_ID as PLATFORM_WORKER_APP_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, NgModule, NgZone, PLATFORM_ID, RendererFactory2, createPlatformFactory, platformCore } from '@angular/core';
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
/**
 * \@experimental
 */
export const /** @type {?} */ platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: PLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
export function errorHandler() {
    return new ErrorHandler();
}
const ɵ0 = (message, transferrables) => {
    (/** @type {?} */ (postMessage))(message, transferrables);
};
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
const /** @type {?} */ _postMessage = {
    postMessage: ɵ0
};
/**
 * @param {?} zone
 * @return {?}
 */
export function createMessageBus(zone) {
    const /** @type {?} */ sink = new PostMessageBusSink(_postMessage);
    const /** @type {?} */ source = new PostMessageBusSource();
    const /** @type {?} */ bus = new PostMessageBus(sink, source);
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
 * \@experimental
 */
export class WorkerAppModule {
}
WorkerAppModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    BROWSER_SANITIZATION_PROVIDERS,
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
                ],
                exports: [
                    CommonModule,
                    ApplicationModule,
                ]
            },] }
];
function WorkerAppModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WorkerAppModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WorkerAppModule.ctorParameters;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsdUJBQXVCLElBQUksc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBZSxnQkFBZ0IsRUFBZ0MscUJBQXFCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hOLE9BQU8sRUFBQyxRQUFRLEVBQUUsK0JBQStCLElBQUksOEJBQThCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV0SCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBT3JFLE1BQU0sQ0FBQyx1QkFBTSxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FDbEQsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7QUFFM0YsTUFBTTtJQUNKLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztDQUMzQjtXQUtjLENBQUMsT0FBWSxFQUFFLGNBQThCLEVBQUUsRUFBRTtJQUM1RCxtQkFBTSxXQUFXLEVBQUMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDN0M7O0FBSEgsdUJBQU0sWUFBWSxHQUFHO0lBQ25CLFdBQVcsSUFFVjtDQUNGLENBQUM7Ozs7O0FBRUYsTUFBTSwyQkFBMkIsSUFBWTtJQUMzQyx1QkFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCx1QkFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0lBQzFDLHVCQUFNLEdBQUcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixPQUFPLEdBQUcsQ0FBQztDQUNaOzs7O0FBRUQsTUFBTTtJQUNKLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0NBQ2hDOzs7Ozs7QUEyQkQsTUFBTTs7O1lBcEJMLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUU7b0JBQ1QsOEJBQThCO29CQUM5QixVQUFVO29CQUNWLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO29CQUNuQywwQkFBMEI7b0JBQzFCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO29CQUN4QyxXQUFXO29CQUNYLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7b0JBQzNELEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ25FLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7aUJBQ2xFO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIMm1UExBVEZPUk1fV09SS0VSX0FQUF9JRCBhcyBQTEFURk9STV9XT1JLRVJfQVBQX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uTW9kdWxlLCBFcnJvckhhbmRsZXIsIE5nTW9kdWxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBQbGF0Zm9ybVJlZiwgUmVuZGVyZXJGYWN0b3J5MiwgUm9vdFJlbmRlcmVyLCBTdGF0aWNQcm92aWRlciwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBwbGF0Zm9ybUNvcmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVCwgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMgYXMgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9hcGknO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtQb3N0TWVzc2FnZUJ1cywgUG9zdE1lc3NhZ2VCdXNTaW5rLCBQb3N0TWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7V2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXInO1xuaW1wb3J0IHtXb3JrZXJEb21BZGFwdGVyfSBmcm9tICcuL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlcic7XG5cblxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtV29ya2VyQXBwID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgIHBsYXRmb3JtQ29yZSwgJ3dvcmtlckFwcCcsIFt7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9XT1JLRVJfQVBQX0lEfV0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCk6IEVycm9ySGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXJyb3JIYW5kbGVyKCk7XG59XG5cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IHJlbW92ZSB0aGlzIGFuZCBjb21waWxlIHdpdGggbGliLndlYndvcmtlci5kLnRzICgjMzQ5MilcbmNvbnN0IF9wb3N0TWVzc2FnZSA9IHtcbiAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlOiBhbnksIHRyYW5zZmVycmFibGVzPzogW0FycmF5QnVmZmVyXSkgPT4ge1xuICAgICg8YW55PnBvc3RNZXNzYWdlKShtZXNzYWdlLCB0cmFuc2ZlcnJhYmxlcyk7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlQnVzKHpvbmU6IE5nWm9uZSk6IE1lc3NhZ2VCdXMge1xuICBjb25zdCBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayhfcG9zdE1lc3NhZ2UpO1xuICBjb25zdCBzb3VyY2UgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTb3VyY2UoKTtcbiAgY29uc3QgYnVzID0gbmV3IFBvc3RNZXNzYWdlQnVzKHNpbmssIHNvdXJjZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG4gIHJldHVybiBidXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFdlYldvcmtlcigpOiB2b2lkIHtcbiAgV29ya2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xufVxuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSB3b3JrZXIgYXBwIHNpZGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlMsXG4gICAgU2VyaWFsaXplcixcbiAgICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZVZhbHVlOiBudWxsfSxcbiAgICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5MixcbiAgICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTJ9LFxuICAgIHtwcm92aWRlOiBPTl9XRUJfV09SS0VSLCB1c2VWYWx1ZTogdHJ1ZX0sXG4gICAgUmVuZGVyU3RvcmUsXG4gICAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sXG4gICAge3Byb3ZpZGU6IE1lc3NhZ2VCdXMsIHVzZUZhY3Rvcnk6IGNyZWF0ZU1lc3NhZ2VCdXMsIGRlcHM6IFtOZ1pvbmVdfSxcbiAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogc2V0dXBXZWJXb3JrZXIsIG11bHRpOiB0cnVlfSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBcHBsaWNhdGlvbk1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXb3JrZXJBcHBNb2R1bGUge1xufVxuIl19