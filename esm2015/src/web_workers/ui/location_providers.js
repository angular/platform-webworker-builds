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
import { DOCUMENT } from '@angular/common';
import { Injector, NgZone, PLATFORM_INITIALIZER } from '@angular/core';
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBQyx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTlGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFN0UsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7O0FBVWpFLE1BQU0sT0FBTyw0QkFBNEIsR0FBRyxtQkFBa0I7SUFDNUQsRUFBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLENBQUMsMkJBQTJCO1lBQ3hFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBQztJQUNuRCxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQztJQUNwRCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUM7Q0FDM0YsRUFBQTs7Ozs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFrQjtJQUN4Qzs7O0lBQU8sR0FBRyxFQUFFOztjQUNKLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFTLE1BQU0sQ0FBQztRQUV6QyxJQUFJLENBQUMsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUM7SUFDNUUsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0b3IsIE5nWm9uZSwgUExBVEZPUk1fSU5JVElBTElaRVIsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiBhcyBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcblxuaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuXG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciBpbiBhIFdvcmtlciBlbmFibGVkIGFwcGxpY2F0aW9uIHlvdSBtdXN0XG4gKiBpbmNsdWRlIHRoZXNlIHByb3ZpZGVycyB3aGVuIHNldHRpbmcgdXAgdGhlIHJlbmRlciB0aHJlYWQuXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX0xPQ0FUSU9OX1BST1ZJREVSUyA9IDxTdGF0aWNQcm92aWRlcltdPltcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24sIGRlcHM6IFtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXJdfSxcbiAge3Byb3ZpZGU6IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0VWlMb2NhdGlvbiwgbXVsdGk6IHRydWUsIGRlcHM6IFtJbmplY3Rvcl19XG5dO1xuXG5mdW5jdGlvbiBpbml0VWlMb2NhdGlvbihpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCB6b25lID0gaW5qZWN0b3IuZ2V0PE5nWm9uZT4oTmdab25lKTtcblxuICAgIHpvbmUucnVuR3VhcmRlZCgoKSA9PiBpbmplY3Rvci5nZXQoTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbikuc3RhcnQoKSk7XG4gIH07XG59XG4iXX0=