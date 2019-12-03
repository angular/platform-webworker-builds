/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
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
    Serializer.ɵfac = function Serializer_Factory(t) { return new (t || Serializer)(i0.ɵɵinject(i1.RenderStore)); };
    Serializer.ɵprov = i0.ɵɵdefineInjectable({ token: Serializer, factory: Serializer.ɵfac });
    return Serializer;
}());
export { Serializer };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Serializer, [{
        type: Injectable
    }], function () { return [{ type: i1.RenderStore }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCM0M7SUFDRSxzQkFDVyxJQUFZLEVBQVMsUUFBZ0IsRUFBUyxJQUFZLEVBQVMsUUFBZ0IsRUFDbkYsSUFBWSxFQUFTLFFBQXFCLEVBQVMsTUFBYyxFQUFTLElBQVksRUFDdEYsTUFBYztRQUZkLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDbkYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN0RixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUMvQixtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDOztBQUVEO0lBRUUsb0JBQW9CLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQUcsQ0FBQztJQUVqRCw4QkFBUyxHQUFULFVBQVUsR0FBUSxFQUFFLElBQTJEO1FBQS9FLGlCQWlCQztRQWpCbUIscUJBQUEsRUFBQSx3QkFBMkQ7UUFDN0UsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksc0JBQThCLEVBQUU7WUFDckQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNE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QS9CLFVBQWdDLElBQW1CO1FBQ2pELE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ25ELFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVPLDhDQUF5QixHQUFqQyxVQUFrQyxLQUEyQjtRQUMzRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZixhQUFhLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDLENBQUM7SUFDSixDQUFDO3dFQTlFVSxVQUFVO3NEQUFWLFVBQVUsV0FBVixVQUFVO3FCQWpDdkI7Q0FnSEMsQUFoRkQsSUFnRkM7U0EvRVksVUFBVTtrREFBVixVQUFVO2NBRHRCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXJUeXBlMiwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vcmVuZGVyX3N0b3JlJztcblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlcmlhbGl6ZXJUeXBlcyB7XG4gIC8vIFJlbmRlcmVyVHlwZTJcbiAgUkVOREVSRVJfVFlQRV8yLFxuICAvLyBQcmltaXRpdmUgdHlwZXNcbiAgUFJJTUlUSVZFLFxuICAvLyBBbiBvYmplY3Qgc3RvcmVkIGluIGEgUmVuZGVyU3RvcmVcbiAgUkVOREVSX1NUT1JFX09CSkVDVCxcbn1cblxuZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGhyZWY6IHN0cmluZywgcHVibGljIHByb3RvY29sOiBzdHJpbmcsIHB1YmxpYyBob3N0OiBzdHJpbmcsIHB1YmxpYyBob3N0bmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHBvcnQ6IHN0cmluZywgcHVibGljIHBhdGhuYW1lOiBzdHJpbmd8bnVsbCwgcHVibGljIHNlYXJjaDogc3RyaW5nLCBwdWJsaWMgaGFzaDogc3RyaW5nLFxuICAgICAgcHVibGljIG9yaWdpbjogc3RyaW5nKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VyaWFsaXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge31cblxuICBzZXJpYWxpemUob2JqOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKTogT2JqZWN0IHtcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIG9iai5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShvYmopICE7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyZXJUeXBlMihvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplTG9jYXRpb24ob2JqKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBzZXJpYWxpemVyIGZvciB0eXBlICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgZGVzZXJpYWxpemUobWFwOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFLCBkYXRhPzogYW55KTpcbiAgICAgIGFueSB7XG4gICAgaWYgKG1hcCA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hcCkpIHtcbiAgICAgIHJldHVybiBtYXAubWFwKHZhbCA9PiB0aGlzLmRlc2VyaWFsaXplKHZhbCwgdHlwZSwgZGF0YSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5kZXNlcmlhbGl6ZShtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVMb2NhdGlvbihtYXApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGRlc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZUxvY2F0aW9uKGxvYzogTG9jYXRpb25UeXBlKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2hyZWYnOiBsb2MuaHJlZixcbiAgICAgICdwcm90b2NvbCc6IGxvYy5wcm90b2NvbCxcbiAgICAgICdob3N0JzogbG9jLmhvc3QsXG4gICAgICAnaG9zdG5hbWUnOiBsb2MuaG9zdG5hbWUsXG4gICAgICAncG9ydCc6IGxvYy5wb3J0LFxuICAgICAgJ3BhdGhuYW1lJzogbG9jLnBhdGhuYW1lLFxuICAgICAgJ3NlYXJjaCc6IGxvYy5zZWFyY2gsXG4gICAgICAnaGFzaCc6IGxvYy5oYXNoLFxuICAgICAgJ29yaWdpbic6IGxvYy5vcmlnaW4sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplTG9jYXRpb24obG9jOiB7W2tleTogc3RyaW5nXTogYW55fSk6IExvY2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhdGlvblR5cGUoXG4gICAgICAgIGxvY1snaHJlZiddLCBsb2NbJ3Byb3RvY29sJ10sIGxvY1snaG9zdCddLCBsb2NbJ2hvc3RuYW1lJ10sIGxvY1sncG9ydCddLCBsb2NbJ3BhdGhuYW1lJ10sXG4gICAgICAgIGxvY1snc2VhcmNoJ10sIGxvY1snaGFzaCddLCBsb2NbJ29yaWdpbiddKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIodHlwZTogUmVuZGVyZXJUeXBlMik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgICAnZGF0YSc6IHRoaXMuc2VyaWFsaXplKHR5cGUuZGF0YSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJlclR5cGUyIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzWydpZCddLFxuICAgICAgZW5jYXBzdWxhdGlvbjogcHJvcHNbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHN0eWxlczogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLFxuICAgICAgZGF0YTogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZGF0YSddKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==