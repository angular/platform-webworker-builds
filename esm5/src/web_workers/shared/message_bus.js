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
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
var MessageBus = /** @class */ (function () {
    function MessageBus() {
    }
    return MessageBus;
}());
export { MessageBus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSDs7Ozs7Ozs7O0dBU0c7QUFDSDtJQUFBO0lBOEJBLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cblxuLyoqXG4gKiBNZXNzYWdlIEJ1cyBpcyBhIGxvdyBsZXZlbCBBUEkgdXNlZCB0byBjb21tdW5pY2F0ZSBiZXR3ZWVuIHRoZSBVSSBhbmQgdGhlIGJhY2tncm91bmQuXG4gKiBDb21tdW5pY2F0aW9uIGlzIGJhc2VkIG9uIGEgY2hhbm5lbCBhYnN0cmFjdGlvbi4gTWVzc2FnZXMgcHVibGlzaGVkIGluIGFcbiAqIGdpdmVuIGNoYW5uZWwgdG8gb25lIE1lc3NhZ2VCdXNTaW5rIGFyZSByZWNlaXZlZCBvbiB0aGUgc2FtZSBjaGFubmVsXG4gKiBieSB0aGUgY29ycmVzcG9uZGluZyBNZXNzYWdlQnVzU291cmNlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTb3VyY2UsIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1cy5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvciB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgYnVmZmVyIG1lc3NhZ2VzIGFuZCBzZW5kIG9ubHkgb25jZSB0aGUgem9uZSBleGl0cy5cbiAgICogaWYgcnVuSW5ab25lIGlzIGZhbHNlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgZ2xvYmFsIHpvbmVcbiAgICogYW5kIHRoZSBzaW5rIHdpbGwgc2VuZCBtZXNzYWdlcyBpbW1lZGlhdGVseS5cbiAgICovXG4gIGFic3RyYWN0IGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgdGhpcyBidXMgdG8gdGhlIGdpdmVuIHpvbmUuXG4gICAqIEFueSBjYWxsYmFja3MgYXR0YWNoZWQgdG8gY2hhbm5lbHMgd2hlcmUgcnVuSW5ab25lIHdhcyBzZXQgdG8gdHJ1ZSBvbiBpbml0aWFsaXphdGlvblxuICAgKiB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBnaXZlbiB6b25lLlxuICAgKi9cbiAgYWJzdHJhY3QgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gdGhhdCBlbWl0cyBldmVyeSB0aW1lIGEgbWVzc2FnZVxuICAgKiBpcyByZWNlaXZlZCBvbiB0aGUgZ2l2ZW4gY2hhbm5lbC5cbiAgICovXG4gIGFic3RyYWN0IGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG5cblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgYWJzdHJhY3QgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTb3VyY2UuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIGZyb20gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBnbG9iYWwgem9uZS5cbiAgICovXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXNzaWducyB0aGlzIHNvdXJjZSB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIGVtaXQgZXZlbnRzIHRoYXQgd2lsbCBiZVxuICAgKiBleGVjdXRlZCB3aXRoaW4gdGhlIGdpdmVuIHpvbmUuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0aGF0IGVtaXRzIGV2ZXJ5IHRpbWUgYSBtZXNzYWdlXG4gICAqIGlzIHJlY2VpdmVkIG9uIHRoZSBnaXZlbiBjaGFubmVsLlxuICAgKi9cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTaW5rLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc2luayB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIHdhaXQgZm9yIHRoZSBnaXZlbiB6b25lXG4gICAqIHRvIGV4aXQgYmVmb3JlIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG4iXX0=