/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function PostMessageTarget_tsickle_Closure_declarations() {
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
        this._zone.runOutsideAngular(() => { this._zone.onStable.subscribe({ next: () => { this._handleOnEventDone(); } }); });
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
        const /** @type {?} */ emitter = new EventEmitter(false);
        const /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe((data) => {
            const /** @type {?} */ message = { channel: channel, message: data };
            if (runInZone) {
                this._messageBuffer.push(message);
            }
            else {
                this._sendMessages([message]);
            }
        });
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
     * @return {?}
     */
    _handleOnEventDone() {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    }
    /**
     * @param {?} messages
     * @return {?}
     */
    _sendMessages(messages) { this._postMessageTarget.postMessage(messages); }
}
function PostMessageBusSink_tsickle_Closure_declarations() {
    /** @type {?} */
    PostMessageBusSink.prototype._zone;
    /** @type {?} */
    PostMessageBusSink.prototype._channels;
    /** @type {?} */
    PostMessageBusSink.prototype._messageBuffer;
    /** @type {?} */
    PostMessageBusSink.prototype._postMessageTarget;
}
export class PostMessageBusSource {
    /**
     * @param {?=} eventTarget
     */
    constructor(eventTarget) {
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', (ev) => this._handleMessages(ev));
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            const /** @type {?} */ workerScope = /** @type {?} */ (self);
            workerScope.addEventListener('message', (ev) => this._handleMessages(ev));
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
        const /** @type {?} */ emitter = new EventEmitter(false);
        const /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
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
     * @param {?} ev
     * @return {?}
     */
    _handleMessages(ev) {
        const /** @type {?} */ messages = ev.data;
        for (let /** @type {?} */ i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _handleMessage(data) {
        const /** @type {?} */ channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            const /** @type {?} */ channelInfo = this._channels[channel];
            if (channelInfo.runInZone) {
                this._zone.run(() => { channelInfo.emitter.emit(data.message); });
            }
            else {
                channelInfo.emitter.emit(data.message);
            }
        }
    }
}
function PostMessageBusSource_tsickle_Closure_declarations() {
    /** @type {?} */
    PostMessageBusSource.prototype._zone;
    /** @type {?} */
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
function PostMessageBus_tsickle_Closure_declarations() {
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
function _Channel_tsickle_Closure_declarations() {
    /** @type {?} */
    _Channel.prototype.emitter;
    /** @type {?} */
    _Channel.prototype.runInZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBVy9ELE1BQU07Ozs7SUFLSixZQUFvQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkFIVixFQUFFOzhCQUNULEVBQUU7S0FFbUI7Ozs7O0lBRTdELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQ3hCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdGOzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBZSxFQUFFLFlBQXFCLElBQUk7UUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxPQUFPLCtCQUErQixDQUFDLENBQUM7U0FDNUQ7UUFFRCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsdUJBQU0sV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxJ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QU4sTUFBTSxDQUFzQjtLQUFJOzs7OztJQUVwRixZQUFZLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qjs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDM0M7Ozs7O0lBRUQsSUFBSSxDQUFDLE9BQWUsSUFBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRTlFLEVBQUUsQ0FBQyxPQUFlLElBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFOzs7WUFoQnpFLFVBQVU7Ozs7WUFFZ0Isa0JBQWtCO1lBQWlCLG9CQUFvQjs7Ozs7Ozs7Ozs7O0FBcUJsRjs7Ozs7SUFDRSxZQUFtQixPQUEwQixFQUFTLFNBQWtCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztLQUFJO0NBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXNzYWdlQnVzLCBNZXNzYWdlQnVzU2luaywgTWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi9tZXNzYWdlX2J1cyc7XG5cblxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogUmVwbGFjZSB0aGlzIHdpdGggdGhlIGRlZmluaXRpb24gaW4gbGliLndlYndvcmtlci5kLnRzKCMzNDkyKVxuZXhwb3J0IGludGVyZmFjZSBQb3N0TWVzc2FnZVRhcmdldCB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2Zlcj86IFtBcnJheUJ1ZmZlcl0pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1c1NpbmsgaW1wbGVtZW50cyBNZXNzYWdlQnVzU2luayB7XG4gIHByaXZhdGUgX3pvbmU6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSB7fTtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJ1ZmZlcjogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Bvc3RNZXNzYWdlVGFyZ2V0OiBQb3N0TWVzc2FnZVRhcmdldCkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5fem9uZSA9IHpvbmU7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcihcbiAgICAgICAgKCkgPT4geyB0aGlzLl96b25lLm9uU3RhYmxlLnN1YnNjcmliZSh7bmV4dDogKCkgPT4geyB0aGlzLl9oYW5kbGVPbkV2ZW50RG9uZSgpOyB9fSk7IH0pO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICBjb25zdCBjaGFubmVsSW5mbyA9IG5ldyBfQ2hhbm5lbChlbWl0dGVyLCBydW5JblpvbmUpO1xuICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0gY2hhbm5lbEluZm87XG4gICAgZW1pdHRlci5zdWJzY3JpYmUoKGRhdGE6IE9iamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtjaGFubmVsOiBjaGFubmVsLCBtZXNzYWdlOiBkYXRhfTtcbiAgICAgIGlmIChydW5JblpvbmUpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUJ1ZmZlci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzKFttZXNzYWdlXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT25FdmVudERvbmUoKSB7XG4gICAgaWYgKHRoaXMuX21lc3NhZ2VCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzKHRoaXMuX21lc3NhZ2VCdWZmZXIpO1xuICAgICAgdGhpcy5fbWVzc2FnZUJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRNZXNzYWdlcyhtZXNzYWdlczogQXJyYXk8T2JqZWN0PikgeyB0aGlzLl9wb3N0TWVzc2FnZVRhcmdldC5wb3N0TWVzc2FnZShtZXNzYWdlcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU291cmNlIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIHByaXZhdGUgX3pvbmU6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihldmVudFRhcmdldD86IEV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0KSB7XG4gICAgICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2OiBNZXNzYWdlRXZlbnQpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2VzKGV2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIGV2ZW50VGFyZ2V0IGlzIGdpdmVuIHdlIGFzc3VtZSB3ZSdyZSBpbiBhIFdlYldvcmtlciBhbmQgbGlzdGVuIG9uIHRoZSBnbG9iYWwgc2NvcGVcbiAgICAgIGNvbnN0IHdvcmtlclNjb3BlID0gPEV2ZW50VGFyZ2V0PnNlbGY7XG4gICAgICB3b3JrZXJTY29wZS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2OiBNZXNzYWdlRXZlbnQpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2VzKGV2KSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSkgeyB0aGlzLl96b25lID0gem9uZTsgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgY29uc3QgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZXMoZXY6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gZXYuZGF0YTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2VzW2ldKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBkYXRhLmNoYW5uZWw7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICBjb25zdCBjaGFubmVsSW5mbyA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdO1xuICAgICAgaWYgKGNoYW5uZWxJbmZvLnJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7IGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpOyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgVHlwZVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGNvbW11bmljYXRpbmcgdmlhIEphdmFTY3JpcHQnc1xuICogcG9zdE1lc3NhZ2UgQVBJLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNpbms6IFBvc3RNZXNzYWdlQnVzU2luaywgcHVibGljIHNvdXJjZTogUG9zdE1lc3NhZ2VCdXNTb3VyY2UpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgICB0aGlzLnNpbmsuYXR0YWNoVG9ab25lKHpvbmUpO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICB0aGlzLnNpbmsuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zb3VyY2UuZnJvbShjaGFubmVsKTsgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuc2luay50byhjaGFubmVsKTsgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0aGF0IHdyYXBzIGEgY2hhbm5lbCdzIHtAbGluayBFdmVudEVtaXR0ZXJ9IGFuZFxuICoga2VlcHMgdHJhY2sgb2YgaWYgaXQgc2hvdWxkIHJ1biBpbiB0aGUgem9uZS5cbiAqL1xuY2xhc3MgX0NoYW5uZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHB1YmxpYyBydW5JblpvbmU6IGJvb2xlYW4pIHt9XG59XG4iXX0=