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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUF5Qix3QkFBd0IsSUFBSSx1QkFBdUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVHLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRSxPQUFPLEVBQXVCLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFHbkcsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7OztJQUl2QyxZQUNZLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxtQkFBd0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDL0IsbUJBQXdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELEtBQUs7O2NBQ0csQ0FBQyxvQkFBNEI7UUFFbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUVPLG1CQUFtQixDQUFDLENBQVE7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDckIsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUM7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO1NBQ3RGLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxRQUFnQjtRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QyxDQUFDOzs7WUE3Q0YsVUFBVTs7OztZQUZtQiwyQkFBMkI7WUFMRyx1QkFBdUI7WUFFM0UsVUFBVTtZQUVJLFVBQVU7OzJIQUluQiw0QkFBNEI7dUZBQTVCLDRCQUE0QixXQUE1Qiw0QkFBNEI7a0RBQTVCLDRCQUE0QjtjQUR4QyxVQUFVOzs7Ozs7O0lBRVQsb0RBQTJDOzs7OztJQUMzQywrQ0FBc0M7Ozs7O0lBR2xDLHNEQUFtRDs7Ozs7SUFDbkQseURBQWtEOzs7OztJQUNsRCxtREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lciwgybVCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiBhcyBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXIsIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2NoYW5uZWxTaW5rOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHJpdmF0ZSBfYnJva2VyOiBTZXJ2aWNlTWVzc2FnZUJyb2tlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtTG9jYXRpb246IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLCBidXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vblBvcFN0YXRlKDxMb2NhdGlvbkNoYW5nZUxpc3RlbmVyPnRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uSGFzaENoYW5nZShcbiAgICAgICAgPExvY2F0aW9uQ2hhbmdlTGlzdGVuZXI+dGhpcy5fc2VuZFVybENoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNpbmsgPSBidXMudG8oUk9VVEVSX0NIQU5ORUwpO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgUCA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkU7XG5cbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoJ2dldExvY2F0aW9uJywgbnVsbCwgdGhpcy5fZ2V0TG9jYXRpb24uYmluZCh0aGlzKSwgTG9jYXRpb25UeXBlKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoJ3NldFBhdGhuYW1lJywgW1BdLCB0aGlzLl9zZXRQYXRobmFtZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdwdXNoU3RhdGUnLCBbUCwgUCwgUF0sIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucHVzaFN0YXRlLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3JlcGxhY2VTdGF0ZScsIFtQLCBQLCBQXSxcbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnZm9yd2FyZCcsIG51bGwsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uZm9yd2FyZC5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdiYWNrJywgbnVsbCwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5iYWNrLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYXRpb24oKTogUHJvbWlzZTxMb2NhdGlvbj4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9zZW5kVXJsQ2hhbmdlRXZlbnQoZTogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFubmVsU2luay5lbWl0KHtcbiAgICAgICdldmVudCc6IHsndHlwZSc6IGUudHlwZX0sXG4gICAgICAnbG9jYXRpb24nOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uLCBMb2NhdGlvblR5cGUpLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0UGF0aG5hbWUocGF0aG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgfVxufVxuIl19