/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
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
import * as i0 from "@angular/core";
import * as i1 from "../shared/service_message_broker";
import * as i2 from "@angular/common";
import * as i3 from "../shared/message_bus";
import * as i4 from "../shared/serializer";
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
    MessageBasedPlatformLocation.ɵfac = function MessageBasedPlatformLocation_Factory(t) { return new (t || MessageBasedPlatformLocation)(i0.ɵɵinject(i1.ServiceMessageBrokerFactory), i0.ɵɵinject(i2.ɵBrowserPlatformLocation), i0.ɵɵinject(i3.MessageBus), i0.ɵɵinject(i4.Serializer)); };
    MessageBasedPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedPlatformLocation, factory: MessageBasedPlatformLocation.ɵfac });
    return MessageBasedPlatformLocation;
})();
export { MessageBasedPlatformLocation };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MessageBasedPlatformLocation, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.ɵBrowserPlatformLocation }, { type: i3.MessageBus }, { type: i4.Serializer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBeUIsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RyxPQUFPLEVBQWUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7QUFFbkc7SUFBQSxNQUNhLDRCQUE0QjtRQUl2QyxZQUNZLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7WUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1lBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7WUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBeUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELEtBQUs7WUFDSCxNQUFNLENBQUMsb0JBQTRCLENBQUM7WUFFcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUN2QixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ3ZCLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFTyxZQUFZO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVPLG1CQUFtQixDQUFDLENBQVE7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDO2dCQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7YUFDdEYsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVPLFlBQVksQ0FBQyxRQUFnQjtZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QyxDQUFDOzs0R0E1Q1UsNEJBQTRCO3dFQUE1Qiw0QkFBNEIsV0FBNUIsNEJBQTRCO3VDQWhCekM7S0E2REM7U0E3Q1ksNEJBQTRCO2tEQUE1Qiw0QkFBNEI7Y0FEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbkNoYW5nZUxpc3RlbmVyLCDJtUJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uIGFzIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtMb2NhdGlvblR5cGUsIFNlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNpbms6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwcml2YXRlIF9icm9rZXI6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uUG9wU3RhdGUoPExvY2F0aW9uQ2hhbmdlTGlzdGVuZXI+dGhpcy5fc2VuZFVybENoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKFxuICAgICAgICA8TG9jYXRpb25DaGFuZ2VMaXN0ZW5lcj50aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJPVVRFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9jaGFubmVsU2luayA9IGJ1cy50byhST1VURVJfQ0hBTk5FTCk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBQID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRTtcblxuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnZ2V0TG9jYXRpb24nLCBudWxsLCB0aGlzLl9nZXRMb2NhdGlvbi5iaW5kKHRoaXMpLCBMb2NhdGlvblR5cGUpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZCgnc2V0UGF0aG5hbWUnLCBbUF0sIHRoaXMuX3NldFBhdGhuYW1lLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3B1c2hTdGF0ZScsIFtQLCBQLCBQXSwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wdXNoU3RhdGUuYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncmVwbGFjZVN0YXRlJywgW1AsIFAsIFBdLFxuICAgICAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnJlcGxhY2VTdGF0ZS5iaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdmb3J3YXJkJywgbnVsbCwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkLmJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2JhY2snLCBudWxsLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmJhY2suYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhdGlvbigpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRVcmxDaGFuZ2VFdmVudChlOiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rLmVtaXQoe1xuICAgICAgJ2V2ZW50Jzogeyd0eXBlJzogZS50eXBlfSxcbiAgICAgICdsb2NhdGlvbic6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24sIExvY2F0aW9uVHlwZSksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYXRobmFtZShwYXRobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICB9XG59XG4iXX0=