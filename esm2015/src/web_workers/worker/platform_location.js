/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
let WebWorkerPlatformLocation = /** @class */ (() => {
    let WebWorkerPlatformLocation = class WebWorkerPlatformLocation extends PlatformLocation {
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
    };
    WebWorkerPlatformLocation = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus, Serializer])
    ], WebWorkerPlatformLocation);
    return WebWorkerPlatformLocation;
})();
export { WebWorkerPlatformLocation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUF5QixnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUcvRTtJQUFBLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsZ0JBQWdCO1FBVTdELFlBQ0ksYUFBeUMsRUFBRSxHQUFlLEVBQVUsV0FBdUI7WUFDN0YsS0FBSyxFQUFFLENBQUM7WUFEOEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFUdkYsdUJBQWtCLEdBQW9CLEVBQUUsQ0FBQztZQUN6Qyx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1lBQzNDLGNBQVMsR0FBaUIsSUFBSyxDQUFDO1lBU3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsSUFBSSxFQUFF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LE1BQU0sTUFBTSxHQUFHO2dCQUNiLElBQUksS0FBSyxDQUFDLEtBQUssb0JBQTRCO2dCQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtnQkFDM0MsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBNEI7YUFDMUMsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU87WUFDTCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELHdFQUF3RTtRQUN4RSxRQUFRO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztLQUNGLENBQUE7SUF4SVkseUJBQXlCO1FBRHJDLFVBQVUsRUFBRTt5Q0FZUSwwQkFBMEIsRUFBTyxVQUFVLEVBQXVCLFVBQVU7T0FYcEYseUJBQXlCLENBd0lyQztJQUFELGdDQUFDO0tBQUE7U0F4SVkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiBleHRlbmRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9icm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG4gIHByaXZhdGUgX3BvcFN0YXRlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfaGFzaENoYW5nZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvblR5cGUgPSBudWxsITtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNvdXJjZTogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHB1YmxpYyBpbml0aWFsaXplZDogUHJvbWlzZTxhbnk+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZFJlc29sdmUhOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYnJva2VyID0gYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU291cmNlID0gYnVzLmZyb20oUk9VVEVSX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG1zZzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcbiAgICAgICAgbGV0IGxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+fG51bGwgPSBudWxsO1xuICAgICAgICBpZiAobXNnLmhhc093blByb3BlcnR5KCdldmVudCcpKSB7XG4gICAgICAgICAgY29uc3QgdHlwZTogc3RyaW5nID0gbXNnWydldmVudCddWyd0eXBlJ107XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdwb3BzdGF0ZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hhc2hjaGFuZ2UnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIFRoZXJlIHdhcyBhIHBvcFN0YXRlIG9yIGhhc2hDaGFuZ2UgZXZlbnQsIHNvIHRoZSBsb2NhdGlvbiBvYmplY3QgdGhhcyBiZWVuIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtc2dbJ2xvY2F0aW9uJ10sIExvY2F0aW9uVHlwZSk7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZm46IEZ1bmN0aW9uKSA9PiBmbihtc2dbJ2V2ZW50J10pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gbmV3IFByb21pc2UocmVzID0+IHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlID0gcmVzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKiovXG4gIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgYXJnczogVWlBcmd1bWVudHMgPSBuZXcgVWlBcmd1bWVudHMoJ2dldExvY2F0aW9uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBMb2NhdGlvblR5cGUpIS50aGVuKFxuICAgICAgICAodmFsOiBMb2NhdGlvblR5cGUpID0+IHtcbiAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHZhbDtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dGVtcHQgdG8gZ2V0IGJhc2UgaHJlZiBmcm9tIERPTSBmcm9tIFdlYldvcmtlci4gWW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSB2YWx1ZSBmb3IgdGhlIEFQUF9CQVNFX0hSRUYgdG9rZW4gdGhyb3VnaCBESSBvciB1c2UgdGhlIGhhc2ggbG9jYXRpb24gc3RyYXRlZ3kuJyk7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnMucHVzaChmbik7XG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgZ2V0IGhyZWYoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ocmVmISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IGhvc3RuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaG9zdCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBwb3J0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucG9ydCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBwcm90b2NvbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnByb3RvY29sISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHNlYXJjaCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnNlYXJjaCA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IGhhc2goKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5oYXNoIDogJzx1bmtub3duPic7XG4gIH1cblxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2xvY2F0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gc2V0IHBhdGhuYW1lIGJlZm9yZSB2YWx1ZSBpcyBvYnRhaW5lZCBmcm9tIFVJJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9jYXRpb24ucGF0aG5hbWUgPSBuZXdQYXRoO1xuXG4gICAgY29uc3QgZm5BcmdzID0gW25ldyBGbkFyZyhuZXdQYXRoLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKV07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnc2V0UGF0aG5hbWUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncHVzaFN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3JlcGxhY2VTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnZm9yd2FyZCcpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2JhY2snKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgLy8gSGlzdG9yeSBBUEkgaXNuJ3QgYXZhaWxhYmxlIG9uIFdlYldvcmtlcnMsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==