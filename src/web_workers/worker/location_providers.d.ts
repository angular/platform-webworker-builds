/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, StaticProvider } from '@angular/core';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
 * a worker context.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export declare const WORKER_APP_LOCATION_PROVIDERS: StaticProvider[];
export declare function locationInitialized(platformLocation: WebWorkerPlatformLocation): Promise<any>;
export declare function appInitFnFactory(platformLocation: WebWorkerPlatformLocation, zone: NgZone): () => Promise<boolean>;
