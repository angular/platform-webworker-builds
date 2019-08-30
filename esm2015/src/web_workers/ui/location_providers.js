/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/common';
import { Injector, NgZone, PLATFORM_INITIALIZER } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { MessageBasedPlatformLocation } from './platform_location';
/**
 * A list of {\@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 * @type {?}
 */
export const WORKER_UI_LOCATION_PROVIDERS = (/** @type {?} */ ([
    { provide: MessageBasedPlatformLocation, deps: [ServiceMessageBrokerFactory,
            BrowserPlatformLocation, MessageBus, Serializer] },
    { provide: BrowserPlatformLocation, deps: [DOCUMENT] },
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
]));
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return (/**
     * @return {?}
     */
    () => {
        /** @type {?} */
        const zone = injector.get(NgZone);
        zone.runGuarded((/**
         * @return {?}
         */
        () => injector.get(MessageBasedPlatformLocation).start()));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFN0UsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7O0FBVWpFLE1BQU0sT0FBTyw0QkFBNEIsR0FBRyxtQkFBa0I7SUFDNUQsRUFBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLENBQUMsMkJBQTJCO1lBQ3hFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBQztJQUNuRCxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQztJQUNwRCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUM7Q0FDM0YsRUFBQTs7Ozs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFrQjtJQUN4Qzs7O0lBQU8sR0FBRyxFQUFFOztjQUNKLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFTLE1BQU0sQ0FBQztRQUV6QyxJQUFJLENBQUMsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUM7SUFDNUUsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiBhcyBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0b3IsIE5nWm9uZSwgUExBVEZPUk1fSU5JVElBTElaRVIsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5pbXBvcnQge01lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vcGxhdGZvcm1fbG9jYXRpb24nO1xuXG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyIGluIGEgV29ya2VyIGVuYWJsZWQgYXBwbGljYXRpb24geW91IG11c3RcbiAqIGluY2x1ZGUgdGhlc2UgcHJvdmlkZXJzIHdoZW4gc2V0dGluZyB1cCB0aGUgcmVuZGVyIHRocmVhZC5cbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfVUlfTE9DQVRJT05fUFJPVklERVJTID0gPFN0YXRpY1Byb3ZpZGVyW10+W1xuICB7cHJvdmlkZTogTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbiwgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiwgTWVzc2FnZUJ1cywgU2VyaWFsaXplcl19LFxuICB7cHJvdmlkZTogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IGluaXRVaUxvY2F0aW9uLCBtdWx0aTogdHJ1ZSwgZGVwczogW0luamVjdG9yXX1cbl07XG5cbmZ1bmN0aW9uIGluaXRVaUxvY2F0aW9uKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IHpvbmUgPSBpbmplY3Rvci5nZXQ8Tmdab25lPihOZ1pvbmUpO1xuXG4gICAgem9uZS5ydW5HdWFyZGVkKCgpID0+IGluamVjdG9yLmdldChNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uKS5zdGFydCgpKTtcbiAgfTtcbn1cbiJdfQ==