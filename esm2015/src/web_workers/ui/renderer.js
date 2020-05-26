/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
import * as i0 from "@angular/core";
import * as i1 from "../shared/service_message_broker";
import * as i2 from "../shared/message_bus";
import * as i3 from "../shared/serializer";
import * as i4 from "../shared/render_store";
let MessageBasedRenderer2 = /** @class */ (() => {
    class MessageBasedRenderer2 {
        constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rendererFactory = _rendererFactory;
        }
        start() {
            const broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
            this._bus.initChannel(EVENT_2_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
            const [RSO, P, CRT] = [
                2 /* RENDER_STORE_OBJECT */,
                1 /* PRIMITIVE */,
                0 /* RENDERER_TYPE_2 */,
            ];
            const methods = [
                ['createRenderer', this.createRenderer, RSO, CRT, P],
                ['createElement', this.createElement, RSO, P, P, P],
                ['createComment', this.createComment, RSO, P, P],
                ['createText', this.createText, RSO, P, P],
                ['appendChild', this.appendChild, RSO, RSO, RSO],
                ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
                ['removeChild', this.removeChild, RSO, RSO, RSO],
                ['selectRootElement', this.selectRootElement, RSO, P, P],
                ['parentNode', this.parentNode, RSO, RSO, P],
                ['nextSibling', this.nextSibling, RSO, RSO, P],
                ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
                ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
                ['addClass', this.addClass, RSO, RSO, P],
                ['removeClass', this.removeClass, RSO, RSO, P],
                ['setStyle', this.setStyle, RSO, RSO, P, P, P],
                ['removeStyle', this.removeStyle, RSO, RSO, P, P],
                ['setProperty', this.setProperty, RSO, RSO, P, P],
                ['setValue', this.setValue, RSO, RSO, P],
                ['listen', this.listen, RSO, RSO, P, P, P],
                ['unlisten', this.unlisten, RSO, RSO],
                ['destroy', this.destroy, RSO],
                ['destroyNode', this.destroyNode, RSO, P]
            ];
            methods.forEach(([name, method, ...argTypes]) => {
                broker.registerMethod(name, argTypes, method.bind(this));
            });
        }
        destroy(r) {
            r.destroy();
        }
        destroyNode(r, node) {
            if (r.destroyNode) {
                r.destroyNode(node);
            }
            this._renderStore.remove(node);
        }
        createRenderer(el, type, id) {
            this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
        }
        createElement(r, name, namespace, id) {
            this._renderStore.store(r.createElement(name, namespace), id);
        }
        createComment(r, value, id) {
            this._renderStore.store(r.createComment(value), id);
        }
        createText(r, value, id) {
            this._renderStore.store(r.createText(value), id);
        }
        appendChild(r, parent, child) {
            r.appendChild(parent, child);
        }
        insertBefore(r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        }
        removeChild(r, parent, child) {
            r.removeChild(parent, child);
        }
        selectRootElement(r, selector, id) {
            this._renderStore.store(r.selectRootElement(selector), id);
        }
        parentNode(r, node, id) {
            this._renderStore.store(r.parentNode(node), id);
        }
        nextSibling(r, node, id) {
            this._renderStore.store(r.nextSibling(node), id);
        }
        setAttribute(r, el, name, value, namespace) {
            r.setAttribute(el, name, value, namespace);
        }
        removeAttribute(r, el, name, namespace) {
            r.removeAttribute(el, name, namespace);
        }
        addClass(r, el, name) {
            r.addClass(el, name);
        }
        removeClass(r, el, name) {
            r.removeClass(el, name);
        }
        setStyle(r, el, style, value, flags) {
            r.setStyle(el, style, value, flags);
        }
        removeStyle(r, el, style, flags) {
            r.removeStyle(el, style, flags);
        }
        setProperty(r, el, name, value) {
            r.setProperty(el, name, value);
        }
        setValue(r, node, value) {
            r.setValue(node, value);
        }
        listen(r, el, elName, eventName, unlistenId) {
            const listener = (event) => {
                return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
            };
            const unlisten = r.listen(el || elName, eventName, listener);
            this._renderStore.store(unlisten, unlistenId);
        }
        unlisten(r, unlisten) {
            unlisten();
        }
    }
    MessageBasedRenderer2.ɵfac = function MessageBasedRenderer2_Factory(t) { return new (t || MessageBasedRenderer2)(i0.ɵɵinject(i1.ServiceMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer), i0.ɵɵinject(i4.RenderStore), i0.ɵɵinject(i0.RendererFactory2)); };
    MessageBasedRenderer2.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedRenderer2, factory: MessageBasedRenderer2.ɵfac });
    return MessageBasedRenderer2;
})();
export { MessageBasedRenderer2 };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MessageBasedRenderer2, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }, { type: i0.RendererFactory2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBRXZEO0lBQUEsTUFDYSxxQkFBcUI7UUFJaEMsWUFDWSxjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsZ0JBQWtDO1lBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFDckUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtZQUMxRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQUcsQ0FBQztRQUVsRCxLQUFLO1lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxn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SUFBUyxFQUFFLEtBQWE7WUFDckQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUVPLE1BQU0sQ0FBQyxDQUFZLEVBQUUsRUFBTyxFQUFFLE1BQWMsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1lBQ3pGLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFTyxRQUFRLENBQUMsQ0FBWSxFQUFFLFFBQXVCO1lBQ3BELFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQzs7OEZBbEpVLHFCQUFxQjtpRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjtnQ0FsQmxDO0tBcUtDO1NBbkpZLHFCQUFxQjtrREFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0VWRU5UXzJfQ0hBTk5FTCwgUkVOREVSRVJfMl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuLi9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91aS9ldmVudF9kaXNwYXRjaGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXIhOiBFdmVudERpc3BhdGNoZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX2J1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfMl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2J1cy5pbml0Q2hhbm5lbChFVkVOVF8yX0NIQU5ORUwpO1xuICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIodGhpcy5fYnVzLnRvKEVWRU5UXzJfQ0hBTk5FTCksIHRoaXMuX3NlcmlhbGl6ZXIpO1xuXG4gICAgY29uc3QgW1JTTywgUCwgQ1JUXSA9IFtcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNULFxuICAgICAgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIsXG4gICAgXTtcblxuICAgIGNvbnN0IG1ldGhvZHM6IGFueVtdW10gPSBbXG4gICAgICBbJ2NyZWF0ZVJlbmRlcmVyJywgdGhpcy5jcmVhdGVSZW5kZXJlciwgUlNPLCBDUlQsIFBdLFxuICAgICAgWydjcmVhdGVFbGVtZW50JywgdGhpcy5jcmVhdGVFbGVtZW50LCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydjcmVhdGVDb21tZW50JywgdGhpcy5jcmVhdGVDb21tZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydjcmVhdGVUZXh0JywgdGhpcy5jcmVhdGVUZXh0LCBSU08sIFAsIFBdLFxuICAgICAgWydhcHBlbmRDaGlsZCcsIHRoaXMuYXBwZW5kQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydpbnNlcnRCZWZvcmUnLCB0aGlzLmluc2VydEJlZm9yZSwgUlNPLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsncmVtb3ZlQ2hpbGQnLCB0aGlzLnJlbW92ZUNoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnc2VsZWN0Um9vdEVsZW1lbnQnLCB0aGlzLnNlbGVjdFJvb3RFbGVtZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydwYXJlbnROb2RlJywgdGhpcy5wYXJlbnROb2RlLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ25leHRTaWJsaW5nJywgdGhpcy5uZXh0U2libGluZywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRBdHRyaWJ1dGUnLCB0aGlzLnNldEF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVBdHRyaWJ1dGUnLCB0aGlzLnJlbW92ZUF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydhZGRDbGFzcycsIHRoaXMuYWRkQ2xhc3MsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsncmVtb3ZlQ2xhc3MnLCB0aGlzLnJlbW92ZUNsYXNzLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldFN0eWxlJywgdGhpcy5zZXRTdHlsZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVTdHlsZScsIHRoaXMucmVtb3ZlU3R5bGUsIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnc2V0UHJvcGVydHknLCB0aGlzLnNldFByb3BlcnR5LCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ3NldFZhbHVlJywgdGhpcy5zZXRWYWx1ZSwgUlNPLCBSU08sIFBdLFxuICAgICAgWydsaXN0ZW4nLCB0aGlzLmxpc3RlbiwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWyd1bmxpc3RlbicsIHRoaXMudW5saXN0ZW4sIFJTTywgUlNPXSxcbiAgICAgIFsnZGVzdHJveScsIHRoaXMuZGVzdHJveSwgUlNPXSxcbiAgICAgIFsnZGVzdHJveU5vZGUnLCB0aGlzLmRlc3Ryb3lOb2RlLCBSU08sIFBdXG5cbiAgICBdO1xuXG4gICAgbWV0aG9kcy5mb3JFYWNoKChbbmFtZSwgbWV0aG9kLCAuLi5hcmdUeXBlc106IGFueVtdKSA9PiB7XG4gICAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QobmFtZSwgYXJnVHlwZXMsIG1ldGhvZC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveShyOiBSZW5kZXJlcjIpIHtcbiAgICByLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveU5vZGUocjogUmVuZGVyZXIyLCBub2RlOiBhbnkpIHtcbiAgICBpZiAoci5kZXN0cm95Tm9kZSkge1xuICAgICAgci5kZXN0cm95Tm9kZShub2RlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZW5kZXJlcihlbDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKGVsLCB0eXBlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50KHI6IFJlbmRlcmVyMiwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlRWxlbWVudChuYW1lLCBuYW1lc3BhY2UpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbW1lbnQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVDb21tZW50KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUZXh0KHI6IFJlbmRlcmVyMiwgdmFsdWU6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlVGV4dCh2YWx1ZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ2hpbGQocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkge1xuICAgIHIuYXBwZW5kQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gIH1cblxuICBwcml2YXRlIGluc2VydEJlZm9yZShyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55LCByZWY6IGFueSkge1xuICAgIHIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgY2hpbGQsIHJlZik7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHtcbiAgICByLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RSb290RWxlbWVudChyOiBSZW5kZXJlcjIsIHNlbGVjdG9yOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJlbnROb2RlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5wYXJlbnROb2RlKG5vZGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIG5leHRTaWJsaW5nKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5uZXh0U2libGluZyhub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZENsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgci5hZGRDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgci5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHNldFByb3BlcnR5KHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWx1ZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZykge1xuICAgIHIuc2V0VmFsdWUobm9kZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW4ocjogUmVuZGVyZXIyLCBlbDogYW55LCBlbE5hbWU6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChlbCwgZWxOYW1lLCBldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdW5saXN0ZW4gPSByLmxpc3RlbihlbCB8fCBlbE5hbWUsIGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVubGlzdGVuLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5saXN0ZW4ocjogUmVuZGVyZXIyLCB1bmxpc3RlbjogKCkgPT4gYm9vbGVhbikge1xuICAgIHVubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==