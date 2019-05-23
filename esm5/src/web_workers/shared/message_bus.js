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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
var MessageBus = /** @class */ (function () {
    function MessageBus() {
    }
    return MessageBus;
}());
export { MessageBus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSDs7Ozs7Ozs7R0FRRztBQUNIO0lBQUE7SUE4QkEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuXG4vKipcbiAqIE1lc3NhZ2UgQnVzIGlzIGEgbG93IGxldmVsIEFQSSB1c2VkIHRvIGNvbW11bmljYXRlIGJldHdlZW4gdGhlIFVJIGFuZCB0aGUgYmFja2dyb3VuZC5cbiAqIENvbW11bmljYXRpb24gaXMgYmFzZWQgb24gYSBjaGFubmVsIGFic3RyYWN0aW9uLiBNZXNzYWdlcyBwdWJsaXNoZWQgaW4gYVxuICogZ2l2ZW4gY2hhbm5lbCB0byBvbmUgTWVzc2FnZUJ1c1NpbmsgYXJlIHJlY2VpdmVkIG9uIHRoZSBzYW1lIGNoYW5uZWxcbiAqIGJ5IHRoZSBjb3JyZXNwb25kaW5nIE1lc3NhZ2VCdXNTb3VyY2UuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzU291cmNlLCBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXMuXG4gICAqIE1VU1QgYmUgY2FsbGVkIGJlZm9yZSBjYWxsaW5nIGZyb20gb3IgdG8gb24gdGhlIGNoYW5uZWwuXG4gICAqIElmIHJ1bkluWm9uZSBpcyB0cnVlIHRoZW4gdGhlIHNvdXJjZSB3aWxsIGVtaXQgZXZlbnRzIGluc2lkZSB0aGUgYW5ndWxhciB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIGJ1ZmZlciBtZXNzYWdlcyBhbmQgc2VuZCBvbmx5IG9uY2UgdGhlIHpvbmUgZXhpdHMuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lXG4gICAqIGFuZCB0aGUgc2luayB3aWxsIHNlbmQgbWVzc2FnZXMgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBhYnN0cmFjdCBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZT86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgYnVzIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2FsbGJhY2tzIGF0dGFjaGVkIHRvIGNoYW5uZWxzIHdoZXJlIHJ1bkluWm9uZSB3YXMgc2V0IHRvIHRydWUgb24gaW5pdGlhbGl6YXRpb25cbiAgICogd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGFic3RyYWN0IGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4ge0BsaW5rIEV2ZW50RW1pdHRlcn0gZm9yIHRoZSBnaXZlbiBjaGFubmVsXG4gICAqIFRvIHB1Ymxpc2ggbWV0aG9kcyB0byB0aGF0IGNoYW5uZWwganVzdCBjYWxsIG5leHQgb24gdGhlIHJldHVybmVkIGVtaXR0ZXJcbiAgICovXG4gIGFic3RyYWN0IHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU291cmNlIHtcbiAgLyoqXG4gICAqIFNldHMgdXAgYSBuZXcgY2hhbm5lbCBvbiB0aGUgTWVzc2FnZUJ1c1NvdXJjZS5cbiAgICogTVVTVCBiZSBjYWxsZWQgYmVmb3JlIGNhbGxpbmcgZnJvbSBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlbiB0aGUgc291cmNlIHdpbGwgZW1pdCBldmVudHMgaW5zaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqIGlmIHJ1bkluWm9uZSBpcyBmYWxzZSB0aGVuIHRoZSBzb3VyY2Ugd2lsbCBlbWl0IGV2ZW50cyBpbnNpZGUgdGhlIGdsb2JhbCB6b25lLlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc291cmNlIHRvIHRoZSBnaXZlbiB6b25lLlxuICAgKiBBbnkgY2hhbm5lbHMgd2hpY2ggYXJlIGluaXRpYWxpemVkIHdpdGggcnVuSW5ab25lIHNldCB0byB0cnVlIHdpbGwgZW1pdCBldmVudHMgdGhhdCB3aWxsIGJlXG4gICAqIGV4ZWN1dGVkIHdpdGhpbiB0aGUgZ2l2ZW4gem9uZS5cbiAgICovXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRoYXQgZW1pdHMgZXZlcnkgdGltZSBhIG1lc3NhZ2VcbiAgICogaXMgcmVjZWl2ZWQgb24gdGhlIGdpdmVuIGNoYW5uZWwuXG4gICAqL1xuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+O1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQnVzU2luayB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgbmV3IGNoYW5uZWwgb24gdGhlIE1lc3NhZ2VCdXNTaW5rLlxuICAgKiBNVVNUIGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyB0byBvbiB0aGUgY2hhbm5lbC5cbiAgICogSWYgcnVuSW5ab25lIGlzIHRydWUgdGhlIHNpbmsgd2lsbCBidWZmZXIgbWVzc2FnZXMgYW5kIHNlbmQgb25seSBvbmNlIHRoZSB6b25lIGV4aXRzLlxuICAgKiBpZiBydW5JblpvbmUgaXMgZmFsc2UgdGhlIHNpbmsgd2lsbCBzZW5kIG1lc3NhZ2VzIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBc3NpZ25zIHRoaXMgc2luayB0byB0aGUgZ2l2ZW4gem9uZS5cbiAgICogQW55IGNoYW5uZWxzIHdoaWNoIGFyZSBpbml0aWFsaXplZCB3aXRoIHJ1bkluWm9uZSBzZXQgdG8gdHJ1ZSB3aWxsIHdhaXQgZm9yIHRoZSBnaXZlbiB6b25lXG4gICAqIHRvIGV4aXQgYmVmb3JlIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAqL1xuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBmb3IgdGhlIGdpdmVuIGNoYW5uZWxcbiAgICogVG8gcHVibGlzaCBtZXRob2RzIHRvIHRoYXQgY2hhbm5lbCBqdXN0IGNhbGwgbmV4dCBvbiB0aGUgcmV0dXJuZWQgZW1pdHRlclxuICAgKi9cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT47XG59XG4iXX0=