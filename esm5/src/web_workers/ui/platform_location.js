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
import { Injectable } from '@angular/core';
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
var MessageBasedPlatformLocation = /** @class */ (function () {
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._platformLocation.onHashChange(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype.start = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ P = 1 /* PRIMITIVE */;
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    };
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._getLocation = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(this._platformLocation.location);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._setPathname = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) { this._platformLocation.pathname = pathname; };
    MessageBasedPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageBasedPlatformLocation.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: BrowserPlatformLocation, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return MessageBasedPlatformLocation;
}());
export { MessageBasedPlatformLocation };
function MessageBasedPlatformLocation_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MessageBasedPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MessageBasedPlatformLocation.ctorParameters;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._channelSink;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._broker;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._brokerFactory;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._platformLocation;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._serializer;
}
//# sourceMappingURL=platform_location.js.map