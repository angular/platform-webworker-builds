/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter, Injectable } from '@angular/core';
var PostMessageBusSink = /** @class */ (function () {
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    PostMessageBusSink.prototype.attachToZone = function (zone) {
        var _this = this;
        this._zone = zone;
        this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
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
    PostMessageBusSink.prototype._sendMessages = function (messages) { this._postMessageTarget.postMessage(messages); };
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
    PostMessageBusSource.prototype.attachToZone = function (zone) { this._zone = zone; };
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
                this._zone.run(function () { channelInfo_1.emitter.emit(data.message); });
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
    PostMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
    PostMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
    PostMessageBus.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PostMessageBus.ctorParameters = function () { return [
        { type: PostMessageBusSink, },
        { type: PostMessageBusSource, },
    ]; };
    return PostMessageBus;
}());
export { PostMessageBus };
/**
 * Helper class that wraps a channel's {@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
var /**
 * Helper class that wraps a channel's {@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
_Channel = /** @class */ (function () {
    function _Channel(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
    return _Channel;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9tZXNzYWdlX2J1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBVy9ELElBQUE7SUFLRSw0QkFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7eUJBSFYsRUFBRTs4QkFDVCxFQUFFO0tBRW1CO0lBRTdELHlDQUFZLEdBQVosVUFBYSxJQUFZO1FBQXpCLGlCQUlDO1FBSEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FDeEIsY0FBUSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBUSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsd0NBQVcsR0FBWCxVQUFZLE9BQWUsRUFBRSxTQUF5QjtRQUF0RCxpQkFnQkM7UUFoQjRCLDBCQUFBLEVBQUEsZ0JBQXlCO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFJLE9BQU8sa0NBQStCLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQU0sV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBWTtZQUM3QixJQUFNLE9BQU8sR0FBRyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUMvQjtTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQsK0JBQUUsR0FBRixVQUFHLE9BQWU7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUN4QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBSSxPQUFPLHdEQUFxRCxDQUFDLENBQUM7U0FDbEY7S0FDRjtJQUVPLCtDQUFrQixHQUExQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7U0FDMUI7S0FDRjtJQUVPLDBDQUFhLEdBQXJCLFVBQXNCLFFBQXVCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFOzZCQWpFbkc7SUFrRUMsQ0FBQTtBQS9DRCw4QkErQ0M7QUFFRCxJQUFBO0lBSUUsOEJBQVksV0FBeUI7UUFBckMsaUJBUUM7eUJBVjhDLEVBQUU7UUFHL0MsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsRUFBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztTQUN6RjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLElBQU0sV0FBVyxHQUFnQixJQUFJLENBQUM7WUFDdEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEVBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7U0FDekY7S0FDRjtJQUVELDJDQUFZLEdBQVosVUFBYSxJQUFZLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRTtJQUVqRCwwQ0FBVyxHQUFYLFVBQVksT0FBZSxFQUFFLFNBQXlCO1FBQXpCLDBCQUFBLEVBQUEsZ0JBQXlCO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFJLE9BQU8sa0NBQStCLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQU0sV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUN2QztJQUVELG1DQUFJLEdBQUosVUFBSyxPQUFlO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDeEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUksT0FBTyx3REFBcUQsQ0FBQyxDQUFDO1NBQ2xGO0tBQ0Y7SUFFTyw4Q0FBZSxHQUF2QixVQUF3QixFQUFnQjtRQUN0QyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7S0FDRjtJQUVPLDZDQUFjLEdBQXRCLFVBQXVCLElBQVM7UUFDOUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBTSxhQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxhQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBUSxhQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixhQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEM7U0FDRjtLQUNGOytCQXZISDtJQXdIQyxDQUFBO0FBcERELGdDQW9EQzs7Ozs7O0lBUUMsd0JBQW1CLElBQXdCLEVBQVMsTUFBNEI7UUFBN0QsU0FBSSxHQUFKLElBQUksQ0FBb0I7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFzQjtLQUFJO0lBRXBGLHFDQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE9BQWUsRUFBRSxTQUF5QjtRQUF6QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsNkJBQUksR0FBSixVQUFLLE9BQWUsSUFBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFFOUUsMkJBQUUsR0FBRixVQUFHLE9BQWUsSUFBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7O2dCQWhCekUsVUFBVTs7OztnQkEzR0Usa0JBQWtCO2dCQWlEbEIsb0JBQW9COzt5QkFwRWpDOztTQStIYSxjQUFjOzs7OztBQXNCM0I7Ozs7QUFBQTtJQUNFLGtCQUFtQixPQUEwQixFQUFTLFNBQWtCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztLQUFJO21CQXRKOUU7SUF1SkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWVzc2FnZUJ1cywgTWVzc2FnZUJ1c1NpbmssIE1lc3NhZ2VCdXNTb3VyY2V9IGZyb20gJy4vbWVzc2FnZV9idXMnO1xuXG5cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IFJlcGxhY2UgdGhpcyB3aXRoIHRoZSBkZWZpbml0aW9uIGluIGxpYi53ZWJ3b3JrZXIuZC50cygjMzQ5MilcbmV4cG9ydCBpbnRlcmZhY2UgUG9zdE1lc3NhZ2VUYXJnZXQge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXI/OiBbQXJyYXlCdWZmZXJdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXNTaW5rIGltcGxlbWVudHMgTWVzc2FnZUJ1c1Npbmsge1xuICBwcml2YXRlIF96b25lOiBOZ1pvbmU7XG4gIHByaXZhdGUgX2NoYW5uZWxzOiB7W2tleTogc3RyaW5nXTogX0NoYW5uZWx9ID0ge307XG4gIHByaXZhdGUgX21lc3NhZ2VCdWZmZXI6IEFycmF5PE9iamVjdD4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb3N0TWVzc2FnZVRhcmdldDogUG9zdE1lc3NhZ2VUYXJnZXQpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuX3pvbmUgPSB6b25lO1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICgpID0+IHsgdGhpcy5fem9uZS5vblN0YWJsZS5zdWJzY3JpYmUoe25leHQ6ICgpID0+IHsgdGhpcy5faGFuZGxlT25FdmVudERvbmUoKTsgfX0pOyB9KTtcbiAgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NoYW5uZWx9IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgY29uc3QgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICAgIGVtaXR0ZXIuc3Vic2NyaWJlKChkYXRhOiBPYmplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7Y2hhbm5lbDogY2hhbm5lbCwgbWVzc2FnZTogZGF0YX07XG4gICAgICBpZiAocnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIucHVzaChtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyhbbWVzc2FnZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBpcyBub3Qgc2V0IHVwLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGluaXRDaGFubmVsP2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9uRXZlbnREb25lKCkge1xuICAgIGlmICh0aGlzLl9tZXNzYWdlQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyh0aGlzLl9tZXNzYWdlQnVmZmVyKTtcbiAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZW5kTWVzc2FnZXMobWVzc2FnZXM6IEFycmF5PE9iamVjdD4pIHsgdGhpcy5fcG9zdE1lc3NhZ2VUYXJnZXQucG9zdE1lc3NhZ2UobWVzc2FnZXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTb3VyY2Uge1xuICBwcml2YXRlIF96b25lOiBOZ1pvbmU7XG4gIHByaXZhdGUgX2NoYW5uZWxzOiB7W2tleTogc3RyaW5nXTogX0NoYW5uZWx9ID0ge307XG5cbiAgY29uc3RydWN0b3IoZXZlbnRUYXJnZXQ/OiBFdmVudFRhcmdldCkge1xuICAgIGlmIChldmVudFRhcmdldCkge1xuICAgICAgZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldjogTWVzc2FnZUV2ZW50KSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlcyhldikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBldmVudFRhcmdldCBpcyBnaXZlbiB3ZSBhc3N1bWUgd2UncmUgaW4gYSBXZWJXb3JrZXIgYW5kIGxpc3RlbiBvbiB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgICBjb25zdCB3b3JrZXJTY29wZSA9IDxFdmVudFRhcmdldD5zZWxmO1xuICAgICAgd29ya2VyU2NvcGUuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldjogTWVzc2FnZUV2ZW50KSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlcyhldikpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpIHsgdGhpcy5fem9uZSA9IHpvbmU7IH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5fY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIGNvbnN0IGNoYW5uZWxJbmZvID0gbmV3IF9DaGFubmVsKGVtaXR0ZXIsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gPSBjaGFubmVsSW5mbztcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjaGFubmVsfSBpcyBub3Qgc2V0IHVwLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGluaXRDaGFubmVsP2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2VzKGV2OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGV2LmRhdGE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFubmVsID0gZGF0YS5jaGFubmVsO1xuICAgIGlmICh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkge1xuICAgICAgY29uc3QgY2hhbm5lbEluZm8gPSB0aGlzLl9jaGFubmVsc1tjaGFubmVsXTtcbiAgICAgIGlmIChjaGFubmVsSW5mby5ydW5JblpvbmUpIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4geyBjaGFubmVsSW5mby5lbWl0dGVyLmVtaXQoZGF0YS5tZXNzYWdlKTsgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFubmVsSW5mby5lbWl0dGVyLmVtaXQoZGF0YS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBIFR5cGVTY3JpcHQgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIE1lc3NhZ2VCdXN9IGZvciBjb21tdW5pY2F0aW5nIHZpYSBKYXZhU2NyaXB0J3NcbiAqIHBvc3RNZXNzYWdlIEFQSS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzIGltcGxlbWVudHMgTWVzc2FnZUJ1cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzaW5rOiBQb3N0TWVzc2FnZUJ1c1NpbmssIHB1YmxpYyBzb3VyY2U6IFBvc3RNZXNzYWdlQnVzU291cmNlKSB7fVxuXG4gIGF0dGFjaFRvWm9uZSh6b25lOiBOZ1pvbmUpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZS5hdHRhY2hUb1pvbmUoem9uZSk7XG4gICAgdGhpcy5zaW5rLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5zaW5rLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gIH1cblxuICBmcm9tKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuc291cmNlLmZyb20oY2hhbm5lbCk7IH1cblxuICB0byhjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7IHJldHVybiB0aGlzLnNpbmsudG8oY2hhbm5lbCk7IH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdGhhdCB3cmFwcyBhIGNoYW5uZWwncyB7QGxpbmsgRXZlbnRFbWl0dGVyfSBhbmRcbiAqIGtlZXBzIHRyYWNrIG9mIGlmIGl0IHNob3VsZCBydW4gaW4gdGhlIHpvbmUuXG4gKi9cbmNsYXNzIF9DaGFubmVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCBwdWJsaWMgcnVuSW5ab25lOiBib29sZWFuKSB7fVxufVxuIl19