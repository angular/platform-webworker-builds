/**
 * @fileoverview added by tsickle
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
    destroy(r) { r.destroy(); }
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
    appendChild(r, parent, child) { r.appendChild(parent, child); }
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
    removeChild(r, parent, child) { r.removeChild(parent, child); }
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
    addClass(r, el, name) { r.addClass(el, name); }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(r, el, name) { r.removeClass(el, name); }
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
    setValue(r, node, value) { r.setValue(node, value); }
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
/** @nocollapse */ MessageBasedRenderer2.ɵfac = function MessageBasedRenderer2_Factory(t) { return new (t || MessageBasedRenderer2)(i0.ɵɵinject(i1.ServiceMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer), i0.ɵɵinject(i4.RenderStore), i0.ɵɵinject(i0.RendererFactory2)); };
/** @nocollapse */ MessageBasedRenderer2.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedRenderer2, factory: function (t) { return MessageBasedRenderer2.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(MessageBasedRenderer2, [{
        type: Injectable
    }], function () { return [{ type: i1.ServiceMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }, { type: i0.RendererFactory2 }]; }, null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFhLGdCQUFnQixFQUFxQyxNQUFNLGVBQWUsQ0FBQztBQUUxRyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBdUIsMkJBQTJCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFHdkQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7Ozs7SUFJaEMsWUFDWSxjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsZ0JBQWtDO1FBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUMxRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQzs7OztJQUVsRCxLQUFLOztjQUNHLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDO1FBRTFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Y0FFdkYsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHOzs7O1NBSXJCOztjQUVLLE9BQU8sR0FBWTtZQUN2QixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUYsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNoRCxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN2RCxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ2hELENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDM0YsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ2pGLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBRTFFO1FBRUQsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBUSxFQUFFLEVBQUU7WUFDckQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLE9BQU8sQ0FBQyxDQUFZLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUV0QyxXQUFXLENBQUMsQ0FBWSxFQUFFLElBQVM7UUFDekMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ2pCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxFQUFPLEVBQUUsSUFBbUIsRUFBRSxFQUFVO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7Ozs7OztJQUVPLGFBQWEsQ0FBQyxDQUFZLEVBQUUsSUFBWSxFQUFFLFNBQWlCLEVBQUUsRUFBVTtRQUM3RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7OztJQUVPLGFBQWEsQ0FBQyxDQUFZLEVBQUUsS0FBYSxFQUFFLEVBQVU7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7Ozs7OztJQUVPLFVBQVUsQ0FBQyxDQUFZLEVBQUUsS0FBYSxFQUFFLEVBQVU7UUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7OztJQUVPLFdBQVcsQ0FBQyxDQUFZLEVBQUUsTUFBVyxFQUFFLEtBQVUsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OztJQUVwRixZQUFZLENBQUMsQ0FBWSxFQUFFLE1BQVcsRUFBRSxLQUFVLEVBQUUsR0FBUTtRQUNsRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7Ozs7SUFFTyxXQUFXLENBQUMsQ0FBWSxFQUFFLE1BQVcsRUFBRSxLQUFVLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUVwRixpQkFBaUIsQ0FBQyxDQUFZLEVBQUUsUUFBZ0IsRUFBRSxFQUFVO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7OztJQUVPLFVBQVUsQ0FBQyxDQUFZLEVBQUUsSUFBUyxFQUFFLEVBQVU7UUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7OztJQUVPLFdBQVcsQ0FBQyxDQUFZLEVBQUUsSUFBUyxFQUFFLEVBQVU7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7Ozs7O0lBRU8sWUFBWSxDQUFDLENBQVksRUFBRSxFQUFPLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxTQUFpQjtRQUN4RixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7Ozs7OztJQUVPLGVBQWUsQ0FBQyxDQUFZLEVBQUUsRUFBTyxFQUFFLElBQVksRUFBRSxTQUFpQjtRQUM1RSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsQ0FBWSxFQUFFLEVBQU8sRUFBRSxJQUFZLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUV2RSxXQUFXLENBQUMsQ0FBWSxFQUFFLEVBQU8sRUFBRSxJQUFZLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBRTdFLFFBQVEsQ0FBQyxDQUFZLEVBQUUsRUFBTyxFQUFFLEtBQWEsRUFBRSxLQUFVLEVBQUUsS0FBMEI7UUFDM0YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7Ozs7SUFFTyxXQUFXLENBQUMsQ0FBWSxFQUFFLEVBQU8sRUFBRSxLQUFhLEVBQUUsS0FBMEI7UUFDbEYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7OztJQUVPLFdBQVcsQ0FBQyxDQUFZLEVBQUUsRUFBTyxFQUFFLElBQVksRUFBRSxLQUFVO1FBQ2pFLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7OztJQUVPLFFBQVEsQ0FBQyxDQUFZLEVBQUUsSUFBUyxFQUFFLEtBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFFN0UsTUFBTSxDQUFDLENBQVksRUFBRSxFQUFPLEVBQUUsTUFBYyxFQUFFLFNBQWlCLEVBQUUsVUFBa0I7O2NBQ25GLFFBQVE7Ozs7UUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQTs7Y0FFSyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsQ0FBWSxFQUFFLFFBQXVCLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7WUEvSHhFLFVBQVU7Ozs7WUFIbUIsMkJBQTJCO1lBSmpELFVBQVU7WUFHVixVQUFVO1lBRFYsV0FBVztZQUpZLGdCQUFnQjs7MEZBVWxDLHFCQUFxQjs2REFBckIscUJBQXFCLGlDQUFyQixxQkFBcUI7bUNBQXJCLHFCQUFxQjtjQURqQyxVQUFVOzs7Ozs7O0lBR1QsaURBQTRDOzs7OztJQUd4QywrQ0FBbUQ7Ozs7O0lBQUUscUNBQXdCOzs7OztJQUM3RSw0Q0FBK0I7Ozs7O0lBQUUsNkNBQWlDOzs7OztJQUNsRSxpREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFVkVOVF8yX0NIQU5ORUwsIFJFTkRFUkVSXzJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi4vc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi4vdWkvZXZlbnRfZGlzcGF0Y2hlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRSZW5kZXJlcjIge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfZXZlbnREaXNwYXRjaGVyICE6IEV2ZW50RGlzcGF0Y2hlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgcHJpdmF0ZSBfYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IGJyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl8yX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fYnVzLmluaXRDaGFubmVsKEVWRU5UXzJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcih0aGlzLl9idXMudG8oRVZFTlRfMl9DSEFOTkVMKSwgdGhpcy5fc2VyaWFsaXplcik7XG5cbiAgICBjb25zdCBbUlNPLCBQLCBDUlRdID0gW1xuICAgICAgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QsXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFLFxuICAgICAgU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMixcbiAgICBdO1xuXG4gICAgY29uc3QgbWV0aG9kczogYW55W11bXSA9IFtcbiAgICAgIFsnY3JlYXRlUmVuZGVyZXInLCB0aGlzLmNyZWF0ZVJlbmRlcmVyLCBSU08sIENSVCwgUF0sXG4gICAgICBbJ2NyZWF0ZUVsZW1lbnQnLCB0aGlzLmNyZWF0ZUVsZW1lbnQsIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ2NyZWF0ZUNvbW1lbnQnLCB0aGlzLmNyZWF0ZUNvbW1lbnQsIFJTTywgUCwgUF0sIFsnY3JlYXRlVGV4dCcsIHRoaXMuY3JlYXRlVGV4dCwgUlNPLCBQLCBQXSxcbiAgICAgIFsnYXBwZW5kQ2hpbGQnLCB0aGlzLmFwcGVuZENoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnaW5zZXJ0QmVmb3JlJywgdGhpcy5pbnNlcnRCZWZvcmUsIFJTTywgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ3JlbW92ZUNoaWxkJywgdGhpcy5yZW1vdmVDaGlsZCwgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ3NlbGVjdFJvb3RFbGVtZW50JywgdGhpcy5zZWxlY3RSb290RWxlbWVudCwgUlNPLCBQLCBQXSxcbiAgICAgIFsncGFyZW50Tm9kZScsIHRoaXMucGFyZW50Tm9kZSwgUlNPLCBSU08sIFBdLCBbJ25leHRTaWJsaW5nJywgdGhpcy5uZXh0U2libGluZywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRBdHRyaWJ1dGUnLCB0aGlzLnNldEF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFAsIFBdLFxuICAgICAgWydyZW1vdmVBdHRyaWJ1dGUnLCB0aGlzLnJlbW92ZUF0dHJpYnV0ZSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydhZGRDbGFzcycsIHRoaXMuYWRkQ2xhc3MsIFJTTywgUlNPLCBQXSwgWydyZW1vdmVDbGFzcycsIHRoaXMucmVtb3ZlQ2xhc3MsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnc2V0U3R5bGUnLCB0aGlzLnNldFN0eWxlLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3JlbW92ZVN0eWxlJywgdGhpcy5yZW1vdmVTdHlsZSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydzZXRQcm9wZXJ0eScsIHRoaXMuc2V0UHJvcGVydHksIFJTTywgUlNPLCBQLCBQXSwgWydzZXRWYWx1ZScsIHRoaXMuc2V0VmFsdWUsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnbGlzdGVuJywgdGhpcy5saXN0ZW4sIFJTTywgUlNPLCBQLCBQLCBQXSwgWyd1bmxpc3RlbicsIHRoaXMudW5saXN0ZW4sIFJTTywgUlNPXSxcbiAgICAgIFsnZGVzdHJveScsIHRoaXMuZGVzdHJveSwgUlNPXSwgWydkZXN0cm95Tm9kZScsIHRoaXMuZGVzdHJveU5vZGUsIFJTTywgUF1cblxuICAgIF07XG5cbiAgICBtZXRob2RzLmZvckVhY2goKFtuYW1lLCBtZXRob2QsIC4uLmFyZ1R5cGVzXTogYW55W10pID0+IHtcbiAgICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChuYW1lLCBhcmdUeXBlcywgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KHI6IFJlbmRlcmVyMikgeyByLmRlc3Ryb3koKTsgfVxuXG4gIHByaXZhdGUgZGVzdHJveU5vZGUocjogUmVuZGVyZXIyLCBub2RlOiBhbnkpIHtcbiAgICBpZiAoci5kZXN0cm95Tm9kZSkge1xuICAgICAgci5kZXN0cm95Tm9kZShub2RlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZW5kZXJlcihlbDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKGVsLCB0eXBlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50KHI6IFJlbmRlcmVyMiwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlRWxlbWVudChuYW1lLCBuYW1lc3BhY2UpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbW1lbnQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVDb21tZW50KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUZXh0KHI6IFJlbmRlcmVyMiwgdmFsdWU6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlVGV4dCh2YWx1ZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ2hpbGQocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkgeyByLmFwcGVuZENoaWxkKHBhcmVudCwgY2hpbGQpOyB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRCZWZvcmUocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSwgcmVmOiBhbnkpIHtcbiAgICByLmluc2VydEJlZm9yZShwYXJlbnQsIGNoaWxkLCByZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDaGlsZChyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55KSB7IHIucmVtb3ZlQ2hpbGQocGFyZW50LCBjaGlsZCk7IH1cblxuICBwcml2YXRlIHNlbGVjdFJvb3RFbGVtZW50KHI6IFJlbmRlcmVyMiwgc2VsZWN0b3I6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3IpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIHBhcmVudE5vZGUocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLnBhcmVudE5vZGUobm9kZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dFNpYmxpbmcocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLm5leHRTaWJsaW5nKG5vZGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldEF0dHJpYnV0ZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgICByLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUF0dHJpYnV0ZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgICByLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2xhc3MocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcpIHsgci5hZGRDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nKSB7IHIucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKSB7XG4gICAgci5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQcm9wZXJ0eShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHIuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsdWUocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpIHsgci5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7IH1cblxuICBwcml2YXRlIGxpc3RlbihyOiBSZW5kZXJlcjIsIGVsOiBhbnksIGVsTmFtZTogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KGVsLCBlbE5hbWUsIGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCB1bmxpc3RlbiA9IHIubGlzdGVuKGVsIHx8IGVsTmFtZSwgZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5saXN0ZW4sIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bmxpc3RlbihyOiBSZW5kZXJlcjIsIHVubGlzdGVuOiAoKSA9PiBib29sZWFuKSB7IHVubGlzdGVuKCk7IH1cbn1cbiJdfQ==