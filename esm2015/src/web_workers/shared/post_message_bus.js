/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/shared/post_message_bus.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @record
 */
export function PostMessageTarget() { }
if (false) {
    /** @type {?} */
    PostMessageTarget.prototype.postMessage;
}
export class PostMessageBusSink {
    /**
     * @param {?} _postMessageTarget
     */
    constructor(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) {
        this._zone = zone;
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => { this._zone.onStable.subscribe({ next: (/**
             * @return {?}
             */
            () => { this._handleOnEventDone(); }) }); }));
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        /** @type {?} */
        const emitter = new EventEmitter(false);
        /** @type {?} */
        const channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const message = { channel: channel, message: data };
            if (runInZone) {
                this._messageBuffer.push(message);
            }
            else {
                this._sendMessages([message]);
            }
        }));
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    to(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _handleOnEventDone() {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    }
    /**
     * @private
     * @param {?} messages
     * @return {?}
     */
    _sendMessages(messages) { this._postMessageTarget.postMessage(messages); }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSink.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSink.prototype._channels;
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSink.prototype._messageBuffer;
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSink.prototype._postMessageTarget;
}
export class PostMessageBusSource {
    /**
     * @param {?=} eventTarget
     */
    constructor(eventTarget) {
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', (/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => this._handleMessages(ev)));
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            /** @type {?} */
            const workerScope = (/** @type {?} */ (self));
            workerScope.addEventListener('message', (/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => this._handleMessages(ev)));
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) { this._zone = zone; }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        /** @type {?} */
        const emitter = new EventEmitter(false);
        /** @type {?} */
        const channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    from(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handleMessages(ev) {
        /** @type {?} */
        const messages = ev.data;
        for (let i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    _handleMessage(data) {
        /** @type {?} */
        const channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            /** @type {?} */
            const channelInfo = this._channels[channel];
            if (channelInfo.runInZone) {
                this._zone.run((/**
                 * @return {?}
                 */
                () => { channelInfo.emitter.emit(data.message); }));
            }
            else {
                channelInfo.emitter.emit(data.message);
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSource.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    PostMessageBusSource.prototype._channels;
}
/**
 * A TypeScript implementation of {\@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
export class PostMessageBus {
    /**
     * @param {?} sink
     * @param {?} source
     */
    constructor(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    from(channel) { return this.source.from(channel); }
    /**
     * @param {?} channel
     * @return {?}
     */
    to(channel) { return this.sink.to(channel); }
}
PostMessageBus.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PostMessageBus.ctorParameters = () => [
    { type: PostMessageBusSink },
    { type: PostMessageBusSource }
];
/** @nocollapse */ PostMessageBus.ɵfac = function PostMessageBus_Factory(t) { return new (t || PostMessageBus)(i0.ɵɵinject(PostMessageBusSink), i0.ɵɵinject(PostMessageBusSource)); };
/** @nocollapse */ PostMessageBus.ɵprov = i0.ɵɵdefineInjectable({ token: PostMessageBus, factory: PostMessageBus.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PostMessageBus, [{
        type: Injectable
    }], function () { return [{ type: PostMessageBusSink }, { type: PostMessageBusSource }]; }, null); })();
if (false) {
    /** @type {?} */
    PostMessageBus.prototype.sink;
    /** @type {?} */
    PostMessageBus.prototype.source;
}
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
class _Channel {
    /**
     * @param {?} emitter
     * @param {?} runInZone
     */
    constructor(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
}
if (false) {
    /** @type {?} */
    _Channel.prototype.emitter;
    /** @type {?} */
    _Channel.prototype.runInZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0FBTy9ELHVDQUVDOzs7SUFEQyx3Q0FBK0Q7O0FBR2pFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFIakQsY0FBUyxHQUE4QixFQUFFLENBQUM7UUFDMUMsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO0lBRWlCLENBQUM7Ozs7O0lBRTdELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7UUFDeEIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSTs7O1lBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUM5RixDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBZSxFQUFFLFlBQXFCLElBQUk7UUFDcEQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsT0FBTywrQkFBK0IsQ0FBQyxDQUFDO1NBQzVEOztjQUVLLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7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WSxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBZSxJQUF1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUUsRUFBRSxDQUFDLE9BQWUsSUFBdUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQWhCekUsVUFBVTs7OztZQUVnQixrQkFBa0I7WUFBaUIsb0JBQW9COzs0RUFEckUsY0FBYyxjQUNBLGtCQUFrQixlQUFpQixvQkFBb0I7c0RBRHJFLGNBQWMsV0FBZCxjQUFjO2tEQUFkLGNBQWM7Y0FEMUIsVUFBVTtzQ0FFZ0Isa0JBQWtCLFlBQWlCLG9CQUFvQjs7O0lBQXBFLDhCQUErQjs7SUFBRSxnQ0FBbUM7Ozs7OztBQXFCbEYsTUFBTSxRQUFROzs7OztJQUNaLFlBQW1CLE9BQTBCLEVBQVMsU0FBa0I7UUFBckQsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFTO0lBQUcsQ0FBQztDQUM3RTs7O0lBRGEsMkJBQWlDOztJQUFFLDZCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWVzc2FnZUJ1cywgTWVzc2FnZUJ1c1NpbmssIE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vbWVzc2FnZV9idXMnO1xuXG5cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IFJlcGxhY2UgdGhpcyB3aXRoIHRoZSBkZWZpbml0aW9uIGluIGxpYi53ZWJ3b3JrZXIuZC50cygjMzQ5MilcbmV4cG9ydCBpbnRlcmZhY2UgUG9zdE1lc3NhZ2VUYXJnZXQge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXI/OiBbVHJhbnNmZXJhYmxlXSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU2luayBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3pvbmUgITogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IHt9O1xuICBwcml2YXRlIF9tZXNzYWdlQnVmZmVyOiBBcnJheTxPYmplY3Q+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9zdE1lc3NhZ2VUYXJnZXQ6IFBvc3RNZXNzYWdlVGFyZ2V0KSB7fVxuXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkIHtcbiAgICB0aGlzLl96b25lID0gem9uZTtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PiB7IHRoaXMuX3pvbmUub25TdGFibGUuc3Vic2NyaWJlKHtuZXh0OiAoKSA9PiB7IHRoaXMuX2hhbmRsZU9uRXZlbnREb25lKCk7IH19KTsgfSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gbmV3IF9DaGFubmVsKGVtaXR0ZXIsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gPSBjaGFubmVsSW5mbztcbiAgICBlbWl0dGVyLnN1YnNjcmliZSgoZGF0YTogT2JqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0ge2NoYW5uZWw6IGNoYW5uZWwsIG1lc3NhZ2U6IGRhdGF9O1xuICAgICAgaWYgKHJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZXMoW21lc3NhZ2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5lbWl0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaXMgbm90IHNldCB1cC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBpbml0Q2hhbm5lbD9gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVPbkV2ZW50RG9uZSgpIHtcbiAgICBpZiAodGhpcy5fbWVzc2FnZUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZXModGhpcy5fbWVzc2FnZUJ1ZmZlcik7XG4gICAgICB0aGlzLl9tZXNzYWdlQnVmZmVyID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2VuZE1lc3NhZ2VzKG1lc3NhZ2VzOiBBcnJheTxPYmplY3Q+KSB7IHRoaXMuX3Bvc3RNZXNzYWdlVGFyZ2V0LnBvc3RNZXNzYWdlKG1lc3NhZ2VzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXNTb3VyY2UgaW1wbGVtZW50cyBNZXNzYWdlQnVzU291cmNlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3pvbmUgITogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50VGFyZ2V0PzogRXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gZXZlbnRUYXJnZXQgaXMgZ2l2ZW4gd2UgYXNzdW1lIHdlJ3JlIGluIGEgV2ViV29ya2VyIGFuZCBsaXN0ZW4gb24gdGhlIGdsb2JhbCBzY29wZVxuICAgICAgY29uc3Qgd29ya2VyU2NvcGUgPSA8RXZlbnRUYXJnZXQ+c2VsZjtcbiAgICAgIHdvcmtlclNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKSB7IHRoaXMuX3pvbmUgPSB6b25lOyB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICBjb25zdCBjaGFubmVsSW5mbyA9IG5ldyBfQ2hhbm5lbChlbWl0dGVyLCBydW5JblpvbmUpO1xuICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0gY2hhbm5lbEluZm87XG4gIH1cblxuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5lbWl0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaXMgbm90IHNldCB1cC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBpbml0Q2hhbm5lbD9gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlcyhldjogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBldi5kYXRhO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGRhdGEuY2hhbm5lbDtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF07XG4gICAgICBpZiAoY2hhbm5lbEluZm8ucnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHsgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBUeXBlU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBNZXNzYWdlQnVzfSBmb3IgY29tbXVuaWNhdGluZyB2aWEgSmF2YVNjcmlwdCdzXG4gKiBwb3N0TWVzc2FnZSBBUEkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2luazogUG9zdE1lc3NhZ2VCdXNTaW5rLCBwdWJsaWMgc291cmNlOiBQb3N0TWVzc2FnZUJ1c1NvdXJjZSkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuYXR0YWNoVG9ab25lKHpvbmUpO1xuICAgIHRoaXMuc2luay5hdHRhY2hUb1pvbmUoem9uZSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZS5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHRoaXMuc2luay5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7IHJldHVybiB0aGlzLnNvdXJjZS5mcm9tKGNoYW5uZWwpOyB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zaW5rLnRvKGNoYW5uZWwpOyB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRoYXQgd3JhcHMgYSBjaGFubmVsJ3Mge0BsaW5rIEV2ZW50RW1pdHRlcn0gYW5kXG4gKiBrZWVwcyB0cmFjayBvZiBpZiBpdCBzaG91bGQgcnVuIGluIHRoZSB6b25lLlxuICovXG5jbGFzcyBfQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiwgcHVibGljIHJ1bkluWm9uZTogYm9vbGVhbikge31cbn1cbiJdfQ==