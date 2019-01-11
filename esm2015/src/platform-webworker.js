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
 * \@publicApi
 * @param {?} workerScriptUri
 * @param {?=} customProviders
 * @return {?}
 */
export function bootstrapWorkerUi(workerScriptUri, customProviders = []) {
    // For now, just creates the worker ui platform...
    /** @type {?} */
    const platform = platformWorkerUi([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri },
        ...customProviders,
    ]);
    return Promise.resolve(platform);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2Vid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy9wbGF0Zm9ybS13ZWJ3b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFVQSxPQUFPLEVBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQy9ILE9BQU8sRUFBQyxVQUFVLEVBQW1DLE1BQU0sa0NBQWtDLENBQUM7QUFFOUYsT0FBTyxFQUFrQixvQkFBb0IsRUFBRSwyQkFBMkIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQy9ILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7OztBQU9qRCxNQUFNLFVBQVUsaUJBQWlCLENBQzdCLGVBQXVCLEVBQUUsa0JBQW9DLEVBQUU7OztVQUUzRCxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7UUFDaEMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUM7UUFDbkQsR0FBRyxlQUFlO0tBQ25CLENBQUM7SUFFRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybVJlZiwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1dPUktFUl9TQ1JJUFQsIHBsYXRmb3JtV29ya2VyVWl9IGZyb20gJy4vd29ya2VyX3JlbmRlcic7XG5cbmV4cG9ydCB7VkVSU0lPTn0gZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7TWVzc2FnZUJ1cywgTWVzc2FnZUJ1c1NpbmssIE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmV4cG9ydCB7U2VyaWFsaXplclR5cGVzfSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmV4cG9ydCB7UmVjZWl2ZWRNZXNzYWdlLCBTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7V09SS0VSX1VJX0xPQ0FUSU9OX1BST1ZJREVSU30gZnJvbSAnLi93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMnO1xuZXhwb3J0IHtXT1JLRVJfQVBQX0xPQ0FUSU9OX1BST1ZJREVSU30gZnJvbSAnLi93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzJztcbmV4cG9ydCB7V29ya2VyQXBwTW9kdWxlLCBwbGF0Zm9ybVdvcmtlckFwcH0gZnJvbSAnLi93b3JrZXJfYXBwJztcbmV4cG9ydCB7cGxhdGZvcm1Xb3JrZXJVaX0gZnJvbSAnLi93b3JrZXJfcmVuZGVyJztcblxuLyoqXG4gKiBCb290c3RyYXBzIHRoZSB3b3JrZXIgdWkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwV29ya2VyVWkoXG4gICAgd29ya2VyU2NyaXB0VXJpOiBzdHJpbmcsIGN1c3RvbVByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9IFtdKTogUHJvbWlzZTxQbGF0Zm9ybVJlZj4ge1xuICAvLyBGb3Igbm93LCBqdXN0IGNyZWF0ZXMgdGhlIHdvcmtlciB1aSBwbGF0Zm9ybS4uLlxuICBjb25zdCBwbGF0Zm9ybSA9IHBsYXRmb3JtV29ya2VyVWkoW1xuICAgIHtwcm92aWRlOiBXT1JLRVJfU0NSSVBULCB1c2VWYWx1ZTogd29ya2VyU2NyaXB0VXJpfSxcbiAgICAuLi5jdXN0b21Qcm92aWRlcnMsXG4gIF0pO1xuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocGxhdGZvcm0pO1xufVxuIl19