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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUd2RCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7OztJQUloQyxZQUNZLGdCQUFxRCxJQUFnQixFQUNyRSxhQUFpQyxZQUF5QixFQUMxRDtRQUZBLG1CQUFjLEdBQWQsY0FBYztRQUF1QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3JFLGdCQUFXLEdBQVgsV0FBVztRQUFzQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUMxRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCO0tBQXNCOzs7O0lBRWxELEtBQUs7O1FBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENB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QUFFLFVBQWtCOztRQUN6RixNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hGLENBQUM7O1FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7SUFHeEMsUUFBUSxDQUFDLENBQVksRUFBRSxRQUF1QixJQUFJLFFBQVEsRUFBRSxDQUFDOzs7WUEvSHRFLFVBQVU7Ozs7WUFIbUIsMkJBQTJCO1lBSmpELFVBQVU7WUFHVixVQUFVO1lBRFYsV0FBVztZQUpZLGdCQUFnQjs7cUVBVWxDLHFCQUFxQix3RUFBckIscUJBQXFCLFlBS0osMkJBQTJCLGFBQWdCLFVBQVUsYUFDeEQsVUFBVSxhQUF3QixXQUFXLGFBQ3hDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0VWRU5UXzJfQ0hBTk5FTCwgUkVOREVSRVJfMl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuLi9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91aS9ldmVudF9kaXNwYXRjaGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXIgITogRXZlbnREaXNwYXRjaGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBwcml2YXRlIF9idXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSXzJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9idXMuaW5pdENoYW5uZWwoRVZFTlRfMl9DSEFOTkVMKTtcbiAgICB0aGlzLl9ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKHRoaXMuX2J1cy50byhFVkVOVF8yX0NIQU5ORUwpLCB0aGlzLl9zZXJpYWxpemVyKTtcblxuICAgIGNvbnN0IFtSU08sIFAsIENSVF0gPSBbXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUsXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yLFxuICAgIF07XG5cbiAgICBjb25zdCBtZXRob2RzOiBhbnlbXVtdID0gW1xuICAgICAgWydjcmVhdGVSZW5kZXJlcicsIHRoaXMuY3JlYXRlUmVuZGVyZXIsIFJTTywgQ1JULCBQXSxcbiAgICAgIFsnY3JlYXRlRWxlbWVudCcsIHRoaXMuY3JlYXRlRWxlbWVudCwgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsnY3JlYXRlQ29tbWVudCcsIHRoaXMuY3JlYXRlQ29tbWVudCwgUlNPLCBQLCBQXSwgWydjcmVhdGVUZXh0JywgdGhpcy5jcmVhdGVUZXh0LCBSU08sIFAsIFBdLFxuICAgICAgWydhcHBlbmRDaGlsZCcsIHRoaXMuYXBwZW5kQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydpbnNlcnRCZWZvcmUnLCB0aGlzLmluc2VydEJlZm9yZSwgUlNPLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsncmVtb3ZlQ2hpbGQnLCB0aGlzLnJlbW92ZUNoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnc2VsZWN0Um9vdEVsZW1lbnQnLCB0aGlzLnNlbGVjdFJvb3RFbGVtZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydwYXJlbnROb2RlJywgdGhpcy5wYXJlbnROb2RlLCBSU08sIFJTTywgUF0sIFsnbmV4dFNpYmxpbmcnLCB0aGlzLm5leHRTaWJsaW5nLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldEF0dHJpYnV0ZScsIHRoaXMuc2V0QXR0cmlidXRlLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3JlbW92ZUF0dHJpYnV0ZScsIHRoaXMucmVtb3ZlQXR0cmlidXRlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ2FkZENsYXNzJywgdGhpcy5hZGRDbGFzcywgUlNPLCBSU08sIFBdLCBbJ3JlbW92ZUNsYXNzJywgdGhpcy5yZW1vdmVDbGFzcywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRTdHlsZScsIHRoaXMuc2V0U3R5bGUsIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsncmVtb3ZlU3R5bGUnLCB0aGlzLnJlbW92ZVN0eWxlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ3NldFByb3BlcnR5JywgdGhpcy5zZXRQcm9wZXJ0eSwgUlNPLCBSU08sIFAsIFBdLCBbJ3NldFZhbHVlJywgdGhpcy5zZXRWYWx1ZSwgUlNPLCBSU08sIFBdLFxuICAgICAgWydsaXN0ZW4nLCB0aGlzLmxpc3RlbiwgUlNPLCBSU08sIFAsIFAsIFBdLCBbJ3VubGlzdGVuJywgdGhpcy51bmxpc3RlbiwgUlNPLCBSU09dLFxuICAgICAgWydkZXN0cm95JywgdGhpcy5kZXN0cm95LCBSU09dLCBbJ2Rlc3Ryb3lOb2RlJywgdGhpcy5kZXN0cm95Tm9kZSwgUlNPLCBQXVxuXG4gICAgXTtcblxuICAgIG1ldGhvZHMuZm9yRWFjaCgoW25hbWUsIG1ldGhvZCwgLi4uYXJnVHlwZXNdOiBhbnlbXSkgPT4ge1xuICAgICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKG5hbWUsIGFyZ1R5cGVzLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3kocjogUmVuZGVyZXIyKSB7IHIuZGVzdHJveSgpOyB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSkge1xuICAgIGlmIChyLmRlc3Ryb3lOb2RlKSB7XG4gICAgICByLmRlc3Ryb3lOb2RlKG5vZGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5yZW1vdmUobm9kZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlbmRlcmVyKGVsOiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoZWwsIHR5cGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVsZW1lbnQocjogUmVuZGVyZXIyLCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tbWVudChyOiBSZW5kZXJlcjIsIHZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZUNvbW1lbnQodmFsdWUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRleHQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVUZXh0KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDaGlsZChyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55KSB7IHIuYXBwZW5kQ2hpbGQocGFyZW50LCBjaGlsZCk7IH1cblxuICBwcml2YXRlIGluc2VydEJlZm9yZShyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55LCByZWY6IGFueSkge1xuICAgIHIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgY2hpbGQsIHJlZik7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHsgci5yZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKTsgfVxuXG4gIHByaXZhdGUgc2VsZWN0Um9vdEVsZW1lbnQocjogUmVuZGVyZXIyLCBzZWxlY3Rvcjogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5zZWxlY3RSb290RWxlbWVudChzZWxlY3RvciksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyZW50Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIucGFyZW50Tm9kZShub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0U2libGluZyhyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIubmV4dFNpYmxpbmcobm9kZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDbGFzcyhyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZykgeyByLmFkZENsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcpIHsgci5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBwcml2YXRlIHNldFN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHNldFByb3BlcnR5KHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWx1ZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZykgeyByLnNldFZhbHVlKG5vZGUsIHZhbHVlKTsgfVxuXG4gIHByaXZhdGUgbGlzdGVuKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgZWxOYW1lOiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQoZWwsIGVsTmFtZSwgZXZlbnROYW1lLCBldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVubGlzdGVuID0gci5saXN0ZW4oZWwgfHwgZWxOYW1lLCBldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bmxpc3RlbiwgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIHVubGlzdGVuKHI6IFJlbmRlcmVyMiwgdW5saXN0ZW46ICgpID0+IGJvb2xlYW4pIHsgdW5saXN0ZW4oKTsgfVxufVxuIl19