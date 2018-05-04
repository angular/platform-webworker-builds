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
import { LOCATION_INITIALIZED, PlatformLocation } from '@angular/common';
import { APP_INITIALIZER, NgZone } from '@angular/core';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * The {\@link PlatformLocation} providers that should be added when the {\@link Location} is used in
 * a worker context.
 *
 * \@experimental
 */
export const /** @type {?} */ WORKER_APP_LOCATION_PROVIDERS = [
    { provide: PlatformLocation, useClass: WebWorkerPlatformLocation }, {
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
    return () => zone.runGuarded(() => platformLocation.init());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBa0IsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBUzlELE1BQU0sQ0FBQyx1QkFBTSw2QkFBNkIsR0FBRztJQUMzQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUMsRUFBRTtRQUNoRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO0tBQ2pDO0lBQ0QsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Q0FDM0YsQ0FBQzs7Ozs7QUFFRixNQUFNLDhCQUE4QixnQkFBMkM7SUFDN0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztDQUNyQzs7Ozs7O0FBRUQsTUFBTSwyQkFBMkIsZ0JBQTJDLEVBQUUsSUFBWTtJQUV4RixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xPQ0FUSU9OX0lOSVRJQUxJWkVELCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1dlYldvcmtlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vcGxhdGZvcm1fbG9jYXRpb24nO1xuXG5cbi8qKlxuICogVGhlIHtAbGluayBQbGF0Zm9ybUxvY2F0aW9ufSBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgYWRkZWQgd2hlbiB0aGUge0BsaW5rIExvY2F0aW9ufSBpcyB1c2VkIGluXG4gKiBhIHdvcmtlciBjb250ZXh0LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfTE9DQVRJT05fUFJPVklERVJTID0gW1xuICB7cHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbiwgdXNlQ2xhc3M6IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb259LCB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGFwcEluaXRGbkZhY3RvcnksXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW1BsYXRmb3JtTG9jYXRpb24sIE5nWm9uZV1cbiAgfSxcbiAge3Byb3ZpZGU6IExPQ0FUSU9OX0lOSVRJQUxJWkVELCB1c2VGYWN0b3J5OiBsb2NhdGlvbkluaXRpYWxpemVkLCBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbl19XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9jYXRpb25Jbml0aWFsaXplZChwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uKSB7XG4gIHJldHVybiBwbGF0Zm9ybUxvY2F0aW9uLmluaXRpYWxpemVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwSW5pdEZuRmFjdG9yeShwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uLCB6b25lOiBOZ1pvbmUpOiAoKSA9PlxuICAgIFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gKCkgPT4gem9uZS5ydW5HdWFyZGVkKCgpID0+IHBsYXRmb3JtTG9jYXRpb24uaW5pdCgpKTtcbn1cbiJdfQ==