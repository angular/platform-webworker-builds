/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
    WebWorkerPlatformLocation.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WebWorkerPlatformLocation.ctorParameters = () => [
        { type: ClientMessageBrokerFactory },
        { type: MessageBus },
        { type: Serializer }
    ];
    return WebWorkerPlatformLocation;
})();
export { WebWorkerPlatformLocation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQXlCLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXNCLDBCQUEwQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBRS9FO0lBQUEsTUFDYSx5QkFBMEIsU0FBUSxnQkFBZ0I7UUFVN0QsWUFDSSxhQUF5QyxFQUFFLEdBQWUsRUFBVSxXQUF1QjtZQUM3RixLQUFLLEVBQUUsQ0FBQztZQUQ4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQVR2Rix1QkFBa0IsR0FBb0IsRUFBRSxDQUFDO1lBQ3pDLHlCQUFvQixHQUFvQixFQUFFLENBQUM7WUFDM0MsY0FBUyxHQUFpQixJQUFLLENBQUM7WUFTdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO2dCQUM1QixJQUFJLEVBQUUsQ0FBQyxHQUF5QixFQUFFLEVB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Q2IsSUFBSSxLQUFLLENBQUMsS0FBSyxvQkFBNEI7Z0JBQzNDLElBQUksS0FBSyxDQUFDLEtBQUssb0JBQTRCO2dCQUMzQyxJQUFJLEtBQUssQ0FBQyxHQUFHLG9CQUE0QjthQUMxQyxDQUFDO1lBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsT0FBTztZQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsd0VBQXdFO1FBQ3hFLFFBQVE7WUFDTixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDOzs7Z0JBeElGLFVBQVU7Ozs7Z0JBTGtCLDBCQUEwQjtnQkFDL0MsVUFBVTtnQkFFSSxVQUFVOztJQTJJaEMsZ0NBQUM7S0FBQTtTQXhJWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuLi9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24gZXh0ZW5kcyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfYnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuICBwcml2YXRlIF9wb3BTdGF0ZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2hhc2hDaGFuZ2VMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb25UeXBlID0gbnVsbCE7XG4gIHByaXZhdGUgX2NoYW5uZWxTb3VyY2U6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWRSZXNvbHZlITogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2Jyb2tlciA9IGJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZSA9IGJ1cy5mcm9tKFJPVVRFUl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChtc2c6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPnxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKG1zZy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnQnKSkge1xuICAgICAgICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1zZ1snZXZlbnQnXVsndHlwZSddO1xuICAgICAgICAgIGlmICh0eXBlID09PSAncG9wc3RhdGUnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdoYXNoY2hhbmdlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBwb3BTdGF0ZSBvciBoYXNoQ2hhbmdlIGV2ZW50LCBzbyB0aGUgbG9jYXRpb24gb2JqZWN0IHRoYXMgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobXNnWydsb2NhdGlvbiddLCBMb2NhdGlvblR5cGUpO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGZuOiBGdW5jdGlvbikgPT4gZm4obXNnWydldmVudCddKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IG5ldyBQcm9taXNlKHJlcyA9PiB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSA9IHJlcyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICoqL1xuICBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKCdnZXRMb2NhdGlvbicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgTG9jYXRpb25UeXBlKSEudGhlbihcbiAgICAgICAgKHZhbDogTG9jYXRpb25UeXBlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB2YWw7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplZFJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0IHRvIGdldCBiYXNlIGhyZWYgZnJvbSBET00gZnJvbSBXZWJXb3JrZXIuIFlvdSBtdXN0IGVpdGhlciBwcm92aWRlIGEgdmFsdWUgZm9yIHRoZSBBUFBfQkFTRV9IUkVGIHRva2VuIHRocm91Z2ggREkgb3IgdXNlIHRoZSBoYXNoIGxvY2F0aW9uIHN0cmF0ZWd5LicpO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycy5wdXNoKGZuKTtcbiAgfVxuXG4gIGdldCBocmVmKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaHJlZiEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBob3N0bmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhvc3QhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgcG9ydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnBvcnQhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgcHJvdG9jb2woKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5wcm90b2NvbCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5zZWFyY2ggOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBoYXNoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaGFzaCA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgc2V0IHBhdGhuYW1lKG5ld1BhdGg6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9sb2NhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIHNldCBwYXRobmFtZSBiZWZvcmUgdmFsdWUgaXMgb2J0YWluZWQgZnJvbSBVSScpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDtcblxuICAgIGNvbnN0IGZuQXJncyA9IFtuZXcgRm5BcmcobmV3UGF0aCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSldO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3NldFBhdGhuYW1lJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3B1c2hTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdyZXBsYWNlU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2ZvcndhcmQnKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdiYWNrJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBXZWJXb3JrZXJzLCB0aGVyZWZvcmUgcmV0dXJuIHVuZGVmaW5lZFxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=