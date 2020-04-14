/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/location_providers.ts
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
    {
        provide: MessageBasedPlatformLocation,
        deps: [ServiceMessageBrokerFactory, BrowserPlatformLocation, MessageBus, Serializer]
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlGLE9BQU8sRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVyRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRTdFLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQVVqRSxNQUFNLE9BQU8sNEJBQTRCLEdBQUcsbUJBQWtCO0lBQzVEO1FBQ0UsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxJQUFJLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO0tBQ3JGO0lBQ0QsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUM7SUFDcEQsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDO0NBQzNGLEVBQUE7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsUUFBa0I7SUFDeEM7OztJQUFPLEdBQUcsRUFBRTs7Y0FDSixJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBUyxNQUFNLENBQUM7UUFFekMsSUFBSSxDQUFDLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDO0lBQzVFLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1QnJvd3NlclBsYXRmb3JtTG9jYXRpb24gYXMgQnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdG9yLCBOZ1pvbmUsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcblxuaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuXG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciBpbiBhIFdvcmtlciBlbmFibGVkIGFwcGxpY2F0aW9uIHlvdSBtdXN0XG4gKiBpbmNsdWRlIHRoZXNlIHByb3ZpZGVycyB3aGVuIHNldHRpbmcgdXAgdGhlIHJlbmRlciB0aHJlYWQuXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX0xPQ0FUSU9OX1BST1ZJREVSUyA9IDxTdGF0aWNQcm92aWRlcltdPltcbiAge1xuICAgIHByb3ZpZGU6IE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24sXG4gICAgZGVwczogW1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXJdXG4gIH0sXG4gIHtwcm92aWRlOiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlRmFjdG9yeTogaW5pdFVpTG9jYXRpb24sIG11bHRpOiB0cnVlLCBkZXBzOiBbSW5qZWN0b3JdfVxuXTtcblxuZnVuY3Rpb24gaW5pdFVpTG9jYXRpb24oaW5qZWN0b3I6IEluamVjdG9yKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3Qgem9uZSA9IGluamVjdG9yLmdldDxOZ1pvbmU+KE5nWm9uZSk7XG5cbiAgICB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24pLnN0YXJ0KCkpO1xuICB9O1xufVxuIl19