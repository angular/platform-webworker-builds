/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
if (false) {
    /**
     * Sets up a new channel on the MessageBusSource.
     * MUST be called before calling from on the channel.
     * If runInZone is true then the source will emit events inside the angular zone.
     * if runInZone is false then the source will emit events inside the global zone.
     * @param {?} channel
     * @param {?} runInZone
     * @return {?}
     */
    MessageBusSource.prototype.initChannel = function (channel, runInZone) { };
    /**
     * Assigns this source to the given zone.
     * Any channels which are initialized with runInZone set to true will emit events that will be
     * executed within the given zone.
     * @param {?} zone
     * @return {?}
     */
    MessageBusSource.prototype.attachToZone = function (zone) { };
    /**
     * Returns an {\@link EventEmitter} that emits every time a message
     * is received on the given channel.
     * @param {?} channel
     * @return {?}
     */
    MessageBusSource.prototype.from = function (channel) { };
}
/**
 * \@publicApi
 * @record
 */
export function MessageBusSink() { }
if (false) {
    /**
     * Sets up a new channel on the MessageBusSink.
     * MUST be called before calling to on the channel.
     * If runInZone is true the sink will buffer messages and send only once the zone exits.
     * if runInZone is false the sink will send messages immediately.
     * @param {?} channel
     * @param {?} runInZone
     * @return {?}
     */
    MessageBusSink.prototype.initChannel = function (channel, runInZone) { };
    /**
     * Assigns this sink to the given zone.
     * Any channels which are initialized with runInZone set to true will wait for the given zone
     * to exit before sending messages.
     * @param {?} zone
     * @return {?}
     */
    MessageBusSink.prototype.attachToZone = function (zone) { };
    /**
     * Returns an {\@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     * @param {?} channel
     * @return {?}
     */
    MessageBusSink.prototype.to = function (channel) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTSxPQUFnQixVQUFVO0NBOEIvQjs7Ozs7Ozs7Ozs7Ozs7SUFyQkMscUVBQWlFOzs7Ozs7Ozs7SUFPakUsd0RBQTBDOzs7Ozs7OztJQU0xQyxtREFBa0Q7Ozs7Ozs7O0lBT2xELGlEQUFnRDs7Ozs7O0FBTWxELHNDQXFCQzs7Ozs7Ozs7Ozs7SUFkQywyRUFBdUQ7Ozs7Ozs7O0lBT3ZELDhEQUFpQzs7Ozs7OztJQU1qQyx5REFBeUM7Ozs7OztBQU0zQyxvQ0FxQkM7Ozs7Ozs7Ozs7O0lBZEMseUVBQXVEOzs7Ozs7OztJQU92RCw0REFBaUM7Ozs7Ozs7SUFNakMscURBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5cbi8qKlxuICogTWVzc2FnZSBCdXMgaXMgYSBsb3cgbGV2ZWwgQVBJIHVzZWQgdG8gY29tbXVuaWNhdGUgYmV0d2VlbiB0aGUgVUkgYW5kIHRoZSBiYWNrZ3JvdW5kLlxuICogQ29tbXVuaWNhdGlvbiBpcyBiYXNlZCBvbiBhIGNoYW5uZWwgYWJzdHJhY3Rpb24uIE1lc3NhZ2VzIHB1Ymxpc2hlZCBpbiBhXG4gKiBnaXZlbiBjaGFubmVsIHRvIG9uZSBNZXNzYWdlQnVzU2luayBhcmUgcmVjZWl2ZWQgb24gdGhlIHNhbWUgY2hhbm5lbFxuICogYnkgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZUJ1c1NvdXJjZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTb3VyY2UsIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1cy5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvciB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGFic3RyYWN0IGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBidXMgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjYWxsYmFja3MgYXR0YWNoZWQgdG8gY2hhbm5lbHMgd2hlcmUgcnVuSW5ab25lIHdhcyBzZXQgdG8gdHJ1ZSBvbiBpbml0aWFsaXphdGlvblxuICAgKiB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYWJzdHJhY3QgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGFic3RyYWN0IGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG5cblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgYWJzdHJhY3QgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VCdXNTb3VyY2Uge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU291cmNlLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBmcm9tIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmUuXG4gICAqL1xuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBzb3VyY2UgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCBlbWl0IGV2ZW50cyB0aGF0IHdpbGwgYmVcbiAgICogZXhlY3V0ZWQgd2l0aGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1c1NpbmsuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIHRvIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGUgc2luayB3aWxsIGJ1ZmZlciBtZXNzYWdlcyBhbmQgc2VuZCBvbmx5IG9uY2UgdGhlIHpvbmUgZXhpdHMuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGUgc2luayB3aWxsIHNlbmQgbWVzc2FnZXMgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBzaW5rIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2hhbm5lbHMgd2hpY2ggYXJlIGluaXRpYWxpemVkIHdpdGggcnVuSW5ab25lIHNldCB0byB0cnVlIHdpbGwgd2FpdCBmb3IgdGhlIGdpdmVuIHpvbmVcbiAgICogdG8gZXhpdCBiZWZvcmUgc2VuZGluZyBtZXNzYWdlcy5cbiAgICovXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IGZvciB0aGUgZ2l2ZW4gY2hhbm5lbFxuICAgKiBUbyBwdWJsaXNoIG1ldGhvZHMgdG8gdGhhdCBjaGFubmVsIGp1c3QgY2FsbCBuZXh0IG9uIHRoZSByZXR1cm5lZCBlbWl0dGVyXG4gICAqL1xuICB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cbiJdfQ==