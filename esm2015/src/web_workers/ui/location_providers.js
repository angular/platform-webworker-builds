/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
    return () => {
        /** @type {?} */
        const zone = injector.get(NgZone);
        zone.runGuarded(() => injector.get(MessageBasedPlatformLocation).start());
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBQyx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTlGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFN0UsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFTakUsTUFBTSxPQUFPLDRCQUE0QixHQUFHLG1CQUFrQjtJQUM1RCxFQUFDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxJQUFJLEVBQUUsQ0FBQywyQkFBMkI7WUFDeEUsdUJBQXVCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFDO0lBQ25ELEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDO0lBQ3BELEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQztDQUMzRixFQUFBOzs7OztBQUVELFNBQVMsY0FBYyxDQUFDLFFBQWtCO0lBQ3hDLE9BQU8sR0FBRyxFQUFFOztjQUNKLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFTLE1BQU0sQ0FBQztRQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdG9yLCBOZ1pvbmUsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1QnJvd3NlclBsYXRmb3JtTG9jYXRpb24gYXMgQnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbmltcG9ydCB7TWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5cblxuXG4vKipcbiAqIEEgbGlzdCBvZiB7QGxpbmsgUHJvdmlkZXJ9cy4gVG8gdXNlIHRoZSByb3V0ZXIgaW4gYSBXb3JrZXIgZW5hYmxlZCBhcHBsaWNhdGlvbiB5b3UgbXVzdFxuICogaW5jbHVkZSB0aGVzZSBwcm92aWRlcnMgd2hlbiBzZXR0aW5nIHVwIHRoZSByZW5kZXIgdGhyZWFkLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1VJX0xPQ0FUSU9OX1BST1ZJREVSUyA9IDxTdGF0aWNQcm92aWRlcltdPltcbiAge3Byb3ZpZGU6IE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24sIGRlcHM6IFtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIE1lc3NhZ2VCdXMsIFNlcmlhbGl6ZXJdfSxcbiAge3Byb3ZpZGU6IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0VWlMb2NhdGlvbiwgbXVsdGk6IHRydWUsIGRlcHM6IFtJbmplY3Rvcl19XG5dO1xuXG5mdW5jdGlvbiBpbml0VWlMb2NhdGlvbihpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCB6b25lID0gaW5qZWN0b3IuZ2V0PE5nWm9uZT4oTmdab25lKTtcblxuICAgIHpvbmUucnVuR3VhcmRlZCgoKSA9PiBpbmplY3Rvci5nZXQoTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbikuc3RhcnQoKSk7XG4gIH07XG59XG4iXX0=