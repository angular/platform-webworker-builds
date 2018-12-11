import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class WebWorkerPlatformLocation extends PlatformLocation {
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    constructor(brokerFactory, bus, _serializer) {
        super();
        this._serializer = _serializer;
        this._popStateListeners = [];
        this._hashChangeListeners = [];
        this._location = /** @type {?} */ ((null));
        this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSource = bus.from(ROUTER_CHANNEL);
        this._channelSource.subscribe({
            next: (msg) => {
                /** @type {?} */
                let listeners = null;
                if (msg.hasOwnProperty('event')) {
                    /** @type {?} */
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
    /**
     * \@internal *
     * @return {?}
     */
    init() {
        /** @type {?} */
        const args = new UiArguments('getLocation');
        return /** @type {?} */ ((this._broker.runOnService(args, LocationType))).then((val) => {
            this._location = val;
            this.initializedResolve();
            return true;
        }, err => { throw new Error(err); });
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) { this._popStateListeners.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashChangeListeners.push(fn); }
    /**
     * @return {?}
     */
    get pathname() { return this._location ? /** @type {?} */ ((this._location.pathname)) : '<unknown>'; }
    /**
     * @return {?}
     */
    get search() { return this._location ? this._location.search : '<unknown>'; }
    /**
     * @return {?}
     */
    get hash() { return this._location ? this._location.hash : '<unknown>'; }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) {
        if (this._location === null) {
            throw new Error('Attempt to set pathname before value is obtained from UI');
        }
        this._location.pathname = newPath;
        /** @type {?} */
        const fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
        /** @type {?} */
        const args = new UiArguments('setPathname', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        /** @type {?} */
        const fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        /** @type {?} */
        const args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        /** @type {?} */
        const fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        /** @type {?} */
        const args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    forward() {
        /** @type {?} */
        const args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    back() {
        /** @type {?} */
        const args = new UiArguments('back');
        this._broker.runOnService(args, null);
    }
}
WebWorkerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = () => [
    { type: ClientMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer }
];
WebWorkerPlatformLocation.ngInjectableDef = i0.defineInjectable({ token: WebWorkerPlatformLocation, factory: function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.inject(ClientMessageBrokerFactory), i0.inject(MessageBus), i0.inject(Serializer)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
        type: Injectable
    }], [{
        type: ClientMessageBrokerFactory
    }, {
        type: MessageBus
    }, {
        type: Serializer
    }], null);
if (false) {
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._broker;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._popStateListeners;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._hashChangeListeners;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._location;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._channelSource;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype.initialized;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype.initializedResolve;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype._serializer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQXlCLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXNCLDBCQUEwQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7Ozs7O0FBRy9FLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxnQkFBZ0I7Ozs7OztJQVU3RCxZQUNJLGFBQXlDLEVBQUUsR0FBZSxFQUFVLFdBQXVCO1FBQzdGLEtBQUssRUFBRSxDQUFDO1FBRDhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO2tDQVRqRCxFQUFFO29DQUNBLEVBQUU7NENBQ2hCLElBQUk7UUFTcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzVCLElBQUksRUFBRSxDQUFDLEdBQXlCLEVBQUUsRUFBRTs7Z0JBQ2xDLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUM7Z0JBQzNDLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FB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QUUsSUFBSSxDQUFDLENBQUM7S0FDdkM7OztZQTNHRixVQUFVOzs7O1lBTGtCLDBCQUEwQjtZQUMvQyxVQUFVO1lBRUksVUFBVTs7eUVBR25CLHlCQUF5Qiw0RUFBekIseUJBQXlCLFlBV2pCLDBCQUEwQixhQUFPLFVBQVUsYUFBdUIsVUFBVTttQ0FYcEYseUJBQXlCO2NBRHJDLFVBQVU7O2NBWVUsMEJBQTBCOztjQUFPLFVBQVU7O2NBQXVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi4vc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2Jyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcbiAgcHJpdmF0ZSBfcG9wU3RhdGVMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9oYXNoQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uVHlwZSA9IG51bGwgITtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNvdXJjZTogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHB1YmxpYyBpbml0aWFsaXplZDogUHJvbWlzZTxhbnk+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZFJlc29sdmUgITogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2Jyb2tlciA9IGJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZSA9IGJ1cy5mcm9tKFJPVVRFUl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChtc2c6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPnxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKG1zZy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnQnKSkge1xuICAgICAgICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1zZ1snZXZlbnQnXVsndHlwZSddO1xuICAgICAgICAgIGlmICh0eXBlID09PSAncG9wc3RhdGUnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdoYXNoY2hhbmdlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBwb3BTdGF0ZSBvciBoYXNoQ2hhbmdlIGV2ZW50LCBzbyB0aGUgbG9jYXRpb24gb2JqZWN0IHRoYXMgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobXNnWydsb2NhdGlvbiddLCBMb2NhdGlvblR5cGUpO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGZuOiBGdW5jdGlvbikgPT4gZm4obXNnWydldmVudCddKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IG5ldyBQcm9taXNlKHJlcyA9PiB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSA9IHJlcyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICoqL1xuICBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKCdnZXRMb2NhdGlvbicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgTG9jYXRpb25UeXBlKSAhLnRoZW4oXG4gICAgICAgICh2YWw6IExvY2F0aW9uVHlwZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7IHRocm93IG5ldyBFcnJvcihlcnIpOyB9KTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dGVtcHQgdG8gZ2V0IGJhc2UgaHJlZiBmcm9tIERPTSBmcm9tIFdlYldvcmtlci4gWW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSB2YWx1ZSBmb3IgdGhlIEFQUF9CQVNFX0hSRUYgdG9rZW4gdGhyb3VnaCBESSBvciB1c2UgdGhlIGhhc2ggbG9jYXRpb24gc3RyYXRlZ3kuJyk7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzLnB1c2goZm4pOyB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucGF0aG5hbWUgISA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IHNlYXJjaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5zZWFyY2ggOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBoYXNoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhhc2ggOiAnPHVua25vd24+JzsgfVxuXG4gIHNldCBwYXRobmFtZShuZXdQYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdCB0byBzZXQgcGF0aG5hbWUgYmVmb3JlIHZhbHVlIGlzIG9idGFpbmVkIGZyb20gVUknKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZSA9IG5ld1BhdGg7XG5cbiAgICBjb25zdCBmbkFyZ3MgPSBbbmV3IEZuQXJnKG5ld1BhdGgsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdzZXRQYXRobmFtZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdwdXNoU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncmVwbGFjZVN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdmb3J3YXJkJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnYmFjaycpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cbn1cbiJdfQ==