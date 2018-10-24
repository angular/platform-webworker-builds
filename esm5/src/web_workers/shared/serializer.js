/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
import * as i0 from "@angular/core";
var LocationType = /** @class */ (function () {
    function LocationType(href, protocol, host, hostname, port, pathname, search, hash, origin) {
        this.href = href;
        this.protocol = protocol;
        this.host = host;
        this.hostname = hostname;
        this.port = port;
        this.pathname = pathname;
        this.search = search;
        this.hash = hash;
        this.origin = origin;
    }
    return LocationType;
}());
export { LocationType };
var Serializer = /** @class */ (function () {
    function Serializer(_renderStore) {
        this._renderStore = _renderStore;
    }
    Serializer.prototype.serialize = function (obj, type) {
        var _this = this;
        if (type === void 0) { type = 1 /* PRIMITIVE */; }
        if (obj == null || type === 1 /* PRIMITIVE */) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(function (v) { return _this.serialize(v, type); });
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return this._renderStore.serialize(obj);
        }
        if (type === RenderComponentType) {
            return this._serializeRenderComponentType(obj);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._serializeRendererType2(obj);
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error("No serializer for type " + stringify(type));
    };
    Serializer.prototype.deserialize = function (map, type, data) {
        var _this = this;
        if (type === void 0) { type = 1 /* PRIMITIVE */; }
        if (map == null || type === 1 /* PRIMITIVE */) {
            return map;
        }
        if (Array.isArray(map)) {
            return map.map(function (val) { return _this.deserialize(val, type, data); });
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return this._renderStore.deserialize(map);
        }
        if (type === RenderComponentType) {
            return this._deserializeRenderComponentType(map);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._deserializeRendererType2(map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error("No deserializer for type " + stringify(type));
    };
    Serializer.prototype._serializeLocation = function (loc) {
        return {
            'href': loc.href,
            'protocol': loc.protocol,
            'host': loc.host,
            'hostname': loc.hostname,
            'port': loc.port,
            'pathname': loc.pathname,
            'search': loc.search,
            'hash': loc.hash,
            'origin': loc.origin,
        };
    };
    Serializer.prototype._deserializeLocation = function (loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    };
    Serializer.prototype._serializeRenderComponentType = function (type) {
        return {
            'id': type.id,
            'templateUrl': type.templateUrl,
            'slotCount': type.slotCount,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
        };
    };
    Serializer.prototype._deserializeRenderComponentType = function (props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    };
    Serializer.prototype._serializeRendererType2 = function (type) {
        return {
            'id': type.id,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
            'data': this.serialize(type.data),
        };
    };
    Serializer.prototype._deserializeRendererType2 = function (props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    };
    Serializer.ngInjectableDef = i0.defineInjectable({ token: Serializer, factory: function Serializer_Factory(t) { return new (t || Serializer)(i0.inject(RenderStore)); }, providedIn: null });
    return Serializer;
}());
export { Serializer };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBZTNDO0lBQ0Usc0JBQ1csSUFBWSxFQUFTLFFBQWdCLEVBQVMsSUFBWSxFQUFTLFFBQWdCLEVBQ25GLElBQVksRUFBUyxRQUFxQixFQUFTLE1BQWMsRUFBUyxJQUFZLEVBQ3RGLE1BQWM7UUFGZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ25GLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFDdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFDL0IsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7QUFFRDtJQUVFLG9CQUFvQixZQUF5QjtRQUF6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtJQUFHLENBQUM7SUFFakQsOEJBQVMsR0FBVCxVQUFVLEdBQVEsRUFBRSxJQUEyRDtRQUEvRSxpQkFvQkM7UUFwQm1CLHFCQUFBLEVBQUEsd0JBQTJEO1FBQzdFLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLHNCQUE4QixFQUFFO1lBQ3JELE9BQU8sR0FBRyxDQUFD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QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVPLDhDQUF5QixHQUFqQyxVQUFrQyxLQUEyQjtRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZixhQUFhLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDLENBQUM7SUFDSixDQUFDOzhEQXBHVSxVQUFVLDZEQUFWLFVBQVUsWUFDYSxXQUFXO3FCQWpDL0M7Q0FxSUMsQUF0R0QsSUFzR0M7U0FyR1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJDb21wb25lbnRUeXBlLCBSZW5kZXJlclR5cGUyLCBUeXBlLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi9yZW5kZXJfc3RvcmUnO1xuXG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZXJpYWxpemVyVHlwZXMge1xuICAvLyBSZW5kZXJlclR5cGUyXG4gIFJFTkRFUkVSX1RZUEVfMixcbiAgLy8gUHJpbWl0aXZlIHR5cGVzXG4gIFBSSU1JVElWRSxcbiAgLy8gQW4gb2JqZWN0IHN0b3JlZCBpbiBhIFJlbmRlclN0b3JlXG4gIFJFTkRFUl9TVE9SRV9PQkpFQ1QsXG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvblR5cGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBocmVmOiBzdHJpbmcsIHB1YmxpYyBwcm90b2NvbDogc3RyaW5nLCBwdWJsaWMgaG9zdDogc3RyaW5nLCBwdWJsaWMgaG9zdG5hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBwb3J0OiBzdHJpbmcsIHB1YmxpYyBwYXRobmFtZTogc3RyaW5nfG51bGwsIHB1YmxpYyBzZWFyY2g6IHN0cmluZywgcHVibGljIGhhc2g6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBvcmlnaW46IHN0cmluZykge31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcmlhbGl6ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUpIHt9XG5cbiAgc2VyaWFsaXplKG9iajogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSk6IE9iamVjdCB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmoubWFwKHYgPT4gdGhpcy5zZXJpYWxpemUodiwgdHlwZSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUob2JqKSAhO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gUmVuZGVyQ29tcG9uZW50VHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVSZW5kZXJlclR5cGUyKG9iaik7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBMb2NhdGlvblR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVMb2NhdGlvbihvYmopO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBkZXNlcmlhbGl6ZShtYXA6IGFueSwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUsIGRhdGE/OiBhbnkpOlxuICAgICAgYW55IHtcbiAgICBpZiAobWFwID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWFwKSkge1xuICAgICAgcmV0dXJuIG1hcC5tYXAodmFsID0+IHRoaXMuZGVzZXJpYWxpemUodmFsLCB0eXBlLCBkYXRhKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLmRlc2VyaWFsaXplKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBSZW5kZXJDb21wb25lbnRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVSZW5kZXJlclR5cGUyKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBMb2NhdGlvblR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZUxvY2F0aW9uKG1hcCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gZGVzZXJpYWxpemVyIGZvciB0eXBlICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VyaWFsaXplTG9jYXRpb24obG9jOiBMb2NhdGlvblR5cGUpOiBPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAnaHJlZic6IGxvYy5ocmVmLFxuICAgICAgJ3Byb3RvY29sJzogbG9jLnByb3RvY29sLFxuICAgICAgJ2hvc3QnOiBsb2MuaG9zdCxcbiAgICAgICdob3N0bmFtZSc6IGxvYy5ob3N0bmFtZSxcbiAgICAgICdwb3J0JzogbG9jLnBvcnQsXG4gICAgICAncGF0aG5hbWUnOiBsb2MucGF0aG5hbWUsXG4gICAgICAnc2VhcmNoJzogbG9jLnNlYXJjaCxcbiAgICAgICdoYXNoJzogbG9jLmhhc2gsXG4gICAgICAnb3JpZ2luJzogbG9jLm9yaWdpbixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzZXJpYWxpemVMb2NhdGlvbihsb2M6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogTG9jYXRpb25UeXBlIHtcbiAgICByZXR1cm4gbmV3IExvY2F0aW9uVHlwZShcbiAgICAgICAgbG9jWydocmVmJ10sIGxvY1sncHJvdG9jb2wnXSwgbG9jWydob3N0J10sIGxvY1snaG9zdG5hbWUnXSwgbG9jWydwb3J0J10sIGxvY1sncGF0aG5hbWUnXSxcbiAgICAgICAgbG9jWydzZWFyY2gnXSwgbG9jWydoYXNoJ10sIGxvY1snb3JpZ2luJ10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZSh0eXBlOiBSZW5kZXJDb21wb25lbnRUeXBlKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IHR5cGUudGVtcGxhdGVVcmwsXG4gICAgICAnc2xvdENvdW50JzogdHlwZS5zbG90Q291bnQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyQ29tcG9uZW50VHlwZSB7XG4gICAgcmV0dXJuIG5ldyBSZW5kZXJDb21wb25lbnRUeXBlKFxuICAgICAgICBwcm9wc1snaWQnXSwgcHJvcHNbJ3RlbXBsYXRlVXJsJ10sIHByb3BzWydzbG90Q291bnQnXSxcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZW5jYXBzdWxhdGlvbiddKSwgdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLCB7fSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJlclR5cGUyKHR5cGU6IFJlbmRlcmVyVHlwZTIpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IHR5cGUuaWQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgICAgJ2RhdGEnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLmRhdGEpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyZXJUeXBlMiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wc1snaWQnXSxcbiAgICAgIGVuY2Fwc3VsYXRpb246IHByb3BzWydlbmNhcHN1bGF0aW9uJ10sXG4gICAgICBzdHlsZXM6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ3N0eWxlcyddKSxcbiAgICAgIGRhdGE6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ2RhdGEnXSlcbiAgICB9O1xuICB9XG59XG4iXX0=