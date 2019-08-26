/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵDomAdapter as DomAdapter } from '@angular/platform-browser';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export declare class WorkerDomAdapter extends DomAdapter {
    static makeCurrent(): void;
    logError(error: any): void;
    log(error: any): void;
    logGroup(error: any): void;
    logGroupEnd(): void;
    contains(nodeA: any, nodeB: any): boolean;
    hasProperty(element: any, name: string): boolean;
    setProperty(el: Element, name: string, value: any): void;
    getProperty(el: Element, name: string): any;
    invoke(el: Element, methodName: string, args: any[]): any;
    parse(templateHtml: string): void;
    querySelector(el: any, selector: string): HTMLElement;
    querySelectorAll(el: any, selector: string): any[];
    on(el: any, evt: any, listener: any): void;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    createMouseEvent(eventType: any): any;
    createEvent(eventType: string): any;
    preventDefault(evt: any): void;
    isPrevented(evt: any): boolean;
    nodeName(node: any): string;
    nodeValue(node: any): string;
    type(node: any): string;
    firstChild(el: any): Node;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    childNodes(el: any): Node[];
    childNodesAsList(el: any): Node[];
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    remove(el: any): Node;
    insertBefore(parent: any, el: any, node: any): void;
    getText(el: any): string;
    setText(el: any, value: string): void;
    getValue(el: any): string;
    setValue(el: any, value: string): void;
    getChecked(el: any): boolean;
    createComment(text: string): any;
    createTemplate(html: any): HTMLElement;
    createElement(tagName: any, doc?: any): HTMLElement;
    createElementNS(ns: string, tagName: string, doc?: any): Element;
    createTextNode(text: string, doc?: any): Text;
    getHost(el: any): any;
    getDistributedNodes(el: any): Node[];
    clone(node: Node): Node;
    getElementsByTagName(element: any, name: string): HTMLElement[];
    classList(element: any): any[];
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    hasClass(element: any, className: string): boolean;
    setStyle(element: any, styleName: string, styleValue: string): void;
    removeStyle(element: any, styleName: string): void;
    getStyle(element: any, styleName: string): string;
    hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    getAttribute(element: any, attribute: string): string;
    setAttribute(element: any, name: string, value: string): void;
    setAttributeNS(element: any, ns: string, name: string, value: string): void;
    removeAttribute(element: any, attribute: string): void;
    removeAttributeNS(element: any, ns: string, attribute: string): void;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    getTitle(doc: Document): string;
    setTitle(doc: Document, newTitle: string): void;
    elementMatches(n: any, selector: string): boolean;
    isElementNode(node: any): boolean;
    isShadowRoot(node: any): boolean;
    getEventKey(event: any): string;
    supportsDOMEvents(): boolean;
    getGlobalEventTarget(doc: Document, target: string): any;
    getHistory(): History;
    getLocation(): Location;
    getBaseHref(doc: Document): string;
    resetBaseElement(): void;
    getUserAgent(): string;
    performanceNow(): number;
    supportsCookies(): boolean;
    getCookie(name: string): string;
}
