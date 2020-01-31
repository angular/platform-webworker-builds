/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Injectable, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
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
    Serializer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RenderStore])
    ], Serializer);
    return Serializer;
}());
export { Serializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQXVCLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0IzQztJQUNFLHNCQUNXLElBQVksRUFBUyxRQUFnQixFQUFTLElBQVksRUFBUyxRQUFnQixFQUNuRixJQUFZLEVBQVMsUUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUN0RixNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNuRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3RGLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBQy9CLG1CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBR0Q7SUFDRSxvQkFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7SUFBRyxDQUFDO0lBRWpELDhCQUFTLEdBQVQsVUFBVSxHQUFRLEVBQUUsSUFBMkQ7UUFBL0UsaUJBaUJDO1FBakJtQixxQkFBQSxFQUFBLHdCQUEyRDtRQUM3RSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxzQkFBOEIsRUFBRTtZQUNyRCxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0Qs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L0IsVUFBZ0MsSUFBbUI7UUFDakQsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNiLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDbkQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xDLENBQUM7SUFDSixDQUFDO0lBRU8sOENBQXlCLEdBQWpDLFVBQWtDLEtBQTJCO1FBQzNELE9BQU87WUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUM7SUE5RVUsVUFBVTtRQUR0QixVQUFVLEVBQUU7eUNBRXVCLFdBQVc7T0FEbEMsVUFBVSxDQStFdEI7SUFBRCxpQkFBQztDQUFBLEFBL0VELElBK0VDO1NBL0VZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXJUeXBlMiwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vcmVuZGVyX3N0b3JlJztcblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlcmlhbGl6ZXJUeXBlcyB7XG4gIC8vIFJlbmRlcmVyVHlwZTJcbiAgUkVOREVSRVJfVFlQRV8yLFxuICAvLyBQcmltaXRpdmUgdHlwZXNcbiAgUFJJTUlUSVZFLFxuICAvLyBBbiBvYmplY3Qgc3RvcmVkIGluIGEgUmVuZGVyU3RvcmVcbiAgUkVOREVSX1NUT1JFX09CSkVDVCxcbn1cblxuZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGhyZWY6IHN0cmluZywgcHVibGljIHByb3RvY29sOiBzdHJpbmcsIHB1YmxpYyBob3N0OiBzdHJpbmcsIHB1YmxpYyBob3N0bmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHBvcnQ6IHN0cmluZywgcHVibGljIHBhdGhuYW1lOiBzdHJpbmd8bnVsbCwgcHVibGljIHNlYXJjaDogc3RyaW5nLCBwdWJsaWMgaGFzaDogc3RyaW5nLFxuICAgICAgcHVibGljIG9yaWdpbjogc3RyaW5nKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VyaWFsaXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge31cblxuICBzZXJpYWxpemUob2JqOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKTogT2JqZWN0IHtcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIG9iai5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShvYmopICE7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyZXJUeXBlMihvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplTG9jYXRpb24ob2JqKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBzZXJpYWxpemVyIGZvciB0eXBlICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgZGVzZXJpYWxpemUobWFwOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFLCBkYXRhPzogYW55KTpcbiAgICAgIGFueSB7XG4gICAgaWYgKG1hcCA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hcCkpIHtcbiAgICAgIHJldHVybiBtYXAubWFwKHZhbCA9PiB0aGlzLmRlc2VyaWFsaXplKHZhbCwgdHlwZSwgZGF0YSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5kZXNlcmlhbGl6ZShtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVMb2NhdGlvbihtYXApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGRlc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZUxvY2F0aW9uKGxvYzogTG9jYXRpb25UeXBlKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2hyZWYnOiBsb2MuaHJlZixcbiAgICAgICdwcm90b2NvbCc6IGxvYy5wcm90b2NvbCxcbiAgICAgICdob3N0JzogbG9jLmhvc3QsXG4gICAgICAnaG9zdG5hbWUnOiBsb2MuaG9zdG5hbWUsXG4gICAgICAncG9ydCc6IGxvYy5wb3J0LFxuICAgICAgJ3BhdGhuYW1lJzogbG9jLnBhdGhuYW1lLFxuICAgICAgJ3NlYXJjaCc6IGxvYy5zZWFyY2gsXG4gICAgICAnaGFzaCc6IGxvYy5oYXNoLFxuICAgICAgJ29yaWdpbic6IGxvYy5vcmlnaW4sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplTG9jYXRpb24obG9jOiB7W2tleTogc3RyaW5nXTogYW55fSk6IExvY2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhdGlvblR5cGUoXG4gICAgICAgIGxvY1snaHJlZiddLCBsb2NbJ3Byb3RvY29sJ10sIGxvY1snaG9zdCddLCBsb2NbJ2hvc3RuYW1lJ10sIGxvY1sncG9ydCddLCBsb2NbJ3BhdGhuYW1lJ10sXG4gICAgICAgIGxvY1snc2VhcmNoJ10sIGxvY1snaGFzaCddLCBsb2NbJ29yaWdpbiddKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIodHlwZTogUmVuZGVyZXJUeXBlMik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgICAnZGF0YSc6IHRoaXMuc2VyaWFsaXplKHR5cGUuZGF0YSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJlclR5cGUyIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzWydpZCddLFxuICAgICAgZW5jYXBzdWxhdGlvbjogcHJvcHNbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHN0eWxlczogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLFxuICAgICAgZGF0YTogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZGF0YSddKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==