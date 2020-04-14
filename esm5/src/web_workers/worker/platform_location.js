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
        }, function (err) {
            throw new Error(err);
        });
    };
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    WebWorkerPlatformLocation.prototype.onPopState = function (fn) {
        this._popStateListeners.push(fn);
    };
    WebWorkerPlatformLocation.prototype.onHashChange = function (fn) {
        this._hashChangeListeners.push(fn);
    };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "href", {
        get: function () {
            return this._location ? this._location.href : '<unknown>';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hostname", {
        get: function () {
            return this._location ? this._location.host : '<unknown>';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "port", {
        get: function () {
            return this._location ? this._location.port : '<unknown>';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "protocol", {
        get: function () {
            return this._location ? this._location.protocol : '<unknown>';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
        get: function () {
            return this._location ? this._location.search : '<unknown>';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        get: function () {
            return this._location ? this._location.hash : '<unknown>';
        },
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
    WebWorkerPlatformLocation.prototype.getState = function () {
        return undefined;
    };
    WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer)); };
    WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac });
    return WebWorkerPlatformLocation;
}(PlatformLocation));
export { WebWorkerPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUF5QixnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFFL0U7SUFDK0MsNkNBQWdCO0lBVTdELG1DQUNJLGFBQXlDLEVBQUUsR0FBZSxFQUFVLFdBQXVCO1FBRC9GLFlBRUUsaUJBQU8sU0F3QlI7UUF6QnVFLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBVHZGLHdCQUFrQixHQUFvQixFQUFFLENBQUM7UUFDekMsMEJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxlQUFTLEdBQWlCLElBQUssQ0FBQztRQVN0QyxLQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRSxLQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFL0MsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSSxFQUFFLFVBQUMsR0FBeUI7Z0JBQzlC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LENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGdEQUFZLEdBQVosVUFBYSxLQUFVLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDakQsSUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtZQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtZQUMzQyxJQUFJLEtBQUssQ0FBQyxHQUFHLG9CQUE0QjtTQUMxQyxDQUFDO1FBQ0YsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMkNBQU8sR0FBUDtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0NBQUksR0FBSjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLDRDQUFRLEdBQVI7UUFDRSxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO3NHQXZJVSx5QkFBeUI7cUVBQXpCLHlCQUF5QixXQUF6Qix5QkFBeUI7b0NBaEJ0QztDQXdKQyxBQXpJRCxDQUMrQyxnQkFBZ0IsR0F3STlEO1NBeElZLHlCQUF5QjtrREFBekIseUJBQXlCO2NBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi4vc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2Jyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcbiAgcHJpdmF0ZSBfcG9wU3RhdGVMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9oYXNoQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uVHlwZSA9IG51bGwhO1xuICBwcml2YXRlIF9jaGFubmVsU291cmNlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHVibGljIGluaXRpYWxpemVkOiBQcm9taXNlPGFueT47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGluaXRpYWxpemVkUmVzb2x2ZSE6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBicm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9icm9rZXIgPSBicm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2UgPSBidXMuZnJvbShST1VURVJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9jaGFubmVsU291cmNlLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobXNnOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xuICAgICAgICBsZXQgbGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj58bnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChtc2cuaGFzT3duUHJvcGVydHkoJ2V2ZW50JykpIHtcbiAgICAgICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBtc2dbJ2V2ZW50J11bJ3R5cGUnXTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3BvcHN0YXRlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnM7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGFzaGNoYW5nZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgLy8gVGhlcmUgd2FzIGEgcG9wU3RhdGUgb3IgaGFzaENoYW5nZSBldmVudCwgc28gdGhlIGxvY2F0aW9uIG9iamVjdCB0aGFzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1zZ1snbG9jYXRpb24nXSwgTG9jYXRpb25UeXBlKTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChmbjogRnVuY3Rpb24pID0+IGZuKG1zZ1snZXZlbnQnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBuZXcgUHJvbWlzZShyZXMgPT4gdGhpcy5pbml0aWFsaXplZFJlc29sdmUgPSByZXMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqKi9cbiAgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBhcmdzOiBVaUFyZ3VtZW50cyA9IG5ldyBVaUFyZ3VtZW50cygnZ2V0TG9jYXRpb24nKTtcblxuICAgIHJldHVybiB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIExvY2F0aW9uVHlwZSkhLnRoZW4oXG4gICAgICAgICh2YWw6IExvY2F0aW9uVHlwZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXR0ZW1wdCB0byBnZXQgYmFzZSBocmVmIGZyb20gRE9NIGZyb20gV2ViV29ya2VyLiBZb3UgbXVzdCBlaXRoZXIgcHJvdmlkZSBhIHZhbHVlIGZvciB0aGUgQVBQX0JBU0VfSFJFRiB0b2tlbiB0aHJvdWdoIERJIG9yIHVzZSB0aGUgaGFzaCBsb2NhdGlvbiBzdHJhdGVneS4nKTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycy5wdXNoKGZuKTtcbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnMucHVzaChmbik7XG4gIH1cblxuICBnZXQgaHJlZigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhyZWYhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgaG9zdG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ob3N0ISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHBvcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5wb3J0ISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHByb3RvY29sKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucHJvdG9jb2whIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgc2VhcmNoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uc2VhcmNoIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgaGFzaCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhhc2ggOiAnPHVua25vd24+JztcbiAgfVxuXG4gIHNldCBwYXRobmFtZShuZXdQYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBzZXQgcGF0aG5hbWUgYmVmb3JlIHZhbHVlIGlzIG9idGFpbmVkIGZyb20gVUknKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZSA9IG5ld1BhdGg7XG5cbiAgICBjb25zdCBmbkFyZ3MgPSBbbmV3IEZuQXJnKG5ld1BhdGgsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdzZXRQYXRobmFtZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdwdXNoU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncmVwbGFjZVN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdmb3J3YXJkJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnYmFjaycpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gV2ViV29ya2VycywgdGhlcmVmb3JlIHJldHVybiB1bmRlZmluZWRcbiAgZ2V0U3RhdGUoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19