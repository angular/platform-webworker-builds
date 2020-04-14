/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/worker/location_providers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LOCATION_INITIALIZED, PlatformLocation } from '@angular/common';
import { APP_INITIALIZER, NgZone } from '@angular/core';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * The {\@link PlatformLocation} providers that should be added when the {\@link Location} is used in
 * a worker context.
 *
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 * @type {?}
 */
export const WORKER_APP_LOCATION_PROVIDERS = [
    (/** @type {?} */ ((/** @type {?} */ ({ provide: PlatformLocation, useClass: WebWorkerPlatformLocation })))),
    {
        provide: APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [PlatformLocation, NgZone]
    },
    { provide: LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [PlatformLocation] }
];
/**
 * @param {?} platformLocation
 * @return {?}
 */
export function locationInitialized(platformLocation) {
    return platformLocation.initialized;
}
/**
 * @param {?} platformLocation
 * @param {?} zone
 * @return {?}
 */
export function appInitFnFactory(platformLocation, zone) {
    return (/**
     * @return {?}
     */
    () => zone.runGuarded((/**
     * @return {?}
     */
    () => platformLocation.init())));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7O0FBVTlELE1BQU0sT0FBTyw2QkFBNkIsR0FBcUI7SUFDN0QsbUJBQUEsbUJBQUEsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFDLEVBQU8sRUFBa0I7SUFBRTtRQUN6RixPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO0tBQ2pDO0lBQ0QsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Q0FDM0Y7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLGdCQUEyQztJQUM3RSxPQUFPLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsZ0JBQTJDLEVBQUUsSUFBWTtJQUV4Rjs7O0lBQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFDLEVBQUM7QUFDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMT0NBVElPTl9JTklUSUFMSVpFRCwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBOZ1pvbmUsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuXG4vKipcbiAqIFRoZSB7QGxpbmsgUGxhdGZvcm1Mb2NhdGlvbn0gcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHdoZW4gdGhlIHtAbGluayBMb2NhdGlvbn0gaXMgdXNlZCBpblxuICogYSB3b3JrZXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9MT0NBVElPTl9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLCB1c2VDbGFzczogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0gYXMgYW55IGFzIFN0YXRpY1Byb3ZpZGVyLCB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGFwcEluaXRGbkZhY3RvcnksXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW1BsYXRmb3JtTG9jYXRpb24sIE5nWm9uZV1cbiAgfSxcbiAge3Byb3ZpZGU6IExPQ0FUSU9OX0lOSVRJQUxJWkVELCB1c2VGYWN0b3J5OiBsb2NhdGlvbkluaXRpYWxpemVkLCBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbl19XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9jYXRpb25Jbml0aWFsaXplZChwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uKSB7XG4gIHJldHVybiBwbGF0Zm9ybUxvY2F0aW9uLmluaXRpYWxpemVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwSW5pdEZuRmFjdG9yeShwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uLCB6b25lOiBOZ1pvbmUpOiAoKSA9PlxuICAgIFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gKCkgPT4gem9uZS5ydW5HdWFyZGVkKCgpID0+IHBsYXRmb3JtTG9jYXRpb24uaW5pdCgpKTtcbn1cbiJdfQ==