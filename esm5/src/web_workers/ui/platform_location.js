import { Injectable } from '@angular/core';
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import * as i0 from "@angular/core";
import * as i1 from "../shared/service_message_broker";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../shared/message_bus";
import * as i4 from "../shared/serializer";
var MessageBasedPlatformLocation = /** @class */ (function () {
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
        this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    MessageBasedPlatformLocation.prototype.start = function () {
        var P = 1 /* PRIMITIVE */;
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    };
    MessageBasedPlatformLocation.prototype._getLocation = function () {
        return Promise.resolve(this._platformLocation.location);
    };
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    };
    MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
    MessageBasedPlatformLocation.ngInjectableDef = i0.defineInjectable({ token: MessageBasedPlatformLocation, factory: function MessageBasedPlatformLocation_Factory(t) { return new (t || MessageBasedPlatformLocation)(i0.inject(i1.ServiceMessageBrokerFactory), i0.inject(i2.ɵBrowserPlatformLocation), i0.inject(i3.MessageBus), i0.inject(i4.Serializer)); }, providedIn: null });
    return MessageBasedPlatformLocation;
}());
export { MessageBasedPlatformLocation };
/*@__PURE__*/ i0.ɵsetClassMetadata(MessageBasedPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.ɵBrowserPlatformLocation }, { type: i3.MessageBus }, { type: i4.Serializer }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDOUYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRSxPQUFPLEVBQXVCLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7OztBQUVuRztJQUtFLHNDQUNZLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBeUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDRDQUFLLEdBQUw7UUFDRSxJQUFNLENBQUMsb0JBQTRCLENBQUM7UUFFcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTyxtREFBWSxHQUFwQjtRQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLDBEQUFtQixHQUEzQixVQUE0QixDQUFRO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDO1lBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztTQUN0RixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sbURBQVksR0FBcEIsVUFBcUIsUUFBZ0IsSUFBVSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0ZBMUNqRiw0QkFBNEIsK0VBQTVCLDRCQUE0Qjt1Q0FqQnpDO0NBNERDLEFBNUNELElBNENDO1NBM0NZLDRCQUE0QjttQ0FBNUIsNEJBQTRCO2NBRHhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiBhcyBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9jaGFubmVsU2luazogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHByaXZhdGUgX2Jyb2tlcjogU2VydmljZU1lc3NhZ2VCcm9rZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybUxvY2F0aW9uOiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25Qb3BTdGF0ZSg8TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcj50aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vbkhhc2hDaGFuZ2UoXG4gICAgICAgIDxMb2NhdGlvbkNoYW5nZUxpc3RlbmVyPnRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rID0gYnVzLnRvKFJPVVRFUl9DSEFOTkVMKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IFAgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFO1xuXG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKCdnZXRMb2NhdGlvbicsIG51bGwsIHRoaXMuX2dldExvY2F0aW9uLmJpbmQodGhpcyksIExvY2F0aW9uVHlwZSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKCdzZXRQYXRobmFtZScsIFtQXSwgdGhpcy5fc2V0UGF0aG5hbWUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncHVzaFN0YXRlJywgW1AsIFAsIFBdLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnB1c2hTdGF0ZS5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdyZXBsYWNlU3RhdGUnLCBbUCwgUCwgUF0sXG4gICAgICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucmVwbGFjZVN0YXRlLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2ZvcndhcmQnLCBudWxsLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmZvcndhcmQuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnYmFjaycsIG51bGwsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uYmFjay5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2F0aW9uKCk6IFByb21pc2U8TG9jYXRpb24+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VuZFVybENoYW5nZUV2ZW50KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY2hhbm5lbFNpbmsuZW1pdCh7XG4gICAgICAnZXZlbnQnOiB7J3R5cGUnOiBlLnR5cGV9LFxuICAgICAgJ2xvY2F0aW9uJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbiwgTG9jYXRpb25UeXBlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBhdGhuYW1lKHBhdGhuYW1lOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wYXRobmFtZSA9IHBhdGhuYW1lOyB9XG59XG4iXX0=