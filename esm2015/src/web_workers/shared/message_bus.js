/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/shared/message_bus.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU0sT0FBZ0IsVUFBVTtDQThCL0I7Ozs7Ozs7Ozs7Ozs7O0lBckJDLHFFQUFpRTs7Ozs7Ozs7O0lBT2pFLHdEQUEwQzs7Ozs7Ozs7SUFNMUMsbURBQWtEOzs7Ozs7OztJQU9sRCxpREFBZ0Q7Ozs7Ozs7QUFPbEQsc0NBcUJDOzs7Ozs7Ozs7OztJQWRDLDJFQUF1RDs7Ozs7Ozs7SUFPdkQsOERBQWlDOzs7Ozs7O0lBTWpDLHlEQUF5Qzs7Ozs7OztBQU8zQyxvQ0FxQkM7Ozs7Ozs7Ozs7O0lBZEMseUVBQXVEOzs7Ozs7OztJQU92RCw0REFBaUM7Ozs7Ozs7SUFNakMscURBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5cbi8qKlxuICogTWVzc2FnZSBCdXMgaXMgYSBsb3cgbGV2ZWwgQVBJIHVzZWQgdG8gY29tbXVuaWNhdGUgYmV0d2VlbiB0aGUgVUkgYW5kIHRoZSBiYWNrZ3JvdW5kLlxuICogQ29tbXVuaWNhdGlvbiBpcyBiYXNlZCBvbiBhIGNoYW5uZWwgYWJzdHJhY3Rpb24uIE1lc3NhZ2VzIHB1Ymxpc2hlZCBpbiBhXG4gKiBnaXZlbiBjaGFubmVsIHRvIG9uZSBNZXNzYWdlQnVzU2luayBhcmUgcmVjZWl2ZWQgb24gdGhlIHNhbWUgY2hhbm5lbFxuICogYnkgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZUJ1c1NvdXJjZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTb3VyY2UsIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1cy5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvciB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGFic3RyYWN0IGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBidXMgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjYWxsYmFja3MgYXR0YWNoZWQgdG8gY2hhbm5lbHMgd2hlcmUgcnVuSW5ab25lIHdhcyBzZXQgdG8gdHJ1ZSBvbiBpbml0aWFsaXphdGlvblxuICAgKiB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYWJzdHJhY3QgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGFic3RyYWN0IGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG5cblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgYWJzdHJhY3QgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU291cmNlIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1c1NvdXJjZS5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lLlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc291cmNlIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2hhbm5lbHMgd2hpY2ggYXJlIGluaXRpYWxpemVkIHdpdGggcnVuSW5ab25lIHNldCB0byB0cnVlIHdpbGwgZW1pdCBldmVudHMgdGhhdCB3aWxsIGJlXG4gICAqIGV4ZWN1dGVkIHdpdGhpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUJ1c1Npbmsge1xuICAvKipcbiAgICogU2V0cyB1cCBhIG5ldyBjaGFubmVsIG9uIHRoZSBNZXNzYWdlQnVzU2luay5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIHNpbmsgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjaGFubmVscyB3aGljaCBhcmUgaW5pdGlhbGl6ZWQgd2l0aCBydW5JblpvbmUgc2V0IHRvIHRydWUgd2lsbCB3YWl0IGZvciB0aGUgZ2l2ZW4gem9uZVxuICAgKiB0byBleGl0IGJlZm9yZSBzZW5kaW5nIG1lc3NhZ2VzLlxuICAgKi9cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuIl19