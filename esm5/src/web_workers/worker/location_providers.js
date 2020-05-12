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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUc5RDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLElBQU0sNkJBQTZCLEdBQXFCO0lBQzdELEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBMEIsRUFBRTtRQUN6RixPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO0tBQ2pDO0lBQ0QsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Q0FDM0YsQ0FBQztBQUVGLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxnQkFBMkM7SUFDN0UsT0FBTyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7QUFDdEMsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxnQkFBMkMsRUFBRSxJQUFZO0lBRXhGLE9BQU8sY0FBTSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUF2QixDQUF1QixDQUFDLEVBQTlDLENBQThDLENBQUM7QUFDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMT0NBVElPTl9JTklUSUFMSVpFRCwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBOZ1pvbmUsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuXG4vKipcbiAqIFRoZSB7QGxpbmsgUGxhdGZvcm1Mb2NhdGlvbn0gcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHdoZW4gdGhlIHtAbGluayBMb2NhdGlvbn0gaXMgdXNlZCBpblxuICogYSB3b3JrZXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfTE9DQVRJT05fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbiwgdXNlQ2xhc3M6IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb259IGFzIGFueSBhcyBTdGF0aWNQcm92aWRlciwge1xuICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBhcHBJbml0Rm5GYWN0b3J5LFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uLCBOZ1pvbmVdXG4gIH0sXG4gIHtwcm92aWRlOiBMT0NBVElPTl9JTklUSUFMSVpFRCwgdXNlRmFjdG9yeTogbG9jYXRpb25Jbml0aWFsaXplZCwgZGVwczogW1BsYXRmb3JtTG9jYXRpb25dfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0aW9uSW5pdGlhbGl6ZWQocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbikge1xuICByZXR1cm4gcGxhdGZvcm1Mb2NhdGlvbi5pbml0aWFsaXplZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcEluaXRGbkZhY3RvcnkocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiwgem9uZTogTmdab25lKTogKCkgPT5cbiAgICBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuICgpID0+IHpvbmUucnVuR3VhcmRlZCgoKSA9PiBwbGF0Zm9ybUxvY2F0aW9uLmluaXQoKSk7XG59XG4iXX0=