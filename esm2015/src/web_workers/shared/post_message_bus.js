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
import { EventEmitter, Injectable } from '@angular/core';
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
    { type: Injectable }
];
/** @nocollapse */
PostMessageBus.ctorParameters = () => [
    { type: PostMessageBusSink },
    { type: PostMessageBusSource }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQzs7OztBQU8vRCx1Q0FFQzs7O0lBREMsd0NBQThEOztBQUdoRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBTTdCLFlBQW9CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBSGpELGNBQVMsR0FBOEIsRUFBRSxDQUFDO1FBQzFDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztJQUVpQixDQUFDOzs7OztJQUU3RCxZQUFZLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O1FBQ3hCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUk7OztZQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQ3BELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLE9BQU8sK0JBQStCLENBQUMsQ0FBQztTQUM1RDs7Y0FFSyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDOztj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Q0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLE9BQWUsSUFBdUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRTlFLEVBQUUsQ0FBQyxPQUFlLElBQXVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFoQnpFLFVBQVU7Ozs7WUFFZ0Isa0JBQWtCO1lBQWlCLG9CQUFvQjs7OztJQUFwRSw4QkFBK0I7O0lBQUUsZ0NBQW1DOzs7Ozs7QUFxQmxGLE1BQU0sUUFBUTs7Ozs7SUFDWixZQUFtQixPQUEwQixFQUFTLFNBQWtCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7Q0FDN0U7OztJQURhLDJCQUFpQzs7SUFBRSw2QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXMsIE1lc3NhZ2VCdXNTaW5rLCBNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL21lc3NhZ2VfYnVzJztcblxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiBSZXBsYWNlIHRoaXMgd2l0aCB0aGUgZGVmaW5pdGlvbiBpbiBsaWIud2Vid29ya2VyLmQudHMoIzM0OTIpXG5leHBvcnQgaW50ZXJmYWNlIFBvc3RNZXNzYWdlVGFyZ2V0IHtcbiAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlOiBhbnksIHRyYW5zZmVyPzogW0FycmF5QnVmZmVyXSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU2luayBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTaW5rIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3pvbmUgITogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IHt9O1xuICBwcml2YXRlIF9tZXNzYWdlQnVmZmVyOiBBcnJheTxPYmplY3Q+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9zdE1lc3NhZ2VUYXJnZXQ6IFBvc3RNZXNzYWdlVGFyZ2V0KSB7fVxuXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkIHtcbiAgICB0aGlzLl96b25lID0gem9uZTtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PiB7IHRoaXMuX3pvbmUub25TdGFibGUuc3Vic2NyaWJlKHtuZXh0OiAoKSA9PiB7IHRoaXMuX2hhbmRsZU9uRXZlbnREb25lKCk7IH19KTsgfSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gbmV3IF9DaGFubmVsKGVtaXR0ZXIsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gPSBjaGFubmVsSW5mbztcbiAgICBlbWl0dGVyLnN1YnNjcmliZSgoZGF0YTogT2JqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0ge2NoYW5uZWw6IGNoYW5uZWwsIG1lc3NhZ2U6IGRhdGF9O1xuICAgICAgaWYgKHJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZXMoW21lc3NhZ2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5lbWl0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaXMgbm90IHNldCB1cC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBpbml0Q2hhbm5lbD9gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVPbkV2ZW50RG9uZSgpIHtcbiAgICBpZiAodGhpcy5fbWVzc2FnZUJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZXModGhpcy5fbWVzc2FnZUJ1ZmZlcik7XG4gICAgICB0aGlzLl9tZXNzYWdlQnVmZmVyID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2VuZE1lc3NhZ2VzKG1lc3NhZ2VzOiBBcnJheTxPYmplY3Q+KSB7IHRoaXMuX3Bvc3RNZXNzYWdlVGFyZ2V0LnBvc3RNZXNzYWdlKG1lc3NhZ2VzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXNTb3VyY2UgaW1wbGVtZW50cyBNZXNzYWdlQnVzU291cmNlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3pvbmUgITogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50VGFyZ2V0PzogRXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gZXZlbnRUYXJnZXQgaXMgZ2l2ZW4gd2UgYXNzdW1lIHdlJ3JlIGluIGEgV2ViV29ya2VyIGFuZCBsaXN0ZW4gb24gdGhlIGdsb2JhbCBzY29wZVxuICAgICAgY29uc3Qgd29ya2VyU2NvcGUgPSA8RXZlbnRUYXJnZXQ+c2VsZjtcbiAgICAgIHdvcmtlclNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKSB7IHRoaXMuX3pvbmUgPSB6b25lOyB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICBjb25zdCBjaGFubmVsSW5mbyA9IG5ldyBfQ2hhbm5lbChlbWl0dGVyLCBydW5JblpvbmUpO1xuICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0gY2hhbm5lbEluZm87XG4gIH1cblxuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5lbWl0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaXMgbm90IHNldCB1cC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBpbml0Q2hhbm5lbD9gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlcyhldjogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBldi5kYXRhO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGRhdGEuY2hhbm5lbDtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF07XG4gICAgICBpZiAoY2hhbm5lbEluZm8ucnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHsgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBUeXBlU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBNZXNzYWdlQnVzfSBmb3IgY29tbXVuaWNhdGluZyB2aWEgSmF2YVNjcmlwdCdzXG4gKiBwb3N0TWVzc2FnZSBBUEkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2luazogUG9zdE1lc3NhZ2VCdXNTaW5rLCBwdWJsaWMgc291cmNlOiBQb3N0TWVzc2FnZUJ1c1NvdXJjZSkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuYXR0YWNoVG9ab25lKHpvbmUpO1xuICAgIHRoaXMuc2luay5hdHRhY2hUb1pvbmUoem9uZSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZS5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHRoaXMuc2luay5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7IHJldHVybiB0aGlzLnNvdXJjZS5mcm9tKGNoYW5uZWwpOyB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zaW5rLnRvKGNoYW5uZWwpOyB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRoYXQgd3JhcHMgYSBjaGFubmVsJ3Mge0BsaW5rIEV2ZW50RW1pdHRlcn0gYW5kXG4gKiBrZWVwcyB0cmFjayBvZiBpZiBpdCBzaG91bGQgcnVuIGluIHRoZSB6b25lLlxuICovXG5jbGFzcyBfQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiwgcHVibGljIHJ1bkluWm9uZTogYm9vbGVhbikge31cbn1cbiJdfQ==