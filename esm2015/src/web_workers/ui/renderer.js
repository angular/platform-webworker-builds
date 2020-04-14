/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/renderer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        methods.forEach((/**
         * @param {?} __0
         * @return {?}
         */
        ([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        }));
    }
    /**
     * @private
     * @param {?} r
     * @return {?}
     */
    destroy(r) {
        r.destroy();
    }
    /**
     * @private
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
     * @private
     * @param {?} el
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    createRenderer(el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    }
    /**
     * @private
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
     * @private
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createComment(r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createText(r, value, id) {
        this._renderStore.store(r.createText(value), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    appendChild(r, parent, child) {
        r.appendChild(parent, child);
    }
    /**
     * @private
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
     * @private
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    removeChild(r, parent, child) {
        r.removeChild(parent, child);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    selectRootElement(r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    parentNode(r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    nextSibling(r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    }
    /**
     * @private
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
     * @private
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
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(r, el, name) {
        r.addClass(el, name);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(r, el, name) {
        r.removeClass(el, name);
    }
    /**
     * @private
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
     * @private
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
     * @private
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
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(r, node, value) {
        r.setValue(node, value);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    listen(r, el, elName, eventName, unlistenId) {
        /** @type {?} */
        const listener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        });
        /** @type {?} */
        const unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    unlisten(r, unlisten) {
        unlisten();
    }
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
/** @nocollapse */ MessageBasedRenderer2.ɵfac = function MessageBasedRenderer2_Factory(t) { return new (t || MessageBasedRenderer2)(i0.ɵɵinject(i1.ServiceMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer), i0.ɵɵinject(i4.RenderStore), i0.ɵɵinject(i0.RendererFactory2)); };
/** @nocollapse */ MessageBasedRenderer2.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedRenderer2, factory: MessageBasedRenderer2.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MessageBasedRenderer2, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }, { type: i0.RendererFactory2 }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._eventDispatcher;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._brokerFactory;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._bus;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._renderStore;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBYSxnQkFBZ0IsRUFBcUMsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQXVCLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDbkcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBR3ZELE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7O0lBSWhDLFlBQ1ksY0FBMkMsRUFBVSxJQUFnQixFQUNyRSxXQUF1QixFQUFVLFlBQXlCLEVBQzFELGdCQUFrQztRQUZsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBNkI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3JFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDMUQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7Ozs7SUFFbEQsS0FBSzs7Y0FDRyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQztRQUUxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JB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aWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0VWRU5UXzJfQ0hBTk5FTCwgUkVOREVSRVJfMl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuLi9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91aS9ldmVudF9kaXNwYXRjaGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXIhOiBFdmVudERpc3BhdGNoZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX2J1czogTWVzc2FnZUJ1cyxcbiAgICAgIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfMl9DSEFOTkVMKTtcblxuICAgIHRoaXMuX2J1cy5pbml0Q2hhbm5lbChFVkVOVF8yX0NIQU5ORUwpO1xuICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIodGhpcy5fYnVzLnRvKEVWRU5UXzJfQ0hBTk5FTCksIHRoaXMuX3NlcmlhbGl6ZXIpO1xuXG4gICAgY29uc3QgW1JTTywgUCwgQ1JUXSA9IFtcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNULFxuICAgICAgU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIsXG4gICAgXTtcblxuICAgIGNvbnN0IG1ldGhvZHM6IGFueVtdW10gPSBbXG4gICAgICBbJ2NyZWF0ZVJlbmRlcmVyJywgdGhpcy5jcmVhdGVSZW5kZXJlciwgUlNPLCBDUlQsIFBdLFxuICAgICAgWydjcmVhdGVFbGVtZW50JywgdGhpcy5jcmVhdGVFbGVtZW50LCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydjcmVhdGVDb21tZW50JywgdGhpcy5jcmVhdGVDb21tZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydjcmVhdGVUZXh0JywgdGhpcy5jcmVhdGVUZXh0LCBSU08sIFAsIFBdLFxuICAgICAgWydhcHBlbmRDaGlsZCcsIHRoaXMuYXBwZW5kQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydpbnNlcnRCZWZvcmUnLCB0aGlzLmluc2VydEJlZm9yZSwgUlNPLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsncmVtb3ZlQ2hpbGQnLCB0aGlzLnJlbW92ZUNoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnc2VsZWN0Um9vdEVsZW1lbnQnLCB0aGlzLnNlbGVjdFJvb3RFbGVtZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydwYXJlbnROb2RlJywgdGhpcy5wYXJlbnROb2RlLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ25leHRTaWJsaW5nJywgdGhpcy5uZXh0U2libGluZywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRBdHRyaWJ1dGUnLCB0aGlzLnNldEF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVBdHRyaWJ1dGUnLCB0aGlzLnJlbW92ZUF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydhZGRDbGFzcycsIHRoaXMuYWRkQ2xhc3MsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsncmVtb3ZlQ2xhc3MnLCB0aGlzLnJlbW92ZUNsYXNzLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldFN0eWxlJywgdGhpcy5zZXRTdHlsZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVTdHlsZScsIHRoaXMucmVtb3ZlU3R5bGUsIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnc2V0UHJvcGVydHknLCB0aGlzLnNldFByb3BlcnR5LCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ3NldFZhbHVlJywgdGhpcy5zZXRWYWx1ZSwgUlNPLCBSU08sIFBdLFxuICAgICAgWydsaXN0ZW4nLCB0aGlzLmxpc3RlbiwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWyd1bmxpc3RlbicsIHRoaXMudW5saXN0ZW4sIFJTTywgUlNPXSxcbiAgICAgIFsnZGVzdHJveScsIHRoaXMuZGVzdHJveSwgUlNPXSxcbiAgICAgIFsnZGVzdHJveU5vZGUnLCB0aGlzLmRlc3Ryb3lOb2RlLCBSU08sIFBdXG5cbiAgICBdO1xuXG4gICAgbWV0aG9kcy5mb3JFYWNoKChbbmFtZSwgbWV0aG9kLCAuLi5hcmdUeXBlc106IGFueVtdKSA9PiB7XG4gICAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QobmFtZSwgYXJnVHlwZXMsIG1ldGhvZC5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveShyOiBSZW5kZXJlcjIpIHtcbiAgICByLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveU5vZGUocjogUmVuZGVyZXIyLCBub2RlOiBhbnkpIHtcbiAgICBpZiAoci5kZXN0cm95Tm9kZSkge1xuICAgICAgci5kZXN0cm95Tm9kZShub2RlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZW5kZXJlcihlbDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKGVsLCB0eXBlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50KHI6IFJlbmRlcmVyMiwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlRWxlbWVudChuYW1lLCBuYW1lc3BhY2UpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbW1lbnQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVDb21tZW50KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUZXh0KHI6IFJlbmRlcmVyMiwgdmFsdWU6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlVGV4dCh2YWx1ZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ2hpbGQocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkge1xuICAgIHIuYXBwZW5kQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gIH1cblxuICBwcml2YXRlIGluc2VydEJlZm9yZShyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55LCByZWY6IGFueSkge1xuICAgIHIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgY2hpbGQsIHJlZik7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHtcbiAgICByLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RSb290RWxlbWVudChyOiBSZW5kZXJlcjIsIHNlbGVjdG9yOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJlbnROb2RlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5wYXJlbnROb2RlKG5vZGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIG5leHRTaWJsaW5nKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55LCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5uZXh0U2libGluZyhub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBdHRyaWJ1dGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgci5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZENsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgci5hZGRDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgci5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHNldFByb3BlcnR5KHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWx1ZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZykge1xuICAgIHIuc2V0VmFsdWUobm9kZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW4ocjogUmVuZGVyZXIyLCBlbDogYW55LCBlbE5hbWU6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChlbCwgZWxOYW1lLCBldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdW5saXN0ZW4gPSByLmxpc3RlbihlbCB8fCBlbE5hbWUsIGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVubGlzdGVuLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5saXN0ZW4ocjogUmVuZGVyZXIyLCB1bmxpc3RlbjogKCkgPT4gYm9vbGVhbikge1xuICAgIHVubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==