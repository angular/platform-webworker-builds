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
import * as i1 from "./render_store";
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
    Serializer.ngFactoryDef = function Serializer_Factory(t) { return new (t || Serializer)(i0.ɵɵinject(i1.RenderStore)); };
    Serializer.ngInjectableDef = i0.ɵɵdefineInjectable({ token: Serializer, factory: function (t) { return Serializer.ngFactoryDef(t); }, providedIn: null });
    return Serializer;
}());
export { Serializer };
/*@__PURE__*/ i0.ɵsetClassMetadata(Serializer, [{
        type: Injectable
    }], function () { return [{ type: i1.RenderStore }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCM0M7SUFDRSxzQkFDVyxJQUFZLEVBQVMsUUFBZ0IsRUFBUyxJQUFZLEVBQVMsUUFBZ0IsRUFDbkYsSUFBWSxFQUFTLFFBQXFCLEVBQVMsTUFBYyxFQUFTLElBQVksRUFDdEYsTUFBYztRQUZkLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDbkYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN0RixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUMvQixtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDOztBQUVEO0lBRUUsb0JBQW9CLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQUcsQ0FBQztJQUVqRCw4QkFBUyxHQUFULFVBQVUsR0FBUSxFQUFFLElBQTJEO1FBQS9FLGlCQW9CQztRQXBCbUIscUJBQUEsRUFBQSx3QkFBMkQ7UUFDN0UsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksc0JBQThCLEVBQUU7WUFDckQsT0FBTyxHQUFHLENB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QUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xDLENBQUM7SUFDSixDQUFDO0lBRU8sOENBQXlCLEdBQWpDLFVBQWtDLEtBQTJCO1FBQzNELE9BQU87WUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUM7Z0ZBcEdVLFVBQVU7Z0VBQVYsVUFBVSxpQ0FBVixVQUFVO3FCQWpDdkI7Q0FzSUMsQUF0R0QsSUFzR0M7U0FyR1ksVUFBVTttQ0FBVixVQUFVO2NBRHRCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyQ29tcG9uZW50VHlwZSwgUmVuZGVyZXJUeXBlMiwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vcmVuZGVyX3N0b3JlJztcblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlcmlhbGl6ZXJUeXBlcyB7XG4gIC8vIFJlbmRlcmVyVHlwZTJcbiAgUkVOREVSRVJfVFlQRV8yLFxuICAvLyBQcmltaXRpdmUgdHlwZXNcbiAgUFJJTUlUSVZFLFxuICAvLyBBbiBvYmplY3Qgc3RvcmVkIGluIGEgUmVuZGVyU3RvcmVcbiAgUkVOREVSX1NUT1JFX09CSkVDVCxcbn1cblxuZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGhyZWY6IHN0cmluZywgcHVibGljIHByb3RvY29sOiBzdHJpbmcsIHB1YmxpYyBob3N0OiBzdHJpbmcsIHB1YmxpYyBob3N0bmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHBvcnQ6IHN0cmluZywgcHVibGljIHBhdGhuYW1lOiBzdHJpbmd8bnVsbCwgcHVibGljIHNlYXJjaDogc3RyaW5nLCBwdWJsaWMgaGFzaDogc3RyaW5nLFxuICAgICAgcHVibGljIG9yaWdpbjogc3RyaW5nKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VyaWFsaXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge31cblxuICBzZXJpYWxpemUob2JqOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKTogT2JqZWN0IHtcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIG9iai5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShvYmopICE7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBSZW5kZXJDb21wb25lbnRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZShvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSwgZGF0YT86IGFueSk6XG4gICAgICBhbnkge1xuICAgIGlmIChtYXAgPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXApKSB7XG4gICAgICByZXR1cm4gbWFwLm1hcCh2YWwgPT4gdGhpcy5kZXNlcmlhbGl6ZSh2YWwsIHR5cGUsIGRhdGEpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplTG9jYXRpb24obWFwKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZUxvY2F0aW9uKGxvYzoge1trZXk6IHN0cmluZ106IGFueX0pOiBMb2NhdGlvblR5cGUge1xuICAgIHJldHVybiBuZXcgTG9jYXRpb25UeXBlKFxuICAgICAgICBsb2NbJ2hyZWYnXSwgbG9jWydwcm90b2NvbCddLCBsb2NbJ2hvc3QnXSwgbG9jWydob3N0bmFtZSddLCBsb2NbJ3BvcnQnXSwgbG9jWydwYXRobmFtZSddLFxuICAgICAgICBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKHR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAnaWQnOiB0eXBlLmlkLFxuICAgICAgJ3RlbXBsYXRlVXJsJzogdHlwZS50ZW1wbGF0ZVVybCxcbiAgICAgICdzbG90Q291bnQnOiB0eXBlLnNsb3RDb3VudCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZShwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlckNvbXBvbmVudFR5cGUoXG4gICAgICAgIHByb3BzWydpZCddLCBwcm9wc1sndGVtcGxhdGVVcmwnXSwgcHJvcHNbJ3Nsb3RDb3VudCddLFxuICAgICAgICB0aGlzLmRlc2VyaWFsaXplKHByb3BzWydlbmNhcHN1bGF0aW9uJ10pLCB0aGlzLmRlc2VyaWFsaXplKHByb3BzWydzdHlsZXMnXSksIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIodHlwZTogUmVuZGVyZXJUeXBlMik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgICAnZGF0YSc6IHRoaXMuc2VyaWFsaXplKHR5cGUuZGF0YSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJlclR5cGUyIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzWydpZCddLFxuICAgICAgZW5jYXBzdWxhdGlvbjogcHJvcHNbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHN0eWxlczogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLFxuICAgICAgZGF0YTogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZGF0YSddKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==