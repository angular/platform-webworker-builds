/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * \@publicApi
 * @abstract
 */
export class MessageBus {
}
if (false) {
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
 * \@publicApi
 * @record
 */
export function MessageBusSource() { }
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
/**
 * \@publicApi
 * @record
 */
export function MessageBusSink() { }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNLE9BQWdCLFVBQVU7Q0E4Qi9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5cbi8qKlxuICogTWVzc2FnZSBCdXMgaXMgYSBsb3cgbGV2ZWwgQVBJIHVzZWQgdG8gY29tbXVuaWNhdGUgYmV0d2VlbiB0aGUgVUkgYW5kIHRoZSBiYWNrZ3JvdW5kLlxuICogQ29tbXVuaWNhdGlvbiBpcyBiYXNlZCBvbiBhIGNoYW5uZWwgYWJzdHJhY3Rpb24uIE1lc3NhZ2VzIHB1Ymxpc2hlZCBpbiBhXG4gKiBnaXZlbiBjaGFubmVsIHRvIG9uZSBNZXNzYWdlQnVzU2luayBhcmUgcmVjZWl2ZWQgb24gdGhlIHNhbWUgY2hhbm5lbFxuICogYnkgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZUJ1c1NvdXJjZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZXNzYWdlQnVzIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSwgTWVzc2FnZUJ1c1Npbmsge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBmcm9tIG9yIHRvIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGFuZ3VsYXIgem9uZVxuICAgKiBhbmQgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBnbG9iYWwgem9uZVxuICAgKiBhbmQgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgYWJzdHJhY3QgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU/OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIGJ1cyB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNhbGxiYWNrcyBhdHRhY2hlZCB0byBjaGFubmVscyB3aGVyZSBydW5JblpvbmUgd2FzIHNldCB0byB0cnVlIG9uIGluaXRpYWxpemF0aW9uXG4gICAqIHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIGdpdmVuIHpvbmUuXG4gICAqL1xuICBhYnN0cmFjdCBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0aGF0IGVtaXRzIGV2ZXJ5IHRpbWUgYSBtZXNzYWdlXG4gICAqIGlzIHJlY2VpdmVkIG9uIHRoZSBnaXZlbiBjaGFubmVsLlxuICAgKi9cbiAgYWJzdHJhY3QgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IGZvciB0aGUgZ2l2ZW4gY2hhbm5lbFxuICAgKiBUbyBwdWJsaXNoIG1ldGhvZHMgdG8gdGhhdCBjaGFubmVsIGp1c3QgY2FsbCBuZXh0IG9uIHRoZSByZXR1cm5lZCBlbWl0dGVyXG4gICAqL1xuICBhYnN0cmFjdCB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTb3VyY2UuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIGZyb20gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBnbG9iYWwgem9uZS5cbiAgICovXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIHNvdXJjZSB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIGVtaXQgZXZlbnRzIHRoYXQgd2lsbCBiZVxuICAgKiBleGVjdXRlZCB3aXRoaW4gdGhlIGdpdmVuIHpvbmUuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0aGF0IGVtaXRzIGV2ZXJ5IHRpbWUgYSBtZXNzYWdlXG4gICAqIGlzIHJlY2VpdmVkIG9uIHRoZSBnaXZlbiBjaGFubmVsLlxuICAgKi9cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUJ1c1Npbmsge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU2luay5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIHNpbmsgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCB3YWl0IGZvciB0aGUgZ2l2ZW4gem9uZVxuICAgKiB0byBleGl0IGJlZm9yZSBzZW5kaW5nIG1lc3NhZ2VzLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuIl19