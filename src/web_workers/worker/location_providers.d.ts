/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { InjectionToken, NgZone } from '@angular/core';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
 * a worker context.
 *
 * @experimental
 */
export declare const WORKER_APP_LOCATION_PROVIDERS: ({
    provide: typeof PlatformLocation;
    useClass: typeof WebWorkerPlatformLocation;
} | {
    provide: InjectionToken<(() => void)[]>;
    useFactory: (platformLocation: WebWorkerPlatformLocation, zone: NgZone) => () => Promise<boolean>;
    multi: boolean;
    deps: (typeof NgZone | typeof PlatformLocation)[];
} | {
    provide: InjectionToken<Promise<any>>;
    useFactory: (platformLocation: WebWorkerPlatformLocation) => Promise<any>;
    deps: typeof PlatformLocation[];
})[];
export declare function locationInitialized(platformLocation: WebWorkerPlatformLocation): Promise<any>;
export declare function appInitFnFactory(platformLocation: WebWorkerPlatformLocation, zone: NgZone): () => Promise<boolean>;
