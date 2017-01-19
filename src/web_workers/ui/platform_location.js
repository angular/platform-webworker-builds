/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { BrowserPlatformLocation } from '../../private_import_platform-browser';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType } from '../shared/serialized_types';
import { PRIMITIVE, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
export var MessageBasedPlatformLocation = (function () {
    /**
     * @param {?} _brokerFactory
     * @param {?} _platformLocation
     * @param {?} bus
     * @param {?} _serializer
     */
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
        this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype.start = function () {
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [PRIMITIVE], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [PRIMITIVE, PRIMITIVE, PRIMITIVE], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [PRIMITIVE, PRIMITIVE, PRIMITIVE], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    };
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._getLocation = function () {
        return Promise.resolve(this._platformLocation.location);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
        var /** @type {?} */ loc = this._serializer.serialize(this._platformLocation.location, LocationType);
        var /** @type {?} */ serializedEvent = { 'type': e.type };
        this._channelSink.emit({ 'event': serializedEvent, 'location': loc });
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
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
function MessageBasedPlatformLocation_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageBasedPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {?}
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