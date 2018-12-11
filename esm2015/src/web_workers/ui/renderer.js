import { Injectable, RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class MessageBasedRenderer2 {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rendererFactory
     */
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    /**
     * @return {?}
     */
    start() {
        /** @type {?} */
        const broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        this._bus.initChannel(EVENT_2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
        const [RSO, P, CRT] = [
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_2 */,
        ];
        /** @type {?} */
        const methods = [
            ['createRenderer', this.createRenderer, RSO, CRT, P],
            ['createElement', this.createElement, RSO, P, P, P],
            ['createComment', this.createComment, RSO, P, P], ['createText', this.createText, RSO, P, P],
            ['appendChild', this.appendChild, RSO, RSO, RSO],
            ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
            ['removeChild', this.removeChild, RSO, RSO, RSO],
            ['selectRootElement', this.selectRootElement, RSO, P, P],
            ['parentNode', this.parentNode, RSO, RSO, P], ['nextSibling', this.nextSibling, RSO, RSO, P],
            ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
            ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
            ['addClass', this.addClass, RSO, RSO, P], ['removeClass', this.removeClass, RSO, RSO, P],
            ['setStyle', this.setStyle, RSO, RSO, P, P, P],
            ['removeStyle', this.removeStyle, RSO, RSO, P, P],
            ['setProperty', this.setProperty, RSO, RSO, P, P], ['setValue', this.setValue, RSO, RSO, P],
            ['listen', this.listen, RSO, RSO, P, P, P], ['unlisten', this.unlisten, RSO, RSO],
            ['destroy', this.destroy, RSO], ['destroyNode', this.destroyNode, RSO, P]
        ];
        methods.forEach(([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        });
    }
    /**
     * @param {?} r
     * @return {?}
     */
    destroy(r) { r.destroy(); }
    /**
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    destroyNode(r, node) {
        if (r.destroyNode) {
            r.destroyNode(node);
        }
        this._renderStore.remove(node);
    }
    /**
     * @param {?} el
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    createRenderer(el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    }
    /**
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    createElement(r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    }
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createComment(r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    }
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createText(r, value, id) {
        this._renderStore.store(r.createText(value), id);
    }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    appendChild(r, parent, child) { r.appendChild(parent, child); }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    insertBefore(r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    removeChild(r, parent, child) { r.removeChild(parent, child); }
    /**
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    selectRootElement(r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    parentNode(r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    nextSibling(r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?} namespace
     * @return {?}
     */
    setAttribute(r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    removeAttribute(r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(r, el, name) { r.addClass(el, name); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(r, el, name) { r.removeClass(el, name); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(r, el, style, flags) {
        r.removeStyle(el, style, flags);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(r, el, name, value) {
        r.setProperty(el, name, value);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(r, node, value) { r.setValue(node, value); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    listen(r, el, elName, eventName, unlistenId) {
        /** @type {?} */
        const listener = (event) => {
            return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        };
        /** @type {?} */
        const unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    }
    /**
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    unlisten(r, unlisten) { unlisten(); }
}
MessageBasedRenderer2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedRenderer2.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer },
    { type: RenderStore },
    { type: RendererFactory2 }
];
MessageBasedRenderer2.ngInjectableDef = i0.defineInjectable({ token: MessageBasedRenderer2, factory: function MessageBasedRenderer2_Factory(t) { return new (t || MessageBasedRenderer2)(i0.inject(ServiceMessageBrokerFactory), i0.inject(MessageBus), i0.inject(Serializer), i0.inject(RenderStore), i0.inject(RendererFactory2)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(MessageBasedRenderer2, [{
        type: Injectable
    }], [{
        type: ServiceMessageBrokerFactory
    }, {
        type: MessageBus
    }, {
        type: Serializer
    }, {
        type: RenderStore
    }, {
        type: RendererFactory2
    }], null);
if (false) {
    /** @type {?} */
    MessageBasedRenderer2.prototype._eventDispatcher;
    /** @type {?} */
    MessageBasedRenderer2.prototype._brokerFactory;
    /** @type {?} */
    MessageBasedRenderer2.prototype._bus;
    /** @type {?} */
    MessageBasedRenderer2.prototype._serializer;
    /** @type {?} */
    MessageBasedRenderer2.prototype._renderStore;
    /** @type {?} */
    MessageBasedRenderer2.prototype._rendererFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUd2RCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7OztJQUloQyxZQUNZLGdCQUFxRCxJQUFnQixFQUNyRSxhQUFpQyxZQUF5QixFQUMxRDtRQUZBLG1CQUFjLEdBQWQsY0FBYztRQUF1QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3JFLGdCQUFXLEdBQVgsV0FBVztRQUFzQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUMxRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCO0tBQXNCOzs7O0lBRWxELEtBQUs7O1FBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUs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QUFNLFFBQVEsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hGLENBQUM7O1FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7SUFHeEMsUUFBUSxDQUFDLENBQVksRUFBRSxRQUF1QixJQUFJLFFBQVEsRUFBRSxDQUFDOzs7WUEvSHRFLFVBQVU7Ozs7WUFIbUIsMkJBQTJCO1lBSmpELFVBQVU7WUFHVixVQUFVO1lBRFYsV0FBVztZQUpZLGdCQUFnQjs7cUVBVWxDLHFCQUFxQix3RUFBckIscUJBQXFCLFlBS0osMkJBQTJCLGFBQWdCLFVBQVUsYUFDeEQsVUFBVSxhQUF3QixXQUFXLGFBQ3hDLGdCQUFnQjttQ0FQbkMscUJBQXFCO2NBRGpDLFVBQVU7O2NBTW1CLDJCQUEyQjs7Y0FBZ0IsVUFBVTs7Y0FDeEQsVUFBVTs7Y0FBd0IsV0FBVzs7Y0FDeEMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7RVZFTlRfMl9DSEFOTkVMLCBSRU5ERVJFUl8yX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4uL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXIsIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uL3VpL2V2ZW50X2Rpc3BhdGNoZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUmVuZGVyZXIyIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX2V2ZW50RGlzcGF0Y2hlciAhOiBFdmVudERpc3BhdGNoZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX2J1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfMl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2J1cy5pbml0Q2hhbm5lbChFVkVOVF8yX0NIQU5ORUwpO1xuICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIodGhpcy5fYnVzLnRvKEVWRU5UXzJfQ0hBTk5FTCksIHRoaXMuX3NlcmlhbGl6ZXIpO1xuXG4gICAgY29uc3QgW1JTTywgUCwgQ1JUXSA9IFtcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNULFxuICAgICAgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIsXG4gICAgXTtcblxuICAgIGNvbnN0IG1ldGhvZHM6IGFueVtdW10gPSBbXG4gICAgICBbJ2NyZWF0ZVJlbmRlcmVyJywgdGhpcy5jcmVhdGVSZW5kZXJlciwgUlNPLCBDUlQsIFBdLFxuICAgICAgWydjcmVhdGVFbGVtZW50JywgdGhpcy5jcmVhdGVFbGVtZW50LCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydjcmVhdGVDb21tZW50JywgdGhpcy5jcmVhdGVDb21tZW50LCBSU08sIFAsIFBdLCBbJ2NyZWF0ZVRleHQnLCB0aGlzLmNyZWF0ZVRleHQsIFJTTywgUCwgUF0sXG4gICAgICBbJ2FwcGVuZENoaWxkJywgdGhpcy5hcHBlbmRDaGlsZCwgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ2luc2VydEJlZm9yZScsIHRoaXMuaW5zZXJ0QmVmb3JlLCBSU08sIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydyZW1vdmVDaGlsZCcsIHRoaXMucmVtb3ZlQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydzZWxlY3RSb290RWxlbWVudCcsIHRoaXMuc2VsZWN0Um9vdEVsZW1lbnQsIFJTTywgUCwgUF0sXG4gICAgICBbJ3BhcmVudE5vZGUnLCB0aGlzLnBhcmVudE5vZGUsIFJTTywgUlNPLCBQXSwgWyduZXh0U2libGluZycsIHRoaXMubmV4dFNpYmxpbmcsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnc2V0QXR0cmlidXRlJywgdGhpcy5zZXRBdHRyaWJ1dGUsIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsncmVtb3ZlQXR0cmlidXRlJywgdGhpcy5yZW1vdmVBdHRyaWJ1dGUsIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnYWRkQ2xhc3MnLCB0aGlzLmFkZENsYXNzLCBSU08sIFJTTywgUF0sIFsncmVtb3ZlQ2xhc3MnLCB0aGlzLnJlbW92ZUNsYXNzLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldFN0eWxlJywgdGhpcy5zZXRTdHlsZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVTdHlsZScsIHRoaXMucmVtb3ZlU3R5bGUsIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnc2V0UHJvcGVydHknLCB0aGlzLnNldFByb3BlcnR5LCBSU08sIFJTTywgUCwgUF0sIFsnc2V0VmFsdWUnLCB0aGlzLnNldFZhbHVlLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ2xpc3RlbicsIHRoaXMubGlzdGVuLCBSU08sIFJTTywgUCwgUCwgUF0sIFsndW5saXN0ZW4nLCB0aGlzLnVubGlzdGVuLCBSU08sIFJTT10sXG4gICAgICBbJ2Rlc3Ryb3knLCB0aGlzLmRlc3Ryb3ksIFJTT10sIFsnZGVzdHJveU5vZGUnLCB0aGlzLmRlc3Ryb3lOb2RlLCBSU08sIFBdXG5cbiAgICBdO1xuXG4gICAgbWV0aG9kcy5mb3JFYWNoKChbbmFtZSwgbWV0aG9kLCAuLi5hcmdUeXBlc106IGFueVtdKSA9PiB7XG4gICAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QobmFtZSwgYXJnVHlwZXMsIG1ldGhvZC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveShyOiBSZW5kZXJlcjIpIHsgci5kZXN0cm95KCk7IH1cblxuICBwcml2YXRlIGRlc3Ryb3lOb2RlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55KSB7XG4gICAgaWYgKHIuZGVzdHJveU5vZGUpIHtcbiAgICAgIHIuZGVzdHJveU5vZGUobm9kZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclN0b3JlLnJlbW92ZShub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVuZGVyZXIoZWw6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMiwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihlbCwgdHlwZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWxlbWVudChyOiBSZW5kZXJlcjIsIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21tZW50KHI6IFJlbmRlcmVyMiwgdmFsdWU6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlQ29tbWVudCh2YWx1ZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGV4dChyOiBSZW5kZXJlcjIsIHZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZVRleHQodmFsdWUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHsgci5hcHBlbmRDaGlsZChwYXJlbnQsIGNoaWxkKTsgfVxuXG4gIHByaXZhdGUgaW5zZXJ0QmVmb3JlKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnksIHJlZjogYW55KSB7XG4gICAgci5pbnNlcnRCZWZvcmUocGFyZW50LCBjaGlsZCwgcmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2hpbGQocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkgeyByLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpOyB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RSb290RWxlbWVudChyOiBSZW5kZXJlcjIsIHNlbGVjdG9yOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJlbnROb2RlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5wYXJlbnROb2RlKG5vZGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIG5leHRTaWJsaW5nKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5uZXh0U2libGluZyhub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZENsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7IHIuYWRkQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDbGFzcyhyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZykgeyByLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHByaXZhdGUgc2V0U3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTdHlsZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKSB7XG4gICAgci5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UHJvcGVydHkocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICByLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFZhbHVlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKSB7IHIuc2V0VmFsdWUobm9kZSwgdmFsdWUpOyB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW4ocjogUmVuZGVyZXIyLCBlbDogYW55LCBlbE5hbWU6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChlbCwgZWxOYW1lLCBldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdW5saXN0ZW4gPSByLmxpc3RlbihlbCB8fCBlbE5hbWUsIGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVubGlzdGVuLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5saXN0ZW4ocjogUmVuZGVyZXIyLCB1bmxpc3RlbjogKCkgPT4gYm9vbGVhbikgeyB1bmxpc3RlbigpOyB9XG59XG4iXX0=