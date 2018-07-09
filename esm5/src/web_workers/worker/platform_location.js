/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
var WebWorkerPlatformLocation = /** @class */ (function (_super) {
    tslib_1.__extends(WebWorkerPlatformLocation, _super);
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = _super.call(this) || this;
        _this._serializer = _serializer;
        _this._popStateListeners = [];
        _this._hashChangeListeners = [];
        _this._location = null;
        _this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        _this._channelSource = bus.from(ROUTER_CHANNEL);
        _this._channelSource.subscribe({
            next: function (msg) {
                var listeners = null;
                if (msg.hasOwnProperty('event')) {
                    var type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = _this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = _this._hashChangeListeners;
                    }
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
                        _this._location = _this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach(function (fn) { return fn(msg['event']); });
                    }
                }
            }
        });
        _this.initialized = new Promise(function (res) { return _this.initializedResolve = res; });
        return _this;
    }
    /** @internal **/
    WebWorkerPlatformLocation.prototype.init = function () {
        var _this = this;
        var args = new UiArguments('getLocation');
        return this._broker.runOnService(args, LocationType).then(function (val) {
            _this._location = val;
            _this.initializedResolve();
            return true;
        }, function (err) { throw new Error(err); });
    };
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
    WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
        get: function () { return this._location ? this._location.pathname : '<unknown>'; },
        set: function (newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
            var args = new UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
        get: function () { return this._location ? this._location.search : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        get: function () { return this._location ? this._location.hash : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
        var fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        var args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
        var fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        var args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.forward = function () {
        var args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.back = function () {
        var args = new UiArguments('back');
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus, Serializer])
    ], WebWorkerPlatformLocation);
    return WebWorkerPlatformLocation;
}(PlatformLocation));
export { WebWorkerPlatformLocation };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUF5QixnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUcvRTtJQUErQyxxREFBZ0I7SUFTN0QsbUNBQ0ksYUFBeUMsRUFBRSxHQUFlLEVBQVUsV0FBdUI7UUFEL0YsWUFFRSxpQkFBTyxTQXdCUjtRQXpCdUUsaUJBQVcsR0FBWCxXQUFXLENBQVk7UUFSdkYsd0JBQWtCLEdBQW9CLEVBQUUsQ0FBQztRQUN6QywwQkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLGVBQVMsR0FBaUIsSUFBTSxDQUFDO1FBUXZDLEtBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pFLEtBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUvQyxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUM1QixJQUFJLEVBQUUsVUFBQyxHQUF5QjtnQkFDOUIsSUFB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QUFHLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDJDQUFPLEdBQVA7UUFDRSxJQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHdDQUFJLEdBQUo7UUFDRSxJQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQXpHVSx5QkFBeUI7UUFEckMsVUFBVSxFQUFFO2lEQVdRLDBCQUEwQixFQUFPLFVBQVUsRUFBdUIsVUFBVTtPQVZwRix5QkFBeUIsQ0EwR3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQTFHRCxDQUErQyxnQkFBZ0IsR0EwRzlEO1NBMUdZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuLi9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24gZXh0ZW5kcyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfYnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuICBwcml2YXRlIF9wb3BTdGF0ZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2hhc2hDaGFuZ2VMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb25UeXBlID0gbnVsbCAhO1xuICBwcml2YXRlIF9jaGFubmVsU291cmNlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHVibGljIGluaXRpYWxpemVkOiBQcm9taXNlPGFueT47XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWRSZXNvbHZlOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYnJva2VyID0gYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU291cmNlID0gYnVzLmZyb20oUk9VVEVSX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG1zZzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcbiAgICAgICAgbGV0IGxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+fG51bGwgPSBudWxsO1xuICAgICAgICBpZiAobXNnLmhhc093blByb3BlcnR5KCdldmVudCcpKSB7XG4gICAgICAgICAgY29uc3QgdHlwZTogc3RyaW5nID0gbXNnWydldmVudCddWyd0eXBlJ107XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdwb3BzdGF0ZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hhc2hjaGFuZ2UnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIFRoZXJlIHdhcyBhIHBvcFN0YXRlIG9yIGhhc2hDaGFuZ2UgZXZlbnQsIHNvIHRoZSBsb2NhdGlvbiBvYmplY3QgdGhhcyBiZWVuIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtc2dbJ2xvY2F0aW9uJ10sIExvY2F0aW9uVHlwZSk7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZm46IEZ1bmN0aW9uKSA9PiBmbihtc2dbJ2V2ZW50J10pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gbmV3IFByb21pc2UocmVzID0+IHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlID0gcmVzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKiovXG4gIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgYXJnczogVWlBcmd1bWVudHMgPSBuZXcgVWlBcmd1bWVudHMoJ2dldExvY2F0aW9uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBMb2NhdGlvblR5cGUpICEudGhlbihcbiAgICAgICAgKHZhbDogTG9jYXRpb25UeXBlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB2YWw7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplZFJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHsgdGhyb3cgbmV3IEVycm9yKGVycik7IH0pO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXR0ZW1wdCB0byBnZXQgYmFzZSBocmVmIGZyb20gRE9NIGZyb20gV2ViV29ya2VyLiBZb3UgbXVzdCBlaXRoZXIgcHJvdmlkZSBhIHZhbHVlIGZvciB0aGUgQVBQX0JBU0VfSFJFRiB0b2tlbiB0aHJvdWdoIERJIG9yIHVzZSB0aGUgaGFzaCBsb2NhdGlvbiBzdHJhdGVneS4nKTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycy5wdXNoKGZuKTsgfVxuXG4gIGdldCBwYXRobmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZSAhIDogJzx1bmtub3duPic7IH1cblxuICBnZXQgc2VhcmNoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnNlYXJjaCA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IGhhc2goKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaGFzaCA6ICc8dW5rbm93bj4nOyB9XG5cbiAgc2V0IHBhdGhuYW1lKG5ld1BhdGg6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9sb2NhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIHNldCBwYXRobmFtZSBiZWZvcmUgdmFsdWUgaXMgb2J0YWluZWQgZnJvbSBVSScpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDtcblxuICAgIGNvbnN0IGZuQXJncyA9IFtuZXcgRm5BcmcobmV3UGF0aCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSldO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3NldFBhdGhuYW1lJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3B1c2hTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdyZXBsYWNlU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2ZvcndhcmQnKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdiYWNrJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxufVxuIl19