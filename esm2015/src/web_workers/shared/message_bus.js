/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTSxPQUFnQixVQUFVO0NBOEIvQjs7Ozs7Ozs7Ozs7Ozs7SUFyQkMscUVBQWlFOzs7Ozs7Ozs7SUFPakUsd0RBQTBDOzs7Ozs7OztJQU0xQyxtREFBa0Q7Ozs7Ozs7O0lBT2xELGlEQUFnRDs7Ozs7OztBQU9sRCxzQ0FxQkM7Ozs7Ozs7Ozs7O0lBZEMsMkVBQXVEOzs7Ozs7OztJQU92RCw4REFBaUM7Ozs7Ozs7SUFNakMseURBQXlDOzs7Ozs7O0FBTzNDLG9DQXFCQzs7Ozs7Ozs7Ozs7SUFkQyx5RUFBdUQ7Ozs7Ozs7O0lBT3ZELDREQUFpQzs7Ozs7OztJQU1qQyxxREFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cblxuLyoqXG4gKiBNZXNzYWdlIEJ1cyBpcyBhIGxvdyBsZXZlbCBBUEkgdXNlZCB0byBjb21tdW5pY2F0ZSBiZXR3ZWVuIHRoZSBVSSBhbmQgdGhlIGJhY2tncm91bmQuXG4gKiBDb21tdW5pY2F0aW9uIGlzIGJhc2VkIG9uIGEgY2hhbm5lbCBhYnN0cmFjdGlvbi4gTWVzc2FnZXMgcHVibGlzaGVkIGluIGFcbiAqIGdpdmVuIGNoYW5uZWwgdG8gb25lIE1lc3NhZ2VCdXNTaW5rIGFyZSByZWNlaXZlZCBvbiB0aGUgc2FtZSBjaGFubmVsXG4gKiBieSB0aGUgY29ycmVzcG9uZGluZyBNZXNzYWdlQnVzU291cmNlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZXNzYWdlQnVzIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSwgTWVzc2FnZUJ1c1Npbmsge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBmcm9tIG9yIHRvIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGFuZ3VsYXIgem9uZVxuICAgKiBhbmQgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBnbG9iYWwgem9uZVxuICAgKiBhbmQgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgYWJzdHJhY3QgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU/OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIGJ1cyB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNhbGxiYWNrcyBhdHRhY2hlZCB0byBjaGFubmVscyB3aGVyZSBydW5JblpvbmUgd2FzIHNldCB0byB0cnVlIG9uIGluaXRpYWxpemF0aW9uXG4gICAqIHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIGdpdmVuIHpvbmUuXG4gICAqL1xuICBhYnN0cmFjdCBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0aGF0IGVtaXRzIGV2ZXJ5IHRpbWUgYSBtZXNzYWdlXG4gICAqIGlzIHJlY2VpdmVkIG9uIHRoZSBnaXZlbiBjaGFubmVsLlxuICAgKi9cbiAgYWJzdHJhY3QgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IGZvciB0aGUgZ2l2ZW4gY2hhbm5lbFxuICAgKiBUbyBwdWJsaXNoIG1ldGhvZHMgdG8gdGhhdCBjaGFubmVsIGp1c3QgY2FsbCBuZXh0IG9uIHRoZSByZXR1cm5lZCBlbWl0dGVyXG4gICAqL1xuICBhYnN0cmFjdCB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VCdXNTb3VyY2Uge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU291cmNlLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBmcm9tIG9uIHRoZSBjaGFubmVsLlxuICAgKiBJZiBydW5JblpvbmUgaXMgdHJ1ZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmUuXG4gICAqL1xuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBzb3VyY2UgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCBlbWl0IGV2ZW50cyB0aGF0IHdpbGwgYmVcbiAgICogZXhlY3V0ZWQgd2l0aGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTaW5rLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc2luayB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIHdhaXQgZm9yIHRoZSBnaXZlbiB6b25lXG4gICAqIHRvIGV4aXQgYmVmb3JlIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG4iXX0=