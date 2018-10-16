/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** *
 * The {\@link PlatformLocation} providers that should be added when the {\@link Location} is used in
 * a worker context.
 *
 * \@experimental
  @type {?} */
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
    return () => zone.runGuarded(() => platformLocation.init());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBa0IsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBUzlELGFBQWEsNkJBQTZCLEdBQUc7SUFDM0MsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFDLEVBQUU7UUFDaEUsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQztLQUNqQztJQUNELEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO0NBQzNGLENBQUM7Ozs7O0FBRUYsTUFBTSxVQUFVLG1CQUFtQixDQUFDLGdCQUEyQztJQUM3RSxPQUFPLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztDQUNyQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLGdCQUEyQyxFQUFFLElBQVk7SUFFeEYsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDN0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TE9DQVRJT05fSU5JVElBTElaRUQsIFBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7V2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5cblxuLyoqXG4gKiBUaGUge0BsaW5rIFBsYXRmb3JtTG9jYXRpb259IHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBhZGRlZCB3aGVuIHRoZSB7QGxpbmsgTG9jYXRpb259IGlzIHVzZWQgaW5cbiAqIGEgd29ya2VyIGNvbnRleHQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9MT0NBVElPTl9QUk9WSURFUlMgPSBbXG4gIHtwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLCB1c2VDbGFzczogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0sIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogYXBwSW5pdEZuRmFjdG9yeSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbiwgTmdab25lXVxuICB9LFxuICB7cHJvdmlkZTogTE9DQVRJT05fSU5JVElBTElaRUQsIHVzZUZhY3Rvcnk6IGxvY2F0aW9uSW5pdGlhbGl6ZWQsIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uXX1cbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGlvbkluaXRpYWxpemVkKHBsYXRmb3JtTG9jYXRpb246IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24pIHtcbiAgcmV0dXJuIHBsYXRmb3JtTG9jYXRpb24uaW5pdGlhbGl6ZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBJbml0Rm5GYWN0b3J5KHBsYXRmb3JtTG9jYXRpb246IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24sIHpvbmU6IE5nWm9uZSk6ICgpID0+XG4gICAgUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiAoKSA9PiB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gcGxhdGZvcm1Mb2NhdGlvbi5pbml0KCkpO1xufVxuIl19