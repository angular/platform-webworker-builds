/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { WORKER_SCRIPT, platformWorkerUi } from './worker_render';
export { VERSION } from './version';
export { ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments } from './web_workers/shared/client_message_broker';
export { MessageBus } from './web_workers/shared/message_bus';
export { ServiceMessageBroker, ServiceMessageBrokerFactory } from './web_workers/shared/service_message_broker';
export { WORKER_UI_LOCATION_PROVIDERS } from './web_workers/ui/location_providers';
export { WORKER_APP_LOCATION_PROVIDERS } from './web_workers/worker/location_providers';
export { WorkerAppModule, platformWorkerApp } from './worker_app';
export { platformWorkerUi } from './worker_render';
/**
 * Bootstraps the worker ui.
 *
 * @publicApi
 */
export function bootstrapWorkerUi(workerScriptUri, customProviders) {
    if (customProviders === void 0) { customProviders = []; }
    // For now, just creates the worker ui platform...
    var platform = platformWorkerUi(tslib_1.__spread([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri }
    ], customProviders));
    return Promise.resolve(platform);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2Vid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy9wbGF0Zm9ybS13ZWJ3b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUlILE9BQU8sRUFBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDL0gsT0FBTyxFQUFDLFVBQVUsRUFBbUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUU5RixPQUFPLEVBQWtCLG9CQUFvQixFQUFFLDJCQUEyQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDL0gsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDakYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUM3QixlQUF1QixFQUFFLGVBQXNDO0lBQXRDLGdDQUFBLEVBQUEsb0JBQXNDO0lBQ2pFLGtEQUFrRDtJQUNsRCxJQUFNLFFBQVEsR0FBRyxnQkFBZ0I7UUFDL0IsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUM7T0FDaEQsZUFBZSxFQUNsQixDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXT1JLRVJfU0NSSVBULCBwbGF0Zm9ybVdvcmtlclVpfSBmcm9tICcuL3dvcmtlcl9yZW5kZXInO1xuXG5leHBvcnQge1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge01lc3NhZ2VCdXMsIE1lc3NhZ2VCdXNTaW5rLCBNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5leHBvcnQge1NlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5leHBvcnQge1JlY2VpdmVkTWVzc2FnZSwgU2VydmljZU1lc3NhZ2VCcm9rZXIsIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1dPUktFUl9VSV9MT0NBVElPTl9QUk9WSURFUlN9IGZyb20gJy4vd2ViX3dvcmtlcnMvdWkvbG9jYXRpb25fcHJvdmlkZXJzJztcbmV4cG9ydCB7V09SS0VSX0FQUF9MT0NBVElPTl9QUk9WSURFUlN9IGZyb20gJy4vd2ViX3dvcmtlcnMvd29ya2VyL2xvY2F0aW9uX3Byb3ZpZGVycyc7XG5leHBvcnQge1dvcmtlckFwcE1vZHVsZSwgcGxhdGZvcm1Xb3JrZXJBcHB9IGZyb20gJy4vd29ya2VyX2FwcCc7XG5leHBvcnQge3BsYXRmb3JtV29ya2VyVWl9IGZyb20gJy4vd29ya2VyX3JlbmRlcic7XG5cbi8qKlxuICogQm9vdHN0cmFwcyB0aGUgd29ya2VyIHVpLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcFdvcmtlclVpKFxuICAgIHdvcmtlclNjcmlwdFVyaTogc3RyaW5nLCBjdXN0b21Qcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXSk6IFByb21pc2U8UGxhdGZvcm1SZWY+IHtcbiAgLy8gRm9yIG5vdywganVzdCBjcmVhdGVzIHRoZSB3b3JrZXIgdWkgcGxhdGZvcm0uLi5cbiAgY29uc3QgcGxhdGZvcm0gPSBwbGF0Zm9ybVdvcmtlclVpKFtcbiAgICB7cHJvdmlkZTogV09SS0VSX1NDUklQVCwgdXNlVmFsdWU6IHdvcmtlclNjcmlwdFVyaX0sXG4gICAgLi4uY3VzdG9tUHJvdmlkZXJzLFxuICBdKTtcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBsYXRmb3JtKTtcbn1cbiJdfQ==