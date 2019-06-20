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
    return (/**
     * @return {?}
     */
    () => zone.runGuarded((/**
     * @return {?}
     */
    () => platformLocation.init())));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBa0IsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7QUFVOUQsTUFBTSxPQUFPLDZCQUE2QixHQUFHO0lBQzNDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQyxFQUFFO1FBQ2hFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7S0FDakM7SUFDRCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBQztDQUMzRjs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsZ0JBQTJDO0lBQzdFLE9BQU8sZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxnQkFBMkMsRUFBRSxJQUFZO0lBRXhGOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUMsRUFBQztBQUM5RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xPQ0FUSU9OX0lOSVRJQUxJWkVELCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1dlYldvcmtlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vcGxhdGZvcm1fbG9jYXRpb24nO1xuXG5cbi8qKlxuICogVGhlIHtAbGluayBQbGF0Zm9ybUxvY2F0aW9ufSBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgYWRkZWQgd2hlbiB0aGUge0BsaW5rIExvY2F0aW9ufSBpcyB1c2VkIGluXG4gKiBhIHdvcmtlciBjb250ZXh0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfQVBQX0xPQ0FUSU9OX1BST1ZJREVSUyA9IFtcbiAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSwge1xuICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBhcHBJbml0Rm5GYWN0b3J5LFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uLCBOZ1pvbmVdXG4gIH0sXG4gIHtwcm92aWRlOiBMT0NBVElPTl9JTklUSUFMSVpFRCwgdXNlRmFjdG9yeTogbG9jYXRpb25Jbml0aWFsaXplZCwgZGVwczogW1BsYXRmb3JtTG9jYXRpb25dfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0aW9uSW5pdGlhbGl6ZWQocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbikge1xuICByZXR1cm4gcGxhdGZvcm1Mb2NhdGlvbi5pbml0aWFsaXplZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcEluaXRGbkZhY3RvcnkocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiwgem9uZTogTmdab25lKTogKCkgPT5cbiAgICBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuICgpID0+IHpvbmUucnVuR3VhcmRlZCgoKSA9PiBwbGF0Zm9ybUxvY2F0aW9uLmluaXQoKSk7XG59XG4iXX0=