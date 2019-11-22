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
/** @nocollapse */ PostMessageBus.ɵprov = i0.ɵɵdefineInjectable({ token: PostMessageBus, factory: function (t) { return PostMessageBus.ɵfac(t); }, providedIn: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0FBTy9ELHVDQUVDOzs7SUFEQyx3Q0FBK0Q7O0FBR2pFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFIakQsY0FBUyxHQUE4QixFQUFFLENBQUM7UUFDMUMsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO0lBRWlCLENBQUM7Ozs7O0lBRTdELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7UUFDeEIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSTs7O1lBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUM5RixDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBZSxFQUFFLFlBQXFCLElBQUk7UUFDcEQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsT0FBTywrQkFBK0IsQ0FBQyxDQUFDO1NBQzVEOztjQUVLLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7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WSxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBZSxJQUF1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUUsRUFBRSxDQUFDLE9BQWUsSUFBdUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQWhCekUsVUFBVTs7OztZQUVnQixrQkFBa0I7WUFBaUIsb0JBQW9COzs0RUFEckUsY0FBYyxjQUNBLGtCQUFrQixlQUFpQixvQkFBb0I7c0RBRHJFLGNBQWMsaUNBQWQsY0FBYztrREFBZCxjQUFjO2NBRDFCLFVBQVU7c0NBRWdCLGtCQUFrQixZQUFpQixvQkFBb0I7OztJQUFwRSw4QkFBK0I7O0lBQUUsZ0NBQW1DOzs7Ozs7QUFxQmxGLE1BQU0sUUFBUTs7Ozs7SUFDWixZQUFtQixPQUEwQixFQUFTLFNBQWtCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7Q0FDN0U7OztJQURhLDJCQUFpQzs7SUFBRSw2QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXMsIE1lc3NhZ2VCdXNTaW5rLCBNZXNzYWdlQnVzU291cmNlfSBmcm9tICcuL21lc3NhZ2VfYnVzJztcblxuXG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiBSZXBsYWNlIHRoaXMgd2l0aCB0aGUgZGVmaW5pdGlvbiBpbiBsaWIud2Vid29ya2VyLmQudHMoIzM0OTIpXG5leHBvcnQgaW50ZXJmYWNlIFBvc3RNZXNzYWdlVGFyZ2V0IHtcbiAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlOiBhbnksIHRyYW5zZmVyPzogW1RyYW5zZmVyYWJsZV0pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1c1NpbmsgaW1wbGVtZW50cyBNZXNzYWdlQnVzU2luayB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF96b25lICE6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSB7fTtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJ1ZmZlcjogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Bvc3RNZXNzYWdlVGFyZ2V0OiBQb3N0TWVzc2FnZVRhcmdldCkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5fem9uZSA9IHpvbmU7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcihcbiAgICAgICAgKCkgPT4geyB0aGlzLl96b25lLm9uU3RhYmxlLnN1YnNjcmliZSh7bmV4dDogKCkgPT4geyB0aGlzLl9oYW5kbGVPbkV2ZW50RG9uZSgpOyB9fSk7IH0pO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y2hhbm5lbH0gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICBjb25zdCBjaGFubmVsSW5mbyA9IG5ldyBfQ2hhbm5lbChlbWl0dGVyLCBydW5JblpvbmUpO1xuICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0gY2hhbm5lbEluZm87XG4gICAgZW1pdHRlci5zdWJzY3JpYmUoKGRhdGE6IE9iamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtjaGFubmVsOiBjaGFubmVsLCBtZXNzYWdlOiBkYXRhfTtcbiAgICAgIGlmIChydW5JblpvbmUpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZUJ1ZmZlci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzKFttZXNzYWdlXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT25FdmVudERvbmUoKSB7XG4gICAgaWYgKHRoaXMuX21lc3NhZ2VCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzKHRoaXMuX21lc3NhZ2VCdWZmZXIpO1xuICAgICAgdGhpcy5fbWVzc2FnZUJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRNZXNzYWdlcyhtZXNzYWdlczogQXJyYXk8T2JqZWN0PikgeyB0aGlzLl9wb3N0TWVzc2FnZVRhcmdldC5wb3N0TWVzc2FnZShtZXNzYWdlcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU291cmNlIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF96b25lICE6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihldmVudFRhcmdldD86IEV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0KSB7XG4gICAgICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2OiBNZXNzYWdlRXZlbnQpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2VzKGV2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIGV2ZW50VGFyZ2V0IGlzIGdpdmVuIHdlIGFzc3VtZSB3ZSdyZSBpbiBhIFdlYldvcmtlciBhbmQgbGlzdGVuIG9uIHRoZSBnbG9iYWwgc2NvcGVcbiAgICAgIGNvbnN0IHdvcmtlclNjb3BlID0gPEV2ZW50VGFyZ2V0PnNlbGY7XG4gICAgICB3b3JrZXJTY29wZS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2OiBNZXNzYWdlRXZlbnQpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2VzKGV2KSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSkgeyB0aGlzLl96b25lID0gem9uZTsgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgY29uc3QgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZXMoZXY6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gZXYuZGF0YTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2VzW2ldKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBkYXRhLmNoYW5uZWw7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWwpKSB7XG4gICAgICBjb25zdCBjaGFubmVsSW5mbyA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdO1xuICAgICAgaWYgKGNoYW5uZWxJbmZvLnJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7IGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpOyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgVHlwZVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGNvbW11bmljYXRpbmcgdmlhIEphdmFTY3JpcHQnc1xuICogcG9zdE1lc3NhZ2UgQVBJLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNpbms6IFBvc3RNZXNzYWdlQnVzU2luaywgcHVibGljIHNvdXJjZTogUG9zdE1lc3NhZ2VCdXNTb3VyY2UpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgICB0aGlzLnNpbmsuYXR0YWNoVG9ab25lKHpvbmUpO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICB0aGlzLnNpbmsuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zb3VyY2UuZnJvbShjaGFubmVsKTsgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuc2luay50byhjaGFubmVsKTsgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0aGF0IHdyYXBzIGEgY2hhbm5lbCdzIHtAbGluayBFdmVudEVtaXR0ZXJ9IGFuZFxuICoga2VlcHMgdHJhY2sgb2YgaWYgaXQgc2hvdWxkIHJ1biBpbiB0aGUgem9uZS5cbiAqL1xuY2xhc3MgX0NoYW5uZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHB1YmxpYyBydW5JblpvbmU6IGJvb2xlYW4pIHt9XG59XG4iXX0=