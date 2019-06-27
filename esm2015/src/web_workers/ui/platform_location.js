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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFlLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQy9FLE9BQU8sRUFBdUIsMkJBQTJCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUduRyxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7O0lBSXZDLFlBQ1ksY0FBMkMsRUFDM0MsaUJBQTBDLEVBQUUsR0FBZSxFQUMzRCxXQUF1QjtRQUZ2QixtQkFBYyxHQUFkLGNBQWMsQ0FBNkI7UUFDM0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF5QjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLG1CQUF3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUMvQixtQkFBd0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDRyxDQUFDLG9CQUE0QjtRQUVuQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsQ0FBUTtRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBQztZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7U0FDdEYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLFFBQWdCLElBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7WUEzQzdGLFVBQVU7Ozs7WUFGbUIsMkJBQTJCO1lBSnJCLHVCQUF1QjtZQUNuRCxVQUFVO1lBRUksVUFBVTs7Ozs7OztJQUs5QixvREFBMkM7Ozs7O0lBQzNDLCtDQUFzQzs7Ozs7SUFHbEMsc0RBQW1EOzs7OztJQUNuRCx5REFBa0Q7Ozs7O0lBQ2xELG1EQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtUJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uIGFzIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7TG9jYXRpb25UeXBlLCBTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXIsIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2NoYW5uZWxTaW5rOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcbiAgcHJpdmF0ZSBfYnJva2VyOiBTZXJ2aWNlTWVzc2FnZUJyb2tlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtTG9jYXRpb246IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLCBidXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vblBvcFN0YXRlKDxMb2NhdGlvbkNoYW5nZUxpc3RlbmVyPnRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uSGFzaENoYW5nZShcbiAgICAgICAgPExvY2F0aW9uQ2hhbmdlTGlzdGVuZXI+dGhpcy5fc2VuZFVybENoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihST1VURVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fY2hhbm5lbFNpbmsgPSBidXMudG8oUk9VVEVSX0NIQU5ORUwpO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgUCA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkU7XG5cbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoJ2dldExvY2F0aW9uJywgbnVsbCwgdGhpcy5fZ2V0TG9jYXRpb24uYmluZCh0aGlzKSwgTG9jYXRpb25UeXBlKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoJ3NldFBhdGhuYW1lJywgW1BdLCB0aGlzLl9zZXRQYXRobmFtZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdwdXNoU3RhdGUnLCBbUCwgUCwgUF0sIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucHVzaFN0YXRlLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3JlcGxhY2VTdGF0ZScsIFtQLCBQLCBQXSxcbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnZm9yd2FyZCcsIG51bGwsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uZm9yd2FyZC5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdiYWNrJywgbnVsbCwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5iYWNrLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYXRpb24oKTogUHJvbWlzZTxMb2NhdGlvbj4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9zZW5kVXJsQ2hhbmdlRXZlbnQoZTogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFubmVsU2luay5lbWl0KHtcbiAgICAgICdldmVudCc6IHsndHlwZSc6IGUudHlwZX0sXG4gICAgICAnbG9jYXRpb24nOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uLCBMb2NhdGlvblR5cGUpLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0UGF0aG5hbWUocGF0aG5hbWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnBhdGhuYW1lID0gcGF0aG5hbWU7IH1cbn1cbiJdfQ==