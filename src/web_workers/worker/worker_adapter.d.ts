/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵDomAdapter as DomAdapter } from '@angular/common';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export declare class WorkerDomAdapter extends DomAdapter {
    static makeCurrent(): void;
    log(error: any): void;
    logGroup(error: any): void;
    logGroupEnd(): void;
    setProperty(el: Element, name: string, value: any): void;
    getProperty(el: Element, name: string): any;
    querySelector(el: any, selector: string): HTMLElement;
    querySelectorAll(el: any, selector: string): any[];
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    remove(el: any): Node;
    insertBefore(parent: any, el: any, node: any): void;
    setText(el: any, value: string): void;
    createComment(text: string): any;
    createElement(tagName: any, doc?: any): HTMLElement;
    createElementNS(ns: string, tagName: string, doc?: any): Element;
    createTextNode(text: string, doc?: any): Text;
    getHost(el: any): any;
    getElementsByTagName(element: any, name: string): HTMLElement[];
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    setStyle(element: any, styleName: string, styleValue: string): void;
    removeStyle(element: any, styleName: string): void;
    getStyle(element: any, styleName: string): string;
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
