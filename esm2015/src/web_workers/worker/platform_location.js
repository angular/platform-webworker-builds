/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/worker/platform_location.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._location = (/** @type {?} */ (null));
        this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSource = bus.from(ROUTER_CHANNEL);
        this._channelSource.subscribe({
            next: (/**
             * @param {?} msg
             * @return {?}
             */
            (msg) => {
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
                        listeners.forEach((/**
                         * @param {?} fn
                         * @return {?}
                         */
                        (fn) => fn(msg['event'])));
                    }
                }
            })
        });
        this.initialized = new Promise((/**
         * @param {?} res
         * @return {?}
         */
        res => this.initializedResolve = res));
    }
    /**
     * \@internal *
     * @return {?}
     */
    init() {
        /** @type {?} */
        const args = new UiArguments('getLocation');
        return (/** @type {?} */ (this._broker.runOnService(args, LocationType))).then((/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            this._location = val;
            this.initializedResolve();
            return true;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => { throw new Error(err); }));
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
    get href() { return this._location ? (/** @type {?} */ (this._location.href)) : '<unknown>'; }
    /**
     * @return {?}
     */
    get hostname() { return this._location ? (/** @type {?} */ (this._location.host)) : '<unknown>'; }
    /**
     * @return {?}
     */
    get port() { return this._location ? (/** @type {?} */ (this._location.port)) : '<unknown>'; }
    /**
     * @return {?}
     */
    get protocol() { return this._location ? (/** @type {?} */ (this._location.protocol)) : '<unknown>'; }
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
    // History API isn't available on WebWorkers, therefore return undefined
    /**
     * @return {?}
     */
    getState() { return undefined; }
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
/** @nocollapse */ WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer)); };
/** @nocollapse */ WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac, providedIn: null });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._broker;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._popStateListeners;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._hashChangeListeners;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._location;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._channelSource;
    /** @type {?} */
    WebWorkerPlatformLocation.prototype.initialized;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype.initializedResolve;
    /**
     * @type {?}
     * @private
     */
    WebWorkerPlatformLocation.prototype._serializer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBeUIsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQWUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBc0IsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7OztBQUcvRSxNQUFNLE9BQU8seUJBQTBCLFNBQVEsZ0JBQWdCOzs7Ozs7SUFVN0QsWUFDSSxhQUF5QyxFQUFFLEdBQWUsRUFBVSxXQUF1QjtRQUM3RixLQUFLLEVBQUUsQ0FBQztRQUQ4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQVR2Rix1QkFBa0IsR0FBb0IsRUFBRSxDQUFDO1FBQ3pDLHlCQUFvQixHQUFvQixFQUFFLENBQUM7UUFDM0MsY0FBUyxHQUFpQixtQkFBQSxJQUFJLEVBQUUsQ0FBQztRQVN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSTs7OztZQUFF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Q0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLEdBQVc7O2NBQzNDLE1BQU0sR0FBRztZQUNiLElBQUksS0FBSyxDQUFDLEtBQUssb0JBQTRCO1lBQzNDLElBQUksS0FBSyxDQUFDLEtBQUssb0JBQTRCO1lBQzNDLElBQUksS0FBSyxDQUFDLEdBQUcsb0JBQTRCO1NBQzFDOztjQUNLLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsT0FBTzs7Y0FDQyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsSUFBSTs7Y0FDSSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUdELFFBQVEsS0FBYyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztZQXBIMUMsVUFBVTs7OztZQUxrQiwwQkFBMEI7WUFDL0MsVUFBVTtZQUVJLFVBQVU7O2tHQUduQix5QkFBeUI7aUVBQXpCLHlCQUF5QixXQUF6Qix5QkFBeUI7a0RBQXpCLHlCQUF5QjtjQURyQyxVQUFVOzs7Ozs7O0lBRVQsNENBQXFDOzs7OztJQUNyQyx1REFBaUQ7Ozs7O0lBQ2pELHlEQUFtRDs7Ozs7SUFDbkQsOENBQXlDOzs7OztJQUN6QyxtREFBNkM7O0lBQzdDLGdEQUFpQzs7Ozs7SUFFakMsdURBQXlDOzs7OztJQUd1QixnREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUJyb2tlciwgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIEZuQXJnLCBVaUFyZ3VtZW50c30gZnJvbSAnLi4vc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2Jyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcbiAgcHJpdmF0ZSBfcG9wU3RhdGVMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9oYXNoQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uVHlwZSA9IG51bGwgITtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNvdXJjZTogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHB1YmxpYyBpbml0aWFsaXplZDogUHJvbWlzZTxhbnk+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZFJlc29sdmUgITogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2Jyb2tlciA9IGJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZSA9IGJ1cy5mcm9tKFJPVVRFUl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChtc2c6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPnxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKG1zZy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnQnKSkge1xuICAgICAgICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1zZ1snZXZlbnQnXVsndHlwZSddO1xuICAgICAgICAgIGlmICh0eXBlID09PSAncG9wc3RhdGUnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdoYXNoY2hhbmdlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBwb3BTdGF0ZSBvciBoYXNoQ2hhbmdlIGV2ZW50LCBzbyB0aGUgbG9jYXRpb24gb2JqZWN0IHRoYXMgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobXNnWydsb2NhdGlvbiddLCBMb2NhdGlvblR5cGUpO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGZuOiBGdW5jdGlvbikgPT4gZm4obXNnWydldmVudCddKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IG5ldyBQcm9taXNlKHJlcyA9PiB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSA9IHJlcyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICoqL1xuICBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKCdnZXRMb2NhdGlvbicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgTG9jYXRpb25UeXBlKSAhLnRoZW4oXG4gICAgICAgICh2YWw6IExvY2F0aW9uVHlwZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7IHRocm93IG5ldyBFcnJvcihlcnIpOyB9KTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dGVtcHQgdG8gZ2V0IGJhc2UgaHJlZiBmcm9tIERPTSBmcm9tIFdlYldvcmtlci4gWW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSB2YWx1ZSBmb3IgdGhlIEFQUF9CQVNFX0hSRUYgdG9rZW4gdGhyb3VnaCBESSBvciB1c2UgdGhlIGhhc2ggbG9jYXRpb24gc3RyYXRlZ3kuJyk7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzLnB1c2goZm4pOyB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBnZXQgaHJlZigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ocmVmICEgOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBob3N0bmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ob3N0ICEgOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBwb3J0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnBvcnQgISA6ICc8dW5rbm93bj4nOyB9XG5cbiAgZ2V0IHByb3RvY29sKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnByb3RvY29sICEgOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uc2VhcmNoIDogJzx1bmtub3duPic7IH1cblxuICBnZXQgaGFzaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5oYXNoIDogJzx1bmtub3duPic7IH1cblxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2xvY2F0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gc2V0IHBhdGhuYW1lIGJlZm9yZSB2YWx1ZSBpcyBvYnRhaW5lZCBmcm9tIFVJJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9jYXRpb24ucGF0aG5hbWUgPSBuZXdQYXRoO1xuXG4gICAgY29uc3QgZm5BcmdzID0gW25ldyBGbkFyZyhuZXdQYXRoLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKV07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnc2V0UGF0aG5hbWUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncHVzaFN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3JlcGxhY2VTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnZm9yd2FyZCcpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2JhY2snKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgLy8gSGlzdG9yeSBBUEkgaXNuJ3QgYXZhaWxhYmxlIG9uIFdlYldvcmtlcnMsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24geyByZXR1cm4gdW5kZWZpbmVkOyB9XG59XG4iXX0=