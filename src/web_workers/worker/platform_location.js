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
import { LocationType, Serializer } from '../shared/serializer';
var WebWorkerPlatformLocation = (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = _super.call(this) || this;
        _this._serializer = _serializer;
        _this._popStateListeners = [];
        _this._hashChangeListeners = [];
        _this._location = null;
        _this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        _this._channelSource = bus.from(ROUTER_CHANNEL);
        _this._channelSource.subscribe({
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
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
                        _this._location = _this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach(function (fn) { return fn(msg['event']); });
                    }
                }
            }
        });
        _this.initialized = new Promise(function (res) { return _this.initializedResolve = res; });
        return _this;
    }
    /**
     * \@internal *
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.init = function () {
        var _this = this;
        var /** @type {?} */ args = new UiArguments('getLocation');
        return this._broker.runOnService(args, LocationType)
            .then(function (val) {
            _this._location = val;
            _this.initializedResolve();
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
        get: function () { return this._location ? this._location.pathname : null; },
        /**
         * @param {?} newPath
         * @return {?}
         */
        set: function (newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var /** @type {?} */ fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
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
        get: function () { return this._location ? this._location.search : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () { return this._location ? this._location.hash : null; },
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
        var /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
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
        var /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
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
    return WebWorkerPlatformLocation;
}(PlatformLocation));
export { WebWorkerPlatformLocation };
WebWorkerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = function () { return [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
]; };
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
    WebWorkerPlatformLocation.prototype.initialized;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype.initializedResolve;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._serializer;
}
//# sourceMappingURL=platform_location.js.map