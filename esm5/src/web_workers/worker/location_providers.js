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
 * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
 * a worker context.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export var WORKER_APP_LOCATION_PROVIDERS = [
    { provide: PlatformLocation, useClass: WebWorkerPlatformLocation }, {
        provide: APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [PlatformLocation, NgZone]
    },
    { provide: LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [PlatformLocation] }
];
export function locationInitialized(platformLocation) {
    return platformLocation.initialized;
}
export function appInitFnFactory(platformLocation, zone) {
    return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxlQUFlLEVBQWtCLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUc5RDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBRztJQUMzQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUMsRUFBRTtRQUNoRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO0tBQ2pDO0lBQ0QsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Q0FDM0YsQ0FBQztBQUVGLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxnQkFBMkM7SUFDN0UsT0FBTyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7QUFDdEMsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxnQkFBMkMsRUFBRSxJQUFZO0lBRXhGLE9BQU8sY0FBTSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUF2QixDQUF1QixDQUFDLEVBQTlDLENBQThDLENBQUM7QUFDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMT0NBVElPTl9JTklUSUFMSVpFRCwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuXG4vKipcbiAqIFRoZSB7QGxpbmsgUGxhdGZvcm1Mb2NhdGlvbn0gcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHdoZW4gdGhlIHtAbGluayBMb2NhdGlvbn0gaXMgdXNlZCBpblxuICogYSB3b3JrZXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9MT0NBVElPTl9QUk9WSURFUlMgPSBbXG4gIHtwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLCB1c2VDbGFzczogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0sIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogYXBwSW5pdEZuRmFjdG9yeSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbiwgTmdab25lXVxuICB9LFxuICB7cHJvdmlkZTogTE9DQVRJT05fSU5JVElBTElaRUQsIHVzZUZhY3Rvcnk6IGxvY2F0aW9uSW5pdGlhbGl6ZWQsIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uXX1cbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGlvbkluaXRpYWxpemVkKHBsYXRmb3JtTG9jYXRpb246IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24pIHtcbiAgcmV0dXJuIHBsYXRmb3JtTG9jYXRpb24uaW5pdGlhbGl6ZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBJbml0Rm5GYWN0b3J5KHBsYXRmb3JtTG9jYXRpb246IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24sIHpvbmU6IE5nWm9uZSk6ICgpID0+XG4gICAgUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiAoKSA9PiB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gcGxhdGZvcm1Mb2NhdGlvbi5pbml0KCkpO1xufVxuIl19