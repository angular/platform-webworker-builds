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
/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 *
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @abstract
 */
export class MessageBus {
}
function MessageBus_tsickle_Closure_declarations() {
    /**
     * Sets up a new channel on the MessageBus.
     * MUST be called before calling from or to on the channel.
     * If runInZone is true then the source will emit events inside the angular zone
     * and the sink will buffer messages and send only once the zone exits.
     * if runInZone is false then the source will emit events inside the global zone
     * and the sink will send messages immediately.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    MessageBus.prototype.initChannel = function (channel, runInZone) { };
    /**
     * Assigns this bus to the given zone.
     * Any callbacks attached to channels where runInZone was set to true on initialization
     * will be executed in the given zone.
     * @abstract
     * @param {?} zone
     * @return {?}
     */
    MessageBus.prototype.attachToZone = function (zone) { };
    /**
     * Returns an {\@link EventEmitter} that emits every time a message
     * is received on the given channel.
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    MessageBus.prototype.from = function (channel) { };
    /**
     * Returns an {\@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    MessageBus.prototype.to = function (channel) { };
}
/**
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @record
 */
export function MessageBusSource() { }
function MessageBusSource_tsickle_Closure_declarations() {
    /**
     * Sets up a new channel on the MessageBusSource.
     * MUST be called before calling from on the channel.
     * If runInZone is true then the source will emit events inside the angular zone.
     * if runInZone is false then the source will emit events inside the global zone.
     * @type {?}
     */
    MessageBusSource.prototype.initChannel;
    /**
     * Assigns this source to the given zone.
     * Any channels which are initialized with runInZone set to true will emit events that will be
     * executed within the given zone.
     * @type {?}
     */
    MessageBusSource.prototype.attachToZone;
    /**
     * Returns an {\@link EventEmitter} that emits every time a message
     * is received on the given channel.
     * @type {?}
     */
    MessageBusSource.prototype.from;
}
/**
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @record
 */
export function MessageBusSink() { }
function MessageBusSink_tsickle_Closure_declarations() {
    /**
     * Sets up a new channel on the MessageBusSink.
     * MUST be called before calling to on the channel.
     * If runInZone is true the sink will buffer messages and send only once the zone exits.
     * if runInZone is false the sink will send messages immediately.
     * @type {?}
     */
    MessageBusSink.prototype.initChannel;
    /**
     * Assigns this sink to the given zone.
     * Any channels which are initialized with runInZone set to true will wait for the given zone
     * to exit before sending messages.
     * @type {?}
     */
    MessageBusSink.prototype.attachToZone;
    /**
     * Returns an {\@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     * @type {?}
     */
    MessageBusSink.prototype.to;
}
//# sourceMappingURL=message_bus.js.map