/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    get pathname() { return this._location ? (/** @type {?} */ (this._location.pathname)) : '<unknown>'; }
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
    { type: Injectable }
];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = () => [
    { type: ClientMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBeUIsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQWUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBc0IsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFHL0UsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGdCQUFnQjs7Ozs7O0lBVTdELFlBQ0ksYUFBeUMsRUFBRSxHQUFlLEVBQVUsV0FBdUI7UUFDN0YsS0FBSyxFQUFFLENBQUM7UUFEOEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFUdkYsdUJBQWtCLEdBQW9CLEVBQUUsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLGNBQVMsR0FBaUIsbUJBQUEsSUFBSSxFQUFFLENBQUM7UUFTdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzVCLElBQUk7Ozs7WUFBRSxDQUFD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Q0FBQzs7OztJQUVELElBQUk7O2NBQ0ksSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBM0dGLFVBQVU7Ozs7WUFMa0IsMEJBQTBCO1lBQy9DLFVBQVU7WUFFSSxVQUFVOzs7Ozs7O0lBSTlCLDRDQUFxQzs7Ozs7SUFDckMsdURBQWlEOzs7OztJQUNqRCx5REFBbUQ7Ozs7O0lBQ25ELDhDQUF5Qzs7Ozs7SUFDekMsbURBQTZDOztJQUM3QyxnREFBaUM7Ozs7O0lBRWpDLHVEQUF5Qzs7Ozs7SUFHdUIsZ0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiBleHRlbmRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9icm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG4gIHByaXZhdGUgX3BvcFN0YXRlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfaGFzaENoYW5nZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvblR5cGUgPSBudWxsICE7XG4gIHByaXZhdGUgX2NoYW5uZWxTb3VyY2U6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWRSZXNvbHZlICE6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBicm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9icm9rZXIgPSBicm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTb3VyY2UgPSBidXMuZnJvbShST1VURVJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9jaGFubmVsU291cmNlLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobXNnOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xuICAgICAgICBsZXQgbGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj58bnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChtc2cuaGFzT3duUHJvcGVydHkoJ2V2ZW50JykpIHtcbiAgICAgICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBtc2dbJ2V2ZW50J11bJ3R5cGUnXTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3BvcHN0YXRlJykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnM7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGFzaGNoYW5nZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgLy8gVGhlcmUgd2FzIGEgcG9wU3RhdGUgb3IgaGFzaENoYW5nZSBldmVudCwgc28gdGhlIGxvY2F0aW9uIG9iamVjdCB0aGFzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1zZ1snbG9jYXRpb24nXSwgTG9jYXRpb25UeXBlKTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChmbjogRnVuY3Rpb24pID0+IGZuKG1zZ1snZXZlbnQnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBuZXcgUHJvbWlzZShyZXMgPT4gdGhpcy5pbml0aWFsaXplZFJlc29sdmUgPSByZXMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqKi9cbiAgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBhcmdzOiBVaUFyZ3VtZW50cyA9IG5ldyBVaUFyZ3VtZW50cygnZ2V0TG9jYXRpb24nKTtcblxuICAgIHJldHVybiB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIExvY2F0aW9uVHlwZSkgIS50aGVuKFxuICAgICAgICAodmFsOiBMb2NhdGlvblR5cGUpID0+IHtcbiAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHZhbDtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4geyB0aHJvdyBuZXcgRXJyb3IoZXJyKTsgfSk7XG4gIH1cblxuICBnZXRCYXNlSHJlZkZyb21ET00oKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0IHRvIGdldCBiYXNlIGhyZWYgZnJvbSBET00gZnJvbSBXZWJXb3JrZXIuIFlvdSBtdXN0IGVpdGhlciBwcm92aWRlIGEgdmFsdWUgZm9yIHRoZSBBUFBfQkFTRV9IUkVGIHRva2VuIHRocm91Z2ggREkgb3IgdXNlIHRoZSBoYXNoIGxvY2F0aW9uIHN0cmF0ZWd5LicpO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQgeyB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycy5wdXNoKGZuKTsgfVxuXG4gIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQgeyB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzLnB1c2goZm4pOyB9XG5cbiAgZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lICEgOiAnPHVua25vd24+JzsgfVxuXG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uc2VhcmNoIDogJzx1bmtub3duPic7IH1cblxuICBnZXQgaGFzaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5oYXNoIDogJzx1bmtub3duPic7IH1cblxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2xvY2F0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gc2V0IHBhdGhuYW1lIGJlZm9yZSB2YWx1ZSBpcyBvYnRhaW5lZCBmcm9tIFVJJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9jYXRpb24ucGF0aG5hbWUgPSBuZXdQYXRoO1xuXG4gICAgY29uc3QgZm5BcmdzID0gW25ldyBGbkFyZyhuZXdQYXRoLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKV07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnc2V0UGF0aG5hbWUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncHVzaFN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3JlcGxhY2VTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnZm9yd2FyZCcpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2JhY2snKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG59XG4iXX0=