/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __read, __spread } from "tslib";
import { platformWorkerUi, WORKER_SCRIPT } from './worker_render';
export { VERSION } from './version';
export { ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments } from './web_workers/shared/client_message_broker';
export { MessageBus } from './web_workers/shared/message_bus';
export { ServiceMessageBroker, ServiceMessageBrokerFactory } from './web_workers/shared/service_message_broker';
export { WORKER_UI_LOCATION_PROVIDERS } from './web_workers/ui/location_providers';
export { WORKER_APP_LOCATION_PROVIDERS } from './web_workers/worker/location_providers';
export { platformWorkerApp, WorkerAppModule } from './worker_app';
export { platformWorkerUi } from './worker_render';
/**
 * Bootstraps the worker ui.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export function bootstrapWorkerUi(workerScriptUri, customProviders) {
    if (customProviders === void 0) { customProviders = []; }
    // For now, just creates the worker ui platform...
    var platform = platformWorkerUi(__spread([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri }
    ], customProviders));
    return Promise.resolve(platform);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2Vid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy9wbGF0Zm9ybS13ZWJ3b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUlILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDL0gsT0FBTyxFQUFDLFVBQVUsRUFBbUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUU5RixPQUFPLEVBQWtCLG9CQUFvQixFQUFFLDJCQUEyQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDL0gsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDakYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsZUFBdUIsRUFBRSxlQUFzQztJQUF0QyxnQ0FBQSxFQUFBLG9CQUFzQztJQUNqRSxrREFBa0Q7SUFDbEQsSUFBTSxRQUFRLEdBQUcsZ0JBQWdCO1FBQy9CLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFDO09BQ2hELGVBQWUsRUFDbEIsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtUmVmLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7cGxhdGZvcm1Xb3JrZXJVaSwgV09SS0VSX1NDUklQVH0gZnJvbSAnLi93b3JrZXJfcmVuZGVyJztcblxuZXhwb3J0IHtWRVJTSU9OfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtNZXNzYWdlQnVzLCBNZXNzYWdlQnVzU2luaywgTWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuZXhwb3J0IHtTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuZXhwb3J0IHtSZWNlaXZlZE1lc3NhZ2UsIFNlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtXT1JLRVJfVUlfTE9DQVRJT05fUFJPVklERVJTfSBmcm9tICcuL3dlYl93b3JrZXJzL3VpL2xvY2F0aW9uX3Byb3ZpZGVycyc7XG5leHBvcnQge1dPUktFUl9BUFBfTE9DQVRJT05fUFJPVklERVJTfSBmcm9tICcuL3dlYl93b3JrZXJzL3dvcmtlci9sb2NhdGlvbl9wcm92aWRlcnMnO1xuZXhwb3J0IHtwbGF0Zm9ybVdvcmtlckFwcCwgV29ya2VyQXBwTW9kdWxlfSBmcm9tICcuL3dvcmtlcl9hcHAnO1xuZXhwb3J0IHtwbGF0Zm9ybVdvcmtlclVpfSBmcm9tICcuL3dvcmtlcl9yZW5kZXInO1xuXG4vKipcbiAqIEJvb3RzdHJhcHMgdGhlIHdvcmtlciB1aS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwV29ya2VyVWkoXG4gICAgd29ya2VyU2NyaXB0VXJpOiBzdHJpbmcsIGN1c3RvbVByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9IFtdKTogUHJvbWlzZTxQbGF0Zm9ybVJlZj4ge1xuICAvLyBGb3Igbm93LCBqdXN0IGNyZWF0ZXMgdGhlIHdvcmtlciB1aSBwbGF0Zm9ybS4uLlxuICBjb25zdCBwbGF0Zm9ybSA9IHBsYXRmb3JtV29ya2VyVWkoW1xuICAgIHtwcm92aWRlOiBXT1JLRVJfU0NSSVBULCB1c2VWYWx1ZTogd29ya2VyU2NyaXB0VXJpfSxcbiAgICAuLi5jdXN0b21Qcm92aWRlcnMsXG4gIF0pO1xuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocGxhdGZvcm0pO1xufVxuIl19