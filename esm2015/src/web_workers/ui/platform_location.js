/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { ROUTER_CHANNEL } from '../shared/messaging_api';
import { LocationType, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
let MessageBasedPlatformLocation = /** @class */ (() => {
    class MessageBasedPlatformLocation {
        constructor(_brokerFactory, _platformLocation, bus, _serializer) {
            this._brokerFactory = _brokerFactory;
            this._platformLocation = _platformLocation;
            this._serializer = _serializer;
            this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
            this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
            this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
            this._channelSink = bus.to(ROUTER_CHANNEL);
        }
        start() {
            const P = 1 /* PRIMITIVE */;
            this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
            this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
            this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
            this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
            this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
            this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
        }
        _getLocation() {
            return Promise.resolve(this._platformLocation.location);
        }
        _sendUrlChangeEvent(e) {
            this._channelSink.emit({
                'event': { 'type': e.type },
                'location': this._serializer.serialize(this._platformLocation.location, LocationType),
            });
        }
        _setPathname(pathname) {
            this._platformLocation.pathname = pathname;
        }
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
    return MessageBasedPlatformLocation;
})();
export { MessageBasedPlatformLocation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBeUIsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RyxPQUFPLEVBQWUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRW5HO0lBQUEsTUFDYSw0QkFBNEI7UUFJdkMsWUFDWSxjQUEyQyxFQUMzQyxpQkFBMEMsRUFBRSxHQUFlLEVBQzNELFdBQXVCO1lBRnZCLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtZQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlCO1lBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1lBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQXlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxLQUFLO1lBQ0gsTUFBTSxDQUFDLG9CQUE0QixDQUFDO1lBRXBDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRU8sWUFBWTtZQUNsQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFTyxtQkFBbUIsQ0FBQyxDQUFRO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBQztnQkFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO2FBQ3RGLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTyxZQUFZLENBQUMsUUFBZ0I7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0MsQ0FBQzs7O2dCQTdDRixVQUFVOzs7O2dCQUZtQiwyQkFBMkI7Z0JBTEcsdUJBQXVCO2dCQUUzRSxVQUFVO2dCQUVJLFVBQVU7O0lBaURoQyxtQ0FBQztLQUFBO1NBN0NZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIMm1QnJvd3NlclBsYXRmb3JtTG9jYXRpb24gYXMgQnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1JPVVRFUl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZSwgU2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9jaGFubmVsU2luazogRXZlbnRFbWl0dGVyPE9iamVjdD47XG4gIHByaXZhdGUgX2Jyb2tlcjogU2VydmljZU1lc3NhZ2VCcm9rZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybUxvY2F0aW9uOiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbiwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25Qb3BTdGF0ZSg8TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcj50aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vbkhhc2hDaGFuZ2UoXG4gICAgICAgIDxMb2NhdGlvbkNoYW5nZUxpc3RlbmVyPnRoaXMuX3NlbmRVcmxDaGFuZ2VFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rID0gYnVzLnRvKFJPVVRFUl9DSEFOTkVMKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IFAgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFO1xuXG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKCdnZXRMb2NhdGlvbicsIG51bGwsIHRoaXMuX2dldExvY2F0aW9uLmJpbmQodGhpcyksIExvY2F0aW9uVHlwZSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKCdzZXRQYXRobmFtZScsIFtQXSwgdGhpcy5fc2V0UGF0aG5hbWUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncHVzaFN0YXRlJywgW1AsIFAsIFBdLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnB1c2hTdGF0ZS5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdyZXBsYWNlU3RhdGUnLCBbUCwgUCwgUF0sXG4gICAgICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucmVwbGFjZVN0YXRlLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2ZvcndhcmQnLCBudWxsLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmZvcndhcmQuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnYmFjaycsIG51bGwsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uYmFjay5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2F0aW9uKCk6IFByb21pc2U8TG9jYXRpb24+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VuZFVybENoYW5nZUV2ZW50KGU6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fY2hhbm5lbFNpbmsuZW1pdCh7XG4gICAgICAnZXZlbnQnOiB7J3R5cGUnOiBlLnR5cGV9LFxuICAgICAgJ2xvY2F0aW9uJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbiwgTG9jYXRpb25UeXBlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBhdGhuYW1lKHBhdGhuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gIH1cbn1cbiJdfQ==