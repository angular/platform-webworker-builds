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
let WebWorkerPlatformLocation = /** @class */ (() => {
    class WebWorkerPlatformLocation extends PlatformLocation {
        constructor(brokerFactory, bus, _serializer) {
            super();
            this._serializer = _serializer;
            this._popStateListeners = [];
            this._hashChangeListeners = [];
            this._location = null;
            this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
            this._channelSource = bus.from(ROUTER_CHANNEL);
            this._channelSource.subscribe({
                next: (msg) => {
                    let listeners = null;
                    if (msg.hasOwnProperty('event')) {
                        const type = msg['event']['type'];
                        if (type === 'popstate') {
                            listeners = this._popStateListeners;
                        }
                        else if (type === 'hashchange') {
                            listeners = this._hashChangeListeners;
                        }
                        if (listeners) {
                            // There was a popState or hashChange event, so the location object thas been updated
                            this._location = this._serializer.deserialize(msg['location'], LocationType);
                            listeners.forEach((fn) => fn(msg['event']));
                        }
                    }
                }
            });
            this.initialized = new Promise(res => this.initializedResolve = res);
        }
        /** @internal **/
        init() {
            const args = new UiArguments('getLocation');
            return this._broker.runOnService(args, LocationType).then((val) => {
                this._location = val;
                this.initializedResolve();
                return true;
            }, err => {
                throw new Error(err);
            });
        }
        getBaseHrefFromDOM() {
            throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
        }
        onPopState(fn) {
            this._popStateListeners.push(fn);
        }
        onHashChange(fn) {
            this._hashChangeListeners.push(fn);
        }
        get href() {
            return this._location ? this._location.href : '<unknown>';
        }
        get hostname() {
            return this._location ? this._location.host : '<unknown>';
        }
        get port() {
            return this._location ? this._location.port : '<unknown>';
        }
        get protocol() {
            return this._location ? this._location.protocol : '<unknown>';
        }
        get search() {
            return this._location ? this._location.search : '<unknown>';
        }
        get hash() {
            return this._location ? this._location.hash : '<unknown>';
        }
        set pathname(newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            const fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
            const args = new UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        }
        pushState(state, title, url) {
            const fnArgs = [
                new FnArg(state, 1 /* PRIMITIVE */),
                new FnArg(title, 1 /* PRIMITIVE */),
                new FnArg(url, 1 /* PRIMITIVE */),
            ];
            const args = new UiArguments('pushState', fnArgs);
            this._broker.runOnService(args, null);
        }
        replaceState(state, title, url) {
            const fnArgs = [
                new FnArg(state, 1 /* PRIMITIVE */),
                new FnArg(title, 1 /* PRIMITIVE */),
                new FnArg(url, 1 /* PRIMITIVE */),
            ];
            const args = new UiArguments('replaceState', fnArgs);
            this._broker.runOnService(args, null);
        }
        forward() {
            const args = new UiArguments('forward');
            this._broker.runOnService(args, null);
        }
        back() {
            const args = new UiArguments('back');
            this._broker.runOnService(args, null);
        }
        // History API isn't available on WebWorkers, therefore return undefined
        getState() {
            return undefined;
        }
    }
    WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer)); };
    WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac });
    return WebWorkerPlatformLocation;
})();
export { WebWorkerPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQXlCLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXNCLDBCQUEwQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7OztBQUUvRTtJQUFBLE1BQ2EseUJBQTBCLFNBQVEsZ0JBQWdCO1FBVTdELFlBQ0ksYUFBeUMsRUFBRSxHQUFlLEVBQVUsV0FBdUI7WUFDN0YsS0FBSyxFQUFFLENBQUM7WUFEOEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFUdkYsdUJBQWtCLEdBQW9CLEVBQUUsQ0FBQztZQUN6Qyx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1lBQzNDLGNBQVMsR0FBaUIsSUFBSyxDQUFDO1lBU3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsSUFBSSxFQUFFLENBQUMsR0FBeUIsRUFB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O2dCQUNiLElBQUksS0FBSyxDQUFDLEtBQUssb0JBQTRCO2dCQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtnQkFDM0MsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBNEI7YUFDMUMsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU87WUFDTCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELHdFQUF3RTtRQUN4RSxRQUFRO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7c0dBdklVLHlCQUF5QjtxRUFBekIseUJBQXlCLFdBQXpCLHlCQUF5QjtvQ0FoQnRDO0tBd0pDO1NBeElZLHlCQUF5QjtrREFBekIseUJBQXlCO2NBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi4vc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2Jyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcbiAgcHJpdmF0ZSBfcG9wU3RhdGVMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9oYXNoQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uVHlwZSA9IG51bGwhO1xuICBwcml2YXRlIF9jaGFubmVsU291cmNlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHVibGljIGluaXRpYWxpemVkOiBQcm9taXNlPGFueT47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGluaXRpYWxpemVkUmVzb2x2ZSE6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBicm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9icm9rZXIgPSBicm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2UgPSBidXMuZnJvbShST1VURVJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9jaGFubmVsU291cmNlLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobXNnOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xuICAgICAgICBsZXQgbGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj58bnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChtc2cuaGFzT3duUHJvcGVydHkoJ2V2ZW50JykpIHtcbiAgICAgICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBtc2dbJ2V2ZW50J11bJ3R5cGUnXTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3BvcHN0YXRlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnM7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGFzaGNoYW5nZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgLy8gVGhlcmUgd2FzIGEgcG9wU3RhdGUgb3IgaGFzaENoYW5nZSBldmVudCwgc28gdGhlIGxvY2F0aW9uIG9iamVjdCB0aGFzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1zZ1snbG9jYXRpb24nXSwgTG9jYXRpb25UeXBlKTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChmbjogRnVuY3Rpb24pID0+IGZuKG1zZ1snZXZlbnQnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBuZXcgUHJvbWlzZShyZXMgPT4gdGhpcy5pbml0aWFsaXplZFJlc29sdmUgPSByZXMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqKi9cbiAgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBhcmdzOiBVaUFyZ3VtZW50cyA9IG5ldyBVaUFyZ3VtZW50cygnZ2V0TG9jYXRpb24nKTtcblxuICAgIHJldHVybiB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIExvY2F0aW9uVHlwZSkhLnRoZW4oXG4gICAgICAgICh2YWw6IExvY2F0aW9uVHlwZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXR0ZW1wdCB0byBnZXQgYmFzZSBocmVmIGZyb20gRE9NIGZyb20gV2ViV29ya2VyLiBZb3UgbXVzdCBlaXRoZXIgcHJvdmlkZSBhIHZhbHVlIGZvciB0aGUgQVBQX0JBU0VfSFJFRiB0b2tlbiB0aHJvdWdoIERJIG9yIHVzZSB0aGUgaGFzaCBsb2NhdGlvbiBzdHJhdGVneS4nKTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycy5wdXNoKGZuKTtcbiAgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnMucHVzaChmbik7XG4gIH1cblxuICBnZXQgaHJlZigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhyZWYhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgaG9zdG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ob3N0ISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHBvcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5wb3J0ISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHByb3RvY29sKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucHJvdG9jb2whIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgc2VhcmNoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uc2VhcmNoIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgaGFzaCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhhc2ggOiAnPHVua25vd24+JztcbiAgfVxuXG4gIHNldCBwYXRobmFtZShuZXdQYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBzZXQgcGF0aG5hbWUgYmVmb3JlIHZhbHVlIGlzIG9idGFpbmVkIGZyb20gVUknKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZSA9IG5ld1BhdGg7XG5cbiAgICBjb25zdCBmbkFyZ3MgPSBbbmV3IEZuQXJnKG5ld1BhdGgsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdzZXRQYXRobmFtZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdwdXNoU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncmVwbGFjZVN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdmb3J3YXJkJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnYmFjaycpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gV2ViV29ya2VycywgdGhlcmVmb3JlIHJldHVybiB1bmRlZmluZWRcbiAgZ2V0U3RhdGUoKTogdW5rbm93biB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19