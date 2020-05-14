/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/platform_location.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import * as i0 from "@angular/core";
import * as i1 from "../shared/service_message_broker";
import * as i2 from "@angular/common";
import * as i3 from "../shared/message_bus";
import * as i4 from "../shared/serializer";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MessageBasedPlatformLocation = /** @class */ (() => {
    class MessageBasedPlatformLocation {
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
            this._platformLocation.onPopState((/** @type {?} */ (this._sendUrlChangeEvent.bind(this))));
            this._platformLocation.onHashChange((/** @type {?} */ (this._sendUrlChangeEvent.bind(this))));
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
         * @private
         * @return {?}
         */
        _getLocation() {
            return Promise.resolve(this._platformLocation.location);
        }
        /**
         * @private
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
         * @private
         * @param {?} pathname
         * @return {?}
         */
        _setPathname(pathname) {
            this._platformLocation.pathname = pathname;
        }
    }
    MessageBasedPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageBasedPlatformLocation.ctorParameters = () => [
        { type: ServiceMessageBrokerFactory },
        { type: BrowserPlatformLocation },
        { type: MessageBus },
        { type: Serializer }
    ];
    /** @nocollapse */ MessageBasedPlatformLocation.ɵfac = function MessageBasedPlatformLocation_Factory(t) { return new (t || MessageBasedPlatformLocation)(i0.ɵɵinject(i1.ServiceMessageBrokerFactory), i0.ɵɵinject(i2.ɵBrowserPlatformLocation), i0.ɵɵinject(i3.MessageBus), i0.ɵɵinject(i4.Serializer)); };
    /** @nocollapse */ MessageBasedPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedPlatformLocation, factory: MessageBasedPlatformLocation.ɵfac });
    return MessageBasedPlatformLocation;
})();
export { MessageBasedPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MessageBasedPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.ɵBrowserPlatformLocation }, { type: i3.MessageBus }, { type: i4.Serializer }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    MessageBasedPlatformLocation.prototype._channelSink;
    /**
     * @type {?}
     * @private
     */
    MessageBasedPlatformLocation.prototype._broker;
    /**
     * @type {?}
     * @private
     */
    MessageBasedPlatformLocation.prototype._brokerFactory;
    /**
     * @type {?}
     * @private
     */
    MessageBasedPlatformLocation.prototype._platformLocation;
    /**
     * @type {?}
     * @private
     */
    MessageBasedPlatformLocation.prototype._serializer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUF5Qix3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVHLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRSxPQUFPLEVBQXVCLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFbkc7SUFBQSxNQUNhLDRCQUE0Qjs7Ozs7OztRQUl2QyxZQUNZLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7WUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1lBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7WUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxtQkFBd0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDL0IsbUJBQXdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7OztRQUVELEtBQUs7O2tCQUNHLENBQUMsb0JBQTRCO1lBRW5DLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDOzs7OztRQUVPLFlBQVk7WUFDbEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDOzs7Ozs7UUFFTyxtQkFBbUIsQ0FBQyxDQUFRO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBQztnQkFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO2FBQ3RGLENBQUMsQ0FBQztRQUNMLENBQUM7Ozs7OztRQUVPLFlBQVksQ0FBQyxRQUFnQjtZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QyxDQUFDOzs7Z0JBN0NGLFVBQVU7Ozs7Z0JBRm1CLDJCQUEyQjtnQkFMRyx1QkFBdUI7Z0JBRTNFLFVBQVU7Z0JBRUksVUFBVTs7K0hBSW5CLDRCQUE0QjsyRkFBNUIsNEJBQTRCLFdBQTVCLDRCQUE0Qjt1Q0FoQnpDO0tBNkRDO1NBN0NZLDRCQUE0QjtrREFBNUIsNEJBQTRCO2NBRHhDLFVBQVU7Ozs7Ozs7SUFFVCxvREFBMkM7Ozs7O0lBQzNDLCtDQUFzQzs7Ozs7SUFHbEMsc0RBQW1EOzs7OztJQUNuRCx5REFBa0Q7Ozs7O0lBQ2xELG1EQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCDJtUJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uIGFzIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNpbms6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwcml2YXRlIF9icm9rZXI6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uUG9wU3RhdGUoPExvY2F0aW9uQ2hhbmdlTGlzdGVuZXI+dGhpcy5fc2VuZFVybENoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKFxuICAgICAgICA8TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcj50aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU2luayA9IGJ1cy50byhST1VURVJfQ0hBTk5FTCk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBQID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRTtcblxuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnZ2V0TG9jYXRpb24nLCBudWxsLCB0aGlzLl9nZXRMb2NhdGlvbi5iaW5kKHRoaXMpLCBMb2NhdGlvblR5cGUpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnc2V0UGF0aG5hbWUnLCBbUF0sIHRoaXMuX3NldFBhdGhuYW1lLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3B1c2hTdGF0ZScsIFtQLCBQLCBQXSwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wdXNoU3RhdGUuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncmVwbGFjZVN0YXRlJywgW1AsIFAsIFBdLFxuICAgICAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnJlcGxhY2VTdGF0ZS5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdmb3J3YXJkJywgbnVsbCwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2JhY2snLCBudWxsLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmJhY2suYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhdGlvbigpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRVcmxDaGFuZ2VFdmVudChlOiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rLmVtaXQoe1xuICAgICAgJ2V2ZW50Jzogeyd0eXBlJzogZS50eXBlfSxcbiAgICAgICdsb2NhdGlvbic6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24sIExvY2F0aW9uVHlwZSksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYXRobmFtZShwYXRobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICB9XG59XG4iXX0=