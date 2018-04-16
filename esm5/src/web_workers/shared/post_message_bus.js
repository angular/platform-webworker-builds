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
import { EventEmitter, Injectable } from '@angular/core';
/**
 * @record
 */
export function PostMessageTarget() { }
function PostMessageTarget_tsickle_Closure_declarations() {
    /** @type {?} */
    PostMessageTarget.prototype.postMessage;
}
var PostMessageBusSink = /** @class */ (function () {
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSink.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        var _this = this;
        this._zone = zone;
        this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSink.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        var _this = this;
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new EventEmitter(false);
        var /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe(function (data) {
            var /** @type {?} */ message = { channel: channel, message: data };
            if (runInZone) {
                _this._messageBuffer.push(message);
            }
            else {
                _this._sendMessages([message]);
            }
        });
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBusSink.prototype.to = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    /**
     * @return {?}
     */
    PostMessageBusSink.prototype._handleOnEventDone = /**
     * @return {?}
     */
    function () {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    };
    /**
     * @param {?} messages
     * @return {?}
     */
    PostMessageBusSink.prototype._sendMessages = /**
     * @param {?} messages
     * @return {?}
     */
    function (messages) { this._postMessageTarget.postMessage(messages); };
    return PostMessageBusSink;
}());
export { PostMessageBusSink };
function PostMessageBusSink_tsickle_Closure_declarations() {
    /** @type {?} */
    PostMessageBusSink.prototype._zone;
    /** @type {?} */
    PostMessageBusSink.prototype._channels;
    /** @type {?} */
    PostMessageBusSink.prototype._messageBuffer;
    /** @type {?} */
    PostMessageBusSink.prototype._postMessageTarget;
}
var PostMessageBusSource = /** @class */ (function () {
    function PostMessageBusSource(eventTarget) {
        var _this = this;
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            var /** @type {?} */ workerScope = /** @type {?} */ (self);
            workerScope.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSource.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) { this._zone = zone; };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSource.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new EventEmitter(false);
        var /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBusSource.prototype.from = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    PostMessageBusSource.prototype._handleMessages = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var /** @type {?} */ messages = ev.data;
        for (var /** @type {?} */ i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    PostMessageBusSource.prototype._handleMessage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            var /** @type {?} */ channelInfo_1 = this._channels[channel];
            if (channelInfo_1.runInZone) {
                this._zone.run(function () { channelInfo_1.emitter.emit(data.message); });
            }
            else {
                channelInfo_1.emitter.emit(data.message);
            }
        }
    };
    return PostMessageBusSource;
}());
export { PostMessageBusSource };
function PostMessageBusSource_tsickle_Closure_declarations() {
    /** @type {?} */
    PostMessageBusSource.prototype._zone;
    /** @type {?} */
    PostMessageBusSource.prototype._channels;
}
/**
 * A TypeScript implementation of {\@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
var PostMessageBus = /** @class */ (function () {
    function PostMessageBus(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBus.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBus.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.from = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) { return this.source.from(channel); };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.to = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) { return this.sink.to(channel); };
    PostMessageBus.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PostMessageBus.ctorParameters = function () { return [
        { type: PostMessageBusSink, },
        { type: PostMessageBusSource, },
    ]; };
    return PostMessageBus;
}());
export { PostMessageBus };
function PostMessageBus_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PostMessageBus.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PostMessageBus.ctorParameters;
    /** @type {?} */
    PostMessageBus.prototype.sink;
    /** @type {?} */
    PostMessageBus.prototype.source;
}
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
var /**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
_Channel = /** @class */ (function () {
    function _Channel(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
    return _Channel;
}());
function _Channel_tsickle_Closure_declarations() {
    /** @type {?} */
    _Channel.prototype.emitter;
    /** @type {?} */
    _Channel.prototype.runInZone;
}
//# sourceMappingURL=post_message_bus.js.map