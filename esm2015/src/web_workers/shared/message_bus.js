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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNLE9BQWdCLFVBQVU7Q0E4Qi9COzs7Ozs7Ozs7Ozs7OztJQXJCQyxxRUFBaUU7Ozs7Ozs7OztJQU9qRSx3REFBMEM7Ozs7Ozs7O0lBTTFDLG1EQUFrRDs7Ozs7Ozs7SUFPbEQsaURBQWdEOzs7Ozs7QUFNbEQsc0NBcUJDOzs7Ozs7Ozs7OztJQWRDLDJFQUF1RDs7Ozs7Ozs7SUFPdkQsOERBQWlDOzs7Ozs7O0lBTWpDLHlEQUF5Qzs7Ozs7O0FBTTNDLG9DQXFCQzs7Ozs7Ozs7Ozs7SUFkQyx5RUFBdUQ7Ozs7Ozs7O0lBT3ZELDREQUFpQzs7Ozs7OztJQU1qQyxxREFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cblxuLyoqXG4gKiBNZXNzYWdlIEJ1cyBpcyBhIGxvdyBsZXZlbCBBUEkgdXNlZCB0byBjb21tdW5pY2F0ZSBiZXR3ZWVuIHRoZSBVSSBhbmQgdGhlIGJhY2tncm91bmQuXG4gKiBDb21tdW5pY2F0aW9uIGlzIGJhc2VkIG9uIGEgY2hhbm5lbCBhYnN0cmFjdGlvbi4gTWVzc2FnZXMgcHVibGlzaGVkIGluIGFcbiAqIGdpdmVuIGNoYW5uZWwgdG8gb25lIE1lc3NhZ2VCdXNTaW5rIGFyZSByZWNlaXZlZCBvbiB0aGUgc2FtZSBjaGFubmVsXG4gKiBieSB0aGUgY29ycmVzcG9uZGluZyBNZXNzYWdlQnVzU291cmNlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzU291cmNlLCBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXMuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIGZyb20gb3IgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIGJ1ZmZlciBtZXNzYWdlcyBhbmQgc2VuZCBvbmx5IG9uY2UgdGhlIHpvbmUgZXhpdHMuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIHNlbmQgbWVzc2FnZXMgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBhYnN0cmFjdCBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZT86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgYnVzIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2FsbGJhY2tzIGF0dGFjaGVkIHRvIGNoYW5uZWxzIHdoZXJlIHJ1bkluWm9uZSB3YXMgc2V0IHRvIHRydWUgb24gaW5pdGlhbGl6YXRpb25cbiAgICogd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGFic3RyYWN0IGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIGFic3RyYWN0IHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU291cmNlIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1c1NvdXJjZS5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lLlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc291cmNlIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2hhbm5lbHMgd2hpY2ggYXJlIGluaXRpYWxpemVkIHdpdGggcnVuSW5ab25lIHNldCB0byB0cnVlIHdpbGwgZW1pdCBldmVudHMgdGhhdCB3aWxsIGJlXG4gICAqIGV4ZWN1dGVkIHdpdGhpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTaW5rLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc2luayB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIHdhaXQgZm9yIHRoZSBnaXZlbiB6b25lXG4gICAqIHRvIGV4aXQgYmVmb3JlIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG4iXX0=