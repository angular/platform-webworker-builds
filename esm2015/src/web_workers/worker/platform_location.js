/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/worker/platform_location.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQXlCLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXNCLDBCQUEwQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBRy9FLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxnQkFBZ0I7Ozs7OztJQVU3RCxZQUNJLGFBQXlDLEVBQUUsR0FBZSxFQUFVLFdBQXVCO1FBQzdGLEtBQUssRUFBRSxDQUFDO1FBRDhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBVHZGLHVCQUFrQixHQUFvQixFQUFFLENBQUM7UUFDekMseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxjQUFTLEdBQWlCLG1CQUFBLElBQUksRUFBQyxDQUFDO1FBU3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUM1QixJQUFJOzs7O1lBQUUsQ0FB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QUMsS0FBVSxFQUFFLEtBQWEsRUFBRSxHQUFXOztjQUMzQyxNQUFNLEdBQUc7WUFDYixJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtZQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFLLG9CQUE0QjtZQUMzQyxJQUFJLEtBQUssQ0FBQyxHQUFHLG9CQUE0QjtTQUMxQzs7Y0FDSyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELE9BQU87O2NBQ0MsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELElBQUk7O2NBQ0ksSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFHRCxRQUFRO1FBQ04sT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7O1lBeElGLFVBQVU7Ozs7WUFMa0IsMEJBQTBCO1lBQy9DLFVBQVU7WUFFSSxVQUFVOzs7Ozs7O0lBSTlCLDRDQUFxQzs7Ozs7SUFDckMsdURBQWlEOzs7OztJQUNqRCx5REFBbUQ7Ozs7O0lBQ25ELDhDQUF3Qzs7Ozs7SUFDeEMsbURBQTZDOztJQUM3QyxnREFBaUM7Ozs7O0lBRWpDLHVEQUF3Qzs7Ozs7SUFHd0IsZ0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiBleHRlbmRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9icm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG4gIHByaXZhdGUgX3BvcFN0YXRlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfaGFzaENoYW5nZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvblR5cGUgPSBudWxsITtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNvdXJjZTogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHB1YmxpYyBpbml0aWFsaXplZDogUHJvbWlzZTxhbnk+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZFJlc29sdmUhOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYnJva2VyID0gYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU291cmNlID0gYnVzLmZyb20oUk9VVEVSX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG1zZzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcbiAgICAgICAgbGV0IGxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+fG51bGwgPSBudWxsO1xuICAgICAgICBpZiAobXNnLmhhc093blByb3BlcnR5KCdldmVudCcpKSB7XG4gICAgICAgICAgY29uc3QgdHlwZTogc3RyaW5nID0gbXNnWydldmVudCddWyd0eXBlJ107XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdwb3BzdGF0ZScpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX3BvcFN0YXRlTGlzdGVuZXJzO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hhc2hjaGFuZ2UnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIFRoZXJlIHdhcyBhIHBvcFN0YXRlIG9yIGhhc2hDaGFuZ2UgZXZlbnQsIHNvIHRoZSBsb2NhdGlvbiBvYmplY3QgdGhhcyBiZWVuIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtc2dbJ2xvY2F0aW9uJ10sIExvY2F0aW9uVHlwZSk7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZm46IEZ1bmN0aW9uKSA9PiBmbihtc2dbJ2V2ZW50J10pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gbmV3IFByb21pc2UocmVzID0+IHRoaXMuaW5pdGlhbGl6ZWRSZXNvbHZlID0gcmVzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKiovXG4gIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgYXJnczogVWlBcmd1bWVudHMgPSBuZXcgVWlBcmd1bWVudHMoJ2dldExvY2F0aW9uJyk7XG5cbiAgICByZXR1cm4gdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBMb2NhdGlvblR5cGUpIS50aGVuKFxuICAgICAgICAodmFsOiBMb2NhdGlvblR5cGUpID0+IHtcbiAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IHZhbDtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVkUmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dGVtcHQgdG8gZ2V0IGJhc2UgaHJlZiBmcm9tIERPTSBmcm9tIFdlYldvcmtlci4gWW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSB2YWx1ZSBmb3IgdGhlIEFQUF9CQVNFX0hSRUYgdG9rZW4gdGhyb3VnaCBESSBvciB1c2UgdGhlIGhhc2ggbG9jYXRpb24gc3RyYXRlZ3kuJyk7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnMucHVzaChmbik7XG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgZ2V0IGhyZWYoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5ocmVmISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IGhvc3RuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24uaG9zdCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBwb3J0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uID8gdGhpcy5fbG9jYXRpb24ucG9ydCEgOiAnPHVua25vd24+JztcbiAgfVxuXG4gIGdldCBwcm90b2NvbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnByb3RvY29sISA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IHNlYXJjaCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbiA/IHRoaXMuX2xvY2F0aW9uLnNlYXJjaCA6ICc8dW5rbm93bj4nO1xuICB9XG5cbiAgZ2V0IGhhc2goKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24gPyB0aGlzLl9sb2NhdGlvbi5oYXNoIDogJzx1bmtub3duPic7XG4gIH1cblxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2xvY2F0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHQgdG8gc2V0IHBhdGhuYW1lIGJlZm9yZSB2YWx1ZSBpcyBvYnRhaW5lZCBmcm9tIFVJJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9jYXRpb24ucGF0aG5hbWUgPSBuZXdQYXRoO1xuXG4gICAgY29uc3QgZm5BcmdzID0gW25ldyBGbkFyZyhuZXdQYXRoLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKV07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnc2V0UGF0aG5hbWUnLCBmbkFyZ3MpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmbkFyZ3MgPSBbXG4gICAgICBuZXcgRm5Bcmcoc3RhdGUsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgICAgbmV3IEZuQXJnKHRpdGxlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh1cmwsIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpLFxuICAgIF07XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygncHVzaFN0YXRlJywgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm5BcmdzID0gW1xuICAgICAgbmV3IEZuQXJnKHN0YXRlLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICAgIG5ldyBGbkFyZyh0aXRsZSwgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSksXG4gICAgICBuZXcgRm5BcmcodXJsLCBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSxcbiAgICBdO1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ3JlcGxhY2VTdGF0ZScsIGZuQXJncyk7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cygnZm9yd2FyZCcpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoJ2JhY2snKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgLy8gSGlzdG9yeSBBUEkgaXNuJ3QgYXZhaWxhYmxlIG9uIFdlYldvcmtlcnMsIHRoZXJlZm9yZSByZXR1cm4gdW5kZWZpbmVkXG4gIGdldFN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==