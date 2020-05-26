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
export class LocationType {
    constructor(href, protocol, host, hostname, port, pathname, search, hash, origin) {
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
}
let Serializer = /** @class */ (() => {
    let Serializer = class Serializer {
        constructor(_renderStore) {
            this._renderStore = _renderStore;
        }
        serialize(obj, type = 1 /* PRIMITIVE */) {
            if (obj == null || type === 1 /* PRIMITIVE */) {
                return obj;
            }
            if (Array.isArray(obj)) {
                return obj.map(v => this.serialize(v, type));
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
            throw new Error(`No serializer for type ${stringify(type)}`);
        }
        deserialize(map, type = 1 /* PRIMITIVE */, data) {
            if (map == null || type === 1 /* PRIMITIVE */) {
                return map;
            }
            if (Array.isArray(map)) {
                return map.map(val => this.deserialize(val, type, data));
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
            throw new Error(`No deserializer for type ${stringify(type)}`);
        }
        _serializeLocation(loc) {
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
        }
        _deserializeLocation(loc) {
            return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
        }
        _serializeRendererType2(type) {
            return {
                'id': type.id,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles),
                'data': this.serialize(type.data),
            };
        }
        _deserializeRendererType2(props) {
            return {
                id: props['id'],
                encapsulation: props['encapsulation'],
                styles: this.deserialize(props['styles']),
                data: this.deserialize(props['data'])
            };
        }
    };
    Serializer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RenderStore])
    ], Serializer);
    return Serializer;
})();
export { Serializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQXVCLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBaUIzQyxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUNXLElBQVksRUFBUyxRQUFnQixFQUFTLElBQVksRUFBUyxRQUFnQixFQUNuRixJQUFZLEVBQVMsUUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUN0RixNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNuRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3RGLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0NBQzlCO0FBR0Q7SUFBQSxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO1FBQ3JCLFlBQW9CLFlBQXlCO1lBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQUcsQ0FBQztRQUVqRCxTQUFTLENBQUMsR0FBUSxFQUFFLHdCQUEyRDtZQUM3RSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxzQkFBOEIsRUFBRTtnQkFDckQsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENB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LElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQ25ELFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEMsQ0FBQztRQUNKLENBQUM7UUFFTyx5QkFBeUIsQ0FBQyxLQUEyQjtZQUMzRCxPQUFPO2dCQUNMLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0QyxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUE7SUEvRVksVUFBVTtRQUR0QixVQUFVLEVBQUU7eUNBRXVCLFdBQVc7T0FEbEMsVUFBVSxDQStFdEI7SUFBRCxpQkFBQztLQUFBO1NBL0VZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXJUeXBlMiwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4vcmVuZGVyX3N0b3JlJztcblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZXJpYWxpemVyVHlwZXMge1xuICAvLyBSZW5kZXJlclR5cGUyXG4gIFJFTkRFUkVSX1RZUEVfMixcbiAgLy8gUHJpbWl0aXZlIHR5cGVzXG4gIFBSSU1JVElWRSxcbiAgLy8gQW4gb2JqZWN0IHN0b3JlZCBpbiBhIFJlbmRlclN0b3JlXG4gIFJFTkRFUl9TVE9SRV9PQkpFQ1QsXG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvblR5cGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBocmVmOiBzdHJpbmcsIHB1YmxpYyBwcm90b2NvbDogc3RyaW5nLCBwdWJsaWMgaG9zdDogc3RyaW5nLCBwdWJsaWMgaG9zdG5hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBwb3J0OiBzdHJpbmcsIHB1YmxpYyBwYXRobmFtZTogc3RyaW5nfG51bGwsIHB1YmxpYyBzZWFyY2g6IHN0cmluZywgcHVibGljIGhhc2g6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBvcmlnaW46IHN0cmluZykge31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcmlhbGl6ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUpIHt9XG5cbiAgc2VyaWFsaXplKG9iajogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSk6IE9iamVjdCB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmoubWFwKHYgPT4gdGhpcy5zZXJpYWxpemUodiwgdHlwZSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUob2JqKSE7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyZXJUeXBlMihvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplTG9jYXRpb24ob2JqKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBzZXJpYWxpemVyIGZvciB0eXBlICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgZGVzZXJpYWxpemUobWFwOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFLCBkYXRhPzogYW55KTpcbiAgICAgIGFueSB7XG4gICAgaWYgKG1hcCA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hcCkpIHtcbiAgICAgIHJldHVybiBtYXAubWFwKHZhbCA9PiB0aGlzLmRlc2VyaWFsaXplKHZhbCwgdHlwZSwgZGF0YSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5kZXNlcmlhbGl6ZShtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihtYXApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVMb2NhdGlvbihtYXApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGRlc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZUxvY2F0aW9uKGxvYzogTG9jYXRpb25UeXBlKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2hyZWYnOiBsb2MuaHJlZixcbiAgICAgICdwcm90b2NvbCc6IGxvYy5wcm90b2NvbCxcbiAgICAgICdob3N0JzogbG9jLmhvc3QsXG4gICAgICAnaG9zdG5hbWUnOiBsb2MuaG9zdG5hbWUsXG4gICAgICAncG9ydCc6IGxvYy5wb3J0LFxuICAgICAgJ3BhdGhuYW1lJzogbG9jLnBhdGhuYW1lLFxuICAgICAgJ3NlYXJjaCc6IGxvYy5zZWFyY2gsXG4gICAgICAnaGFzaCc6IGxvYy5oYXNoLFxuICAgICAgJ29yaWdpbic6IGxvYy5vcmlnaW4sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplTG9jYXRpb24obG9jOiB7W2tleTogc3RyaW5nXTogYW55fSk6IExvY2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhdGlvblR5cGUoXG4gICAgICAgIGxvY1snaHJlZiddLCBsb2NbJ3Byb3RvY29sJ10sIGxvY1snaG9zdCddLCBsb2NbJ2hvc3RuYW1lJ10sIGxvY1sncG9ydCddLCBsb2NbJ3BhdGhuYW1lJ10sXG4gICAgICAgIGxvY1snc2VhcmNoJ10sIGxvY1snaGFzaCddLCBsb2NbJ29yaWdpbiddKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIodHlwZTogUmVuZGVyZXJUeXBlMik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgICAnZGF0YSc6IHRoaXMuc2VyaWFsaXplKHR5cGUuZGF0YSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJlclR5cGUyIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzWydpZCddLFxuICAgICAgZW5jYXBzdWxhdGlvbjogcHJvcHNbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHN0eWxlczogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLFxuICAgICAgZGF0YTogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZGF0YSddKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==