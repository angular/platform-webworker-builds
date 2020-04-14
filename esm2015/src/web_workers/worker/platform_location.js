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
        err => {
            throw new Error(err);
        }));
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
    onPopState(fn) {
        this._popStateListeners.push(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) {
        this._hashChangeListeners.push(fn);
    }
    /**
     * @return {?}
     */
    get href() {
        return this._location ? (/** @type {?} */ (this._location.href)) : '<unknown>';
    }
    /**
     * @return {?}
     */
    get hostname() {
        return this._location ? (/** @type {?} */ (this._location.host)) : '<unknown>';
    }
    /**
     * @return {?}
     */
    get port() {
        return this._location ? (/** @type {?} */ (this._location.port)) : '<unknown>';
    }
    /**
     * @return {?}
     */
    get protocol() {
        return this._location ? (/** @type {?} */ (this._location.protocol)) : '<unknown>';
    }
    /**
     * @return {?}
     */
    get search() {
        return this._location ? this._location.search : '<unknown>';
    }
    /**
     * @return {?}
     */
    get hash() {
        return this._location ? this._location.hash : '<unknown>';
    }
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
    getState() {
        return undefined;
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
/** @nocollapse */ WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer)); };
/** @nocollapse */ WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBeUIsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQWUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBc0IsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7OztBQUcvRSxNQUFNLE9BQU8seUJBQTBCLFNBQVEsZ0JBQWdCOzs7Ozs7SUFVN0QsWUFDSSxhQUF5QyxFQUFFLEdBQWUsRUFBVSxXQUF1QjtRQUM3RixLQUFLLEVBQUUsQ0FBQztRQUQ4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQVR2Rix1QkFBa0IsR0FBb0IsRUFBRSxDQUFDO1FBQ3pDLHlCQUFvQixHQUFvQixFQUFFLENBQUM7UUFDM0MsY0FBUyxHQUFpQixtQkFBQSxJQUFJLEVBQUMsQ0FBQztRQVN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSTs7OztZQUFF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WSxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsR0FBVzs7Y0FDM0MsTUFBTSxHQUFHO1lBQ2IsSUFBSSxLQUFLLENBQUMsS0FBSyxvQkFBNEI7WUFDM0MsSUFBSSxLQUFLLENBQUMsS0FBSyxvQkFBNEI7WUFDM0MsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBNEI7U0FDMUM7O2NBQ0ssSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxPQUFPOztjQUNDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxJQUFJOztjQUNJLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBR0QsUUFBUTtRQUNOLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OztZQXhJRixVQUFVOzs7O1lBTGtCLDBCQUEwQjtZQUMvQyxVQUFVO1lBRUksVUFBVTs7cUhBR25CLHlCQUF5QjtvRkFBekIseUJBQXlCLFdBQXpCLHlCQUF5QjtrREFBekIseUJBQXlCO2NBRHJDLFVBQVU7Ozs7Ozs7SUFFVCw0Q0FBcUM7Ozs7O0lBQ3JDLHVEQUFpRDs7Ozs7SUFDakQseURBQW1EOzs7OztJQUNuRCw4Q0FBd0M7Ozs7O0lBQ3hDLG1EQUE2Qzs7SUFDN0MsZ0RBQWlDOzs7OztJQUVqQyx1REFBd0M7Ozs7O0lBR3dCLGdEQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuLi9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24gZXh0ZW5kcyBQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfYnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuICBwcml2YXRlIF9wb3BTdGF0ZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2hhc2hDaGFuZ2VMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb25UeXBlID0gbnVsbCE7XG4gIHByaXZhdGUgX2NoYW5uZWxTb3VyY2U6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWRSZXNvbHZlITogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2Jyb2tlciA9IGJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZSA9IGJ1cy5mcm9tKFJPVVRFUl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChtc2c6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPnxudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKG1zZy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnQnKSkge1xuICAgICAgICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1zZ1snZXZlbnQnXVsndHlwZSddO1xuICAgICAgICAgIGlmICh0eXBlID09PSAncG9wc3RhdGUnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdoYXNoY2hhbmdlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBwb3BTdGF0ZSBvciBoYXNoQ2hhbmdlIGV2ZW50LCBzbyB0aGUgbG9jYXRpb24gb2JqZWN0IHRoYXMgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobXNnWydsb2NhdGlvbiddLCBMb2NhdGlvblR5cGUpO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGZuOiBGdW5jdGlvbikgPT4gZm4obXNnWydldmVudCddKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IG5ldyBQcm9taXNlKHJlcyA9PiB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSA9IHJlcyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICoqL1xuICBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKCdnZXRMb2NhdGlvbicpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgTG9jYXRpb25UeXBlKSEudGhlbihcbiAgICAgICAgKHZhbDogTG9jYXRpb25UeXBlKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB2YWw7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplZFJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0IHRvIGdldCBiYXNlIGhyZWYgZnJvbSBET00gZnJvbSBXZWJXb3JrZXIuIFlvdSBtdXN0IGVpdGhlciBwcm92aWRlIGEgdmFsdWUgZm9yIHRoZSBBUFBfQkFTRV9IUkVGIHRva2VuIHRocm91Z2ggREkgb3IgdXNlIHRoZSBoYXNoIGxvY2F0aW9uIHN0cmF0ZWd5LicpO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgdGhpcy5faGFzaENoYW5nZUxpc3RlbmVycy5wdXNoKGZuKTtcbiAgfVxuXG4gIGdldCBocmVmKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaHJlZiEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBob3N0bmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLmhvc3QhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgcG9ydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnBvcnQhIDogJzx1bmtub3duPic7XG4gIH1cblxuICBnZXQgcHJvdG9jb2woKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5wcm90b2NvbCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5zZWFyY2ggOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBoYXNoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaGFzaCA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgc2V0IHBhdGhuYW1lKG5ld1BhdGg6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9sb2NhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0IHRvIHNldCBwYXRobmFtZSBiZWZvcmUgdmFsdWUgaXMgb2J0YWluZWQgZnJvbSBVSScpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDtcblxuICAgIGNvbnN0IGZuQXJncyA9IFtuZXcgRm5BcmcobmV3UGF0aCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSldO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3NldFBhdGhuYW1lJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3B1c2hTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZuQXJncyA9IFtcbiAgICAgIG5ldyBGbkFyZyhzdGF0ZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodGl0bGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHVybCwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgXTtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdyZXBsYWNlU3RhdGUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2ZvcndhcmQnKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKCdiYWNrJyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIC8vIEhpc3RvcnkgQVBJIGlzbid0IGF2YWlsYWJsZSBvbiBXZWJXb3JrZXJzLCB0aGVyZWZvcmUgcmV0dXJuIHVuZGVmaW5lZFxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=