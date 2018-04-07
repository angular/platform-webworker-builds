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
 * \@experimental
 */
export var /** @type {?} */ WORKER_UI_LOCATION_PROVIDERS = /** @type {?} */ ([
    { provide: MessageBasedPlatformLocation, deps: [ServiceMessageBrokerFactory,
            BrowserPlatformLocation, MessageBus, Serializer] },
    { provide: BrowserPlatformLocation, deps: [DOCUMENT] },
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
]);
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return function () {
        var /** @type {?} */ zone = injector.get(NgZone);
        zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=location_providers.js.map