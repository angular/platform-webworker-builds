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
 * \@experimental WebWorker support in Angular is currenlty experimental.
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
 * \@experimental WebWorker support in Angular is currenlty experimental.
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
 * \@experimental WebWorker support in Angular is currenlty experimental.
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNLE9BQWdCLFVBQVU7Q0E4Qi9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5cbi8qKlxuICogTWVzc2FnZSBCdXMgaXMgYSBsb3cgbGV2ZWwgQVBJIHVzZWQgdG8gY29tbXVuaWNhdGUgYmV0d2VlbiB0aGUgVUkgYW5kIHRoZSBiYWNrZ3JvdW5kLlxuICogQ29tbXVuaWNhdGlvbiBpcyBiYXNlZCBvbiBhIGNoYW5uZWwgYWJzdHJhY3Rpb24uIE1lc3NhZ2VzIHB1Ymxpc2hlZCBpbiBhXG4gKiBnaXZlbiBjaGFubmVsIHRvIG9uZSBNZXNzYWdlQnVzU2luayBhcmUgcmVjZWl2ZWQgb24gdGhlIHNhbWUgY2hhbm5lbFxuICogYnkgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZUJ1c1NvdXJjZS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgY3VycmVubHR5IGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzU291cmNlLCBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXMuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIGZyb20gb3IgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIGJ1ZmZlciBtZXNzYWdlcyBhbmQgc2VuZCBvbmx5IG9uY2UgdGhlIHpvbmUgZXhpdHMuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIHNlbmQgbWVzc2FnZXMgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBhYnN0cmFjdCBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZT86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgYnVzIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2FsbGJhY2tzIGF0dGFjaGVkIHRvIGNoYW5uZWxzIHdoZXJlIHJ1bkluWm9uZSB3YXMgc2V0IHRvIHRydWUgb24gaW5pdGlhbGl6YXRpb25cbiAgICogd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGFic3RyYWN0IGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIGFic3RyYWN0IHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBjdXJyZW5sdHkgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VCdXNTb3VyY2Uge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU291cmNlLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBmcm9tIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmUuXG4gICAqL1xuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBzb3VyY2UgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCBlbWl0IGV2ZW50cyB0aGF0IHdpbGwgYmVcbiAgICogZXhlY3V0ZWQgd2l0aGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGN1cnJlbmx0eSBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUJ1c1Npbmsge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU2luay5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIHNpbmsgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCB3YWl0IGZvciB0aGUgZ2l2ZW4gem9uZVxuICAgKiB0byBleGl0IGJlZm9yZSBzZW5kaW5nIG1lc3NhZ2VzLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuIl19