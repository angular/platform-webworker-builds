/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType } from '../shared/serialized_types';
import { PRIMITIVE, Serializer } from '../shared/serializer';
import { deserializeGenericEvent } from './event_deserializer';
export var WebWorkerPlatformLocation = (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = this;
        _super.call(this);
        this._serializer = _serializer;
        this._popStateListeners = [];
        this._hashChangeListeners = [];
        this._location = null;
        this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSource = bus.from(ROUTER_CHANNEL);
        this._channelSource.subscribe({
            next: function (msg) {
                var listeners = null;
                if (msg.hasOwnProperty('event')) {
                    var type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = _this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = _this._hashChangeListeners;
                    }
                    if (listeners !== null) {
                        var e_1 = deserializeGenericEvent(msg['event']);
                        // There was a popState or hashChange event, so the location object thas been updated
                        _this._location = _this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach(function (fn) { return fn(e_1); });
                    }
                }
            }
        });
    }
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.init = function () {
        var _this = this;
        var /** @type {?} */ args = new UiArguments('getLocation');
        var /** @type {?} */ locationPromise = this._broker.runOnService(args, LocationType);
        return locationPromise.then(function (val) {
            _this._location = val;
            return true;
        }, function (err) { throw new Error(err); });
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.pathname;
        },
        /**
         * @param {?} newPath
         * @return {?}
         */
        set: function (newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var /** @type {?} */ fnArgs = [new FnArg(newPath, PRIMITIVE)];
            var /** @type {?} */ args = new UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.hash;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
        var /** @type {?} */ fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
        var /** @type {?} */ args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
        var /** @type {?} */ fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
        var /** @type {?} */ args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.forward = function () {
        var /** @type {?} */ args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.back = function () {
        var /** @type {?} */ args = new UiArguments('back');
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerPlatformLocation.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return WebWorkerPlatformLocation;
}(PlatformLocation));
function WebWorkerPlatformLocation_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WebWorkerPlatformLocation.ctorParameters;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._broker;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._popStateListeners;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._hashChangeListeners;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._location;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._channelSource;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._serializer;
}
//# sourceMappingURL=platform_location.js.map