/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common/index';
import { Injectable } from '@angular/core/index';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType } from '../shared/serialized_types';
import { PRIMITIVE, Serializer } from '../shared/serializer';
import { deserializeGenericEvent } from './event_deserializer';
export class WebWorkerPlatformLocation extends PlatformLocation {
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    constructor(brokerFactory, bus, _serializer) {
        super();
        this._serializer = _serializer;
        this._popStateListeners = [];
        this._hashChangeListeners = [];
        this._location = null;
        this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSource = bus.from(ROUTER_CHANNEL);
        this._channelSource.subscribe({
            next: (msg) => {
                let listeners = null;
                if (msg.hasOwnProperty('event')) {
                    const type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = this._hashChangeListeners;
                    }
                    if (listeners !== null) {
                        const e = deserializeGenericEvent(msg['event']);
                        // There was a popState or hashChange event, so the location object thas been updated
                        this._location = this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach((fn) => fn(e));
                    }
                }
            }
        });
    }
    /**
     * \@internal *
     * @return {?}
     */
    init() {
        const /** @type {?} */ args = new UiArguments('getLocation');
        const /** @type {?} */ locationPromise = this._broker.runOnService(args, LocationType);
        return locationPromise.then((val) => {
            this._location = val;
            return true;
        }, (err) => { throw new Error(err); });
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) { this._popStateListeners.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashChangeListeners.push(fn); }
    /**
     * @return {?}
     */
    get pathname() {
        if (this._location === null) {
            return null;
        }
        return this._location.pathname;
    }
    /**
     * @return {?}
     */
    get search() {
        if (this._location === null) {
            return null;
        }
        return this._location.search;
    }
    /**
     * @return {?}
     */
    get hash() {
        if (this._location === null) {
            return null;
        }
        return this._location.hash;
    }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) {
        if (this._location === null) {
            throw new Error('Attempt to set pathname before value is obtained from UI');
        }
        this._location.pathname = newPath;
        const /** @type {?} */ fnArgs = [new FnArg(newPath, PRIMITIVE)];
        const /** @type {?} */ args = new UiArguments('setPathname', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        const /** @type {?} */ fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
        const /** @type {?} */ args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        const /** @type {?} */ fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
        const /** @type {?} */ args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    forward() {
        const /** @type {?} */ args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    back() {
        const /** @type {?} */ args = new UiArguments('back');
        this._broker.runOnService(args, null);
    }
}
WebWorkerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = () => [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
];
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