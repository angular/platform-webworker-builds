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
import { Injectable } from '@angular/core';
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
export class MessageBasedPlatformLocation {
    /**
     * @param {?} _brokerFactory
     * @param {?} _platformLocation
     * @param {?} bus
     * @param {?} _serializer
     */
    constructor(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._platformLocation.onHashChange(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    /**
     * @return {?}
     */
    start() {
        /** @type {?} */
        const P = 1 /* PRIMITIVE */;
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    }
    /**
     * @return {?}
     */
    _getLocation() {
        return Promise.resolve(this._platformLocation.location);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _sendUrlChangeEvent(e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    }
    /**
     * @param {?} pathname
     * @return {?}
     */
    _setPathname(pathname) { this._platformLocation.pathname = pathname; }
}
MessageBasedPlatformLocation.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MessageBasedPlatformLocation.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory },
    { type: BrowserPlatformLocation },
    { type: MessageBus },
    { type: Serializer }
];
if (false) {
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._channelSink;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._broker;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._brokerFactory;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._platformLocation;
    /** @type {?} */
    MessageBasedPlatformLocation.prototype._serializer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQy9FLE9BQU8sRUFBdUIsMkJBQTJCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUduRyxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7O0lBSXZDLFlBQ1ksZ0JBQ0EsbUJBQTRDLEdBQWUsRUFDM0Q7UUFGQSxtQkFBYyxHQUFkLGNBQWM7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxtQkFBeUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLG1CQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzVDOzs7O0lBRUQsS0FBSzs7UUFDSCxNQUFNLENBQUMscUJBQTZCO1FBRXBDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztLQUM3RTs7OztJQUVPLFlBQVk7UUFDbEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBR2xELG1CQUFtQixDQUFDLENBQVE7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDckIsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUM7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO1NBQ3RGLENBQUMsQ0FBQzs7Ozs7O0lBR0csWUFBWSxDQUFDLFFBQWdCLElBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7OztZQTNDM0YsVUFBVTs7OztZQUZtQiwyQkFBMkI7WUFKckIsdUJBQXVCO1lBQ25ELFVBQVU7WUFFSSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uQ2hhbmdlTGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1QnJvd3NlclBsYXRmb3JtTG9jYXRpb24gYXMgQnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNpbms6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwcml2YXRlIF9icm9rZXI6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uUG9wU3RhdGUoPExvY2F0aW9uQ2hhbmdlTGlzdGVuZXI+dGhpcy5fc2VuZFVybENoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKFxuICAgICAgICA8TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcj50aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU2luayA9IGJ1cy50byhST1VURVJfQ0hBTk5FTCk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBQID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRTtcblxuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnZ2V0TG9jYXRpb24nLCBudWxsLCB0aGlzLl9nZXRMb2NhdGlvbi5iaW5kKHRoaXMpLCBMb2NhdGlvblR5cGUpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnc2V0UGF0aG5hbWUnLCBbUF0sIHRoaXMuX3NldFBhdGhuYW1lLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3B1c2hTdGF0ZScsIFtQLCBQLCBQXSwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wdXNoU3RhdGUuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncmVwbGFjZVN0YXRlJywgW1AsIFAsIFBdLFxuICAgICAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnJlcGxhY2VTdGF0ZS5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdmb3J3YXJkJywgbnVsbCwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2JhY2snLCBudWxsLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmJhY2suYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhdGlvbigpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRVcmxDaGFuZ2VFdmVudChlOiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rLmVtaXQoe1xuICAgICAgJ2V2ZW50Jzogeyd0eXBlJzogZS50eXBlfSxcbiAgICAgICdsb2NhdGlvbic6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24sIExvY2F0aW9uVHlwZSksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYXRobmFtZShwYXRobmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWUgPSBwYXRobmFtZTsgfVxufVxuIl19