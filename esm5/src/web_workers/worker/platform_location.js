import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import * as i0 from "@angular/core";
import * as i1 from "../shared/client_message_broker";
import * as i2 from "../shared/message_bus";
import * as i3 from "../shared/serializer";
var WebWorkerPlatformLocation = /** @class */ (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
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
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "href", {
        get: function () { return this._location ? this._location.href : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hostname", {
        get: function () { return this._location ? this._location.host : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "port", {
        get: function () { return this._location ? this._location.port : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "protocol", {
        get: function () { return this._location ? this._location.protocol : '<unknown>'; },
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
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
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
    // History API isn't available on WebWorkers, therefore return undefined
    WebWorkerPlatformLocation.prototype.getState = function () { return undefined; };
    WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer)); };
    WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac, providedIn: null });
    return WebWorkerPlatformLocation;
}(PlatformLocation));
export { WebWorkerPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUF5QixnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFFL0U7SUFDK0MsNkNBQWdCO0lBVTdELG1DQUNJLGFBQXlDLEVBQUUsR0FBZSxFQUFVLFdBQXVCO1FBRC9GLFlBRUUsaUJBQU8sU0F3QlI7UUF6QnVFLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBVHZGLHdCQUFrQixHQUFvQixFQUFFLENBQUM7UUFDekMsMEJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxlQUFTLEdBQWlCLElBQU0sQ0FBQztRQVN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRSxLQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFL0MsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSSxFQUFFLFVBQUMsR0FBeUI7Z0JBQzlC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aHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuLi9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24gZXh0ZW5kcyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfYnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuICBwcml2YXRlIF9wb3BTdGF0ZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2hhc2hDaGFuZ2VMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb25UeXBlID0gbnVsbCAhO1xuICBwcml2YXRlIF9jaGFubmVsU291cmNlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHVibGljIGluaXRpYWxpemVkOiBQcm9taXNlPGFueT47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGluaXRpYWxpemVkUmVzb2x2ZSAhOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYnJva2VyID0gYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU291cmNlID0gYnVzLmZyb20oUk9VVEVSX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG1zZzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcbiAgICAgICAgbGV0IGxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+fG51bGwgPSBudWxsO1xuICAgICAgICBpZiAobXNnLmhhc093blByb3BlcnR5KCdldmVudCcpKSB7XG4gICAgICAgICAgY29uc3QgdHlwZTogc3RyaW5nID0gbXNnWydldmVudCddWyd0eXBlJ107XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdwb3BzdGF0ZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hhc2hjaGFuZ2UnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIFRoZXJlIHdhcyBhIHBvcFN0YXRlIG9yIGhhc2hDaGFuZ2UgZXZlbnQsIHNvIHRoZSBsb2NhdGlvbiBvYmplY3QgdGhhcyBiZWVuIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtc2dbJ2xvY2F0aW9uJ10sIExvY2F0aW9uVHlwZSk7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZm46IEZ1bmN0aW9uKSA9PiBmbihtc2dbJ2V2ZW50J10pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gbmV3IFByb21pc2UocmVzID0+IHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlID0gcmVzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKiovXG4gIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgYXJnczogVWlBcmd1bWVudHMgPSBuZXcgVWlBcmd1bWVudHMoJ2dldExvY2F0aW9uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBMb2NhdGlvblR5cGUpICEudGhlbihcbiAgICAgICAgKHZhbDogTG9jYXRpb25UeXBlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB2YWw7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplZFJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHsgdGhyb3cgbmV3IEVycm9yKGVycik7IH0pO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXR0ZW1wdCB0byBnZXQgYmFzZSBocmVmIGZyb20gRE9NIGZyb20gV2ViV29ya2VyLiBZb3UgbXVzdCBlaXRoZXIgcHJvdmlkZSBhIHZhbHVlIGZvciB0aGUgQVBQX0JBU0VfSFJFRiB0b2tlbiB0aHJvdWdoIERJIG9yIHVzZSB0aGUgaGFzaCBsb2NhdGlvbiBzdHJhdGVneS4nKTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycy5wdXNoKGZuKTsgfVxuXG4gIGdldCBocmVmKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhyZWYgISA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IGhvc3RuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhvc3QgISA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IHBvcnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucG9ydCAhIDogJzx1bmtub3duPic7IH1cblxuICBnZXQgcHJvdG9jb2woKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucHJvdG9jb2wgISA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IHNlYXJjaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5zZWFyY2ggOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBoYXNoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhhc2ggOiAnPHVua25vd24+JzsgfVxuXG4gIHNldCBwYXRobmFtZShuZXdQYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBzZXQgcGF0aG5hbWUgYmVmb3JlIHZhbHVlIGlzIG9idGFpbmVkIGZyb20gVUknKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZSA9IG5ld1BhdGg7XG5cbiAgICBjb25zdCBmbkFyZ3MgPSBbbmV3IEZuQXJnKG5ld1BhdGgsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdzZXRQYXRobmFtZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdwdXNoU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncmVwbGFjZVN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdmb3J3YXJkJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnYmFjaycpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gV2ViV29ya2VycywgdGhlcmVmb3JlIHJldHVybiB1bmRlZmluZWRcbiAgZ2V0U3RhdGUoKTogdW5rbm93biB7IHJldHVybiB1bmRlZmluZWQ7IH1cbn1cbiJdfQ==