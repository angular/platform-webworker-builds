/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var PostMessageBusSink = /** @class */ (function () {
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    PostMessageBusSink.prototype.attachToZone = function (zone) {
        var _this = this;
        this._zone = zone;
        this._zone.runOutsideAngular(function () {
            _this._zone.onStable.subscribe({
                next: function () {
                    _this._handleOnEventDone();
                }
            });
        });
    };
    PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
        var _this = this;
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var emitter = new EventEmitter(false);
        var channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe(function (data) {
            var message = { channel: channel, message: data };
            if (runInZone) {
                _this._messageBuffer.push(message);
            }
            else {
                _this._sendMessages([message]);
            }
        });
    };
    PostMessageBusSink.prototype.to = function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    PostMessageBusSink.prototype._handleOnEventDone = function () {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    };
    PostMessageBusSink.prototype._sendMessages = function (messages) {
        this._postMessageTarget.postMessage(messages);
    };
    return PostMessageBusSink;
}());
export { PostMessageBusSink };
var PostMessageBusSource = /** @class */ (function () {
    function PostMessageBusSource(eventTarget) {
        var _this = this;
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            var workerScope = self;
            workerScope.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
    }
    PostMessageBusSource.prototype.attachToZone = function (zone) {
        this._zone = zone;
    };
    PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var emitter = new EventEmitter(false);
        var channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    };
    PostMessageBusSource.prototype.from = function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    PostMessageBusSource.prototype._handleMessages = function (ev) {
        var messages = ev.data;
        for (var i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    };
    PostMessageBusSource.prototype._handleMessage = function (data) {
        var channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            var channelInfo_1 = this._channels[channel];
            if (channelInfo_1.runInZone) {
                this._zone.run(function () {
                    channelInfo_1.emitter.emit(data.message);
                });
            }
            else {
                channelInfo_1.emitter.emit(data.message);
            }
        }
    };
    return PostMessageBusSource;
}());
export { PostMessageBusSource };
/**
 * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
var PostMessageBus = /** @class */ (function () {
    function PostMessageBus(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    PostMessageBus.prototype.attachToZone = function (zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    };
    PostMessageBus.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    };
    PostMessageBus.prototype.from = function (channel) {
        return this.source.from(channel);
    };
    PostMessageBus.prototype.to = function (channel) {
        return this.sink.to(channel);
    };
    PostMessageBus.ɵfac = function PostMessageBus_Factory(t) { return new (t || PostMessageBus)(i0.ɵɵinject(PostMessageBusSink), i0.ɵɵinject(PostMessageBusSource)); };
    PostMessageBus.ɵprov = i0.ɵɵdefineInjectable({ token: PostMessageBus, factory: PostMessageBus.ɵfac });
    return PostMessageBus;
}());
export { PostMessageBus };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PostMessageBus, [{
        type: Injectable
    }], function () { return [{ type: PostMessageBusSink }, { type: PostMessageBusSource }]; }, null); })();
/**
 * Helper class that wraps a channel's {@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
var _Channel = /** @class */ (function () {
    function _Channel(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
    return _Channel;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7O0FBVy9EO0lBTUUsNEJBQW9CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBSGpELGNBQVMsR0FBOEIsRUFBRSxDQUFDO1FBQzFDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztJQUVpQixDQUFDO0lBRTdELHlDQUFZLEdBQVosVUFBYSxJQUFZO1FBQXpCLGlCQVNDO1FBUkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLElBQUksRUFBRTtvQkFDSixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQzthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVgsVUFBWSxPQUFlLEVBQUUsU0FBeUI7UUFBdEQsaUJBZ0JDO1FBaEI0QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUNwRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUksT0FBTyxrQ0FBK0IsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBTSxX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QWEsSUFBWTtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE9BQWUsRUFBRSxTQUF5QjtRQUF6QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssT0FBZTtRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCwyQkFBRSxHQUFGLFVBQUcsT0FBZTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Z0ZBbkJVLGNBQWMsY0FDQSxrQkFBa0IsZUFBaUIsb0JBQW9COzBEQURyRSxjQUFjLFdBQWQsY0FBYzt5QkE1STNCO0NBZ0tDLEFBckJELElBcUJDO1NBcEJZLGNBQWM7a0RBQWQsY0FBYztjQUQxQixVQUFVO3NDQUVnQixrQkFBa0IsWUFBaUIsb0JBQW9CO0FBcUJsRjs7O0dBR0c7QUFDSDtJQUNFLGtCQUFtQixPQUEwQixFQUFTLFNBQWtCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7SUFDOUUsZUFBQztBQUFELENBQUMsQUFGRCxJQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXNzYWdlQnVzLCBNZXNzYWdlQnVzU2luaywgTWVzc2FnZUJ1c1NvdXJjZX0gZnJvbSAnLi9tZXNzYWdlX2J1cyc7XG5cblxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogUmVwbGFjZSB0aGlzIHdpdGggdGhlIGRlZmluaXRpb24gaW4gbGliLndlYndvcmtlci5kLnRzKCMzNDkyKVxuZXhwb3J0IGludGVyZmFjZSBQb3N0TWVzc2FnZVRhcmdldCB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2Zlcj86IFtUcmFuc2ZlcmFibGVdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXNTaW5rIGltcGxlbWVudHMgTWVzc2FnZUJ1c1Npbmsge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfem9uZSE6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSB7fTtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJ1ZmZlcjogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Bvc3RNZXNzYWdlVGFyZ2V0OiBQb3N0TWVzc2FnZVRhcmdldCkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5fem9uZSA9IHpvbmU7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl96b25lLm9uU3RhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVPbkV2ZW50RG9uZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgY29uc3QgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICAgIGVtaXR0ZXIuc3Vic2NyaWJlKChkYXRhOiBPYmplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7Y2hhbm5lbDogY2hhbm5lbCwgbWVzc2FnZTogZGF0YX07XG4gICAgICBpZiAocnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIucHVzaChtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyhbbWVzc2FnZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBpcyBub3Qgc2V0IHVwLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGluaXRDaGFubmVsP2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9uRXZlbnREb25lKCkge1xuICAgIGlmICh0aGlzLl9tZXNzYWdlQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyh0aGlzLl9tZXNzYWdlQnVmZmVyKTtcbiAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZW5kTWVzc2FnZXMobWVzc2FnZXM6IEFycmF5PE9iamVjdD4pIHtcbiAgICB0aGlzLl9wb3N0TWVzc2FnZVRhcmdldC5wb3N0TWVzc2FnZShtZXNzYWdlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU291cmNlIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF96b25lITogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50VGFyZ2V0PzogRXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gZXZlbnRUYXJnZXQgaXMgZ2l2ZW4gd2UgYXNzdW1lIHdlJ3JlIGluIGEgV2ViV29ya2VyIGFuZCBsaXN0ZW4gb24gdGhlIGdsb2JhbCBzY29wZVxuICAgICAgY29uc3Qgd29ya2VyU2NvcGUgPSA8RXZlbnRUYXJnZXQ+c2VsZjtcbiAgICAgIHdvcmtlclNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5fem9uZSA9IHpvbmU7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gbmV3IF9DaGFubmVsKGVtaXR0ZXIsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gPSBjaGFubmVsSW5mbztcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBpcyBub3Qgc2V0IHVwLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGluaXRDaGFubmVsP2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2VzKGV2OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGV2LmRhdGE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFubmVsID0gZGF0YS5jaGFubmVsO1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgY29uc3QgY2hhbm5lbEluZm8gPSB0aGlzLl9jaGFubmVsc1tjaGFubmVsXTtcbiAgICAgIGlmIChjaGFubmVsSW5mby5ydW5JblpvbmUpIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgVHlwZVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGNvbW11bmljYXRpbmcgdmlhIEphdmFTY3JpcHQnc1xuICogcG9zdE1lc3NhZ2UgQVBJLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNpbms6IFBvc3RNZXNzYWdlQnVzU2luaywgcHVibGljIHNvdXJjZTogUG9zdE1lc3NhZ2VCdXNTb3VyY2UpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgICB0aGlzLnNpbmsuYXR0YWNoVG9ab25lKHpvbmUpO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICB0aGlzLnNpbmsuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZS5mcm9tKGNoYW5uZWwpO1xuICB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnNpbmsudG8oY2hhbm5lbCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdGhhdCB3cmFwcyBhIGNoYW5uZWwncyB7QGxpbmsgRXZlbnRFbWl0dGVyfSBhbmRcbiAqIGtlZXBzIHRyYWNrIG9mIGlmIGl0IHNob3VsZCBydW4gaW4gdGhlIHpvbmUuXG4gKi9cbmNsYXNzIF9DaGFubmVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCBwdWJsaWMgcnVuSW5ab25lOiBib29sZWFuKSB7fVxufVxuIl19