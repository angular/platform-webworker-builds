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
    getProperty(el: Element, name: string): any;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    remove(el: any): Node;
    createElement(tagName: any, doc?: any): HTMLElement;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: any): boolean;
    isShadowRoot(node: any): boolean;
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
