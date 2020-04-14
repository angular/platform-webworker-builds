/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/worker/worker_adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵDomAdapter as DomAdapter, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export class WorkerDomAdapter extends DomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() {
        setRootDomAdapter(new WorkerDomAdapter());
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (console.group) {
            console.group(error);
            if (console.error) {
                console.error(error);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log(error);
            }
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        throw 'not implemented';
    }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) {
        throw 'not implemented';
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    getDefaultDocument() {
        throw 'not implemented';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) {
        throw 'not implemented';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() {
        throw 'not implemented';
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    getHistory() {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    getLocation() {
        throw 'not implemented';
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    resetBaseElement() {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    getUserAgent() {
        return 'Fake user agent';
    }
    /**
     * @return {?}
     */
    performanceNow() {
        throw 'not implemented';
    }
    /**
     * @return {?}
     */
    supportsCookies() {
        return false;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) {
        throw 'not implemented';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsV0FBVyxJQUFJLFVBQVUsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7QUFPbkcsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFVBQVU7Ozs7SUFDOUMsTUFBTSxDQUFDLFdBQVc7UUFDaEIsaUJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCxHQUFHLENBQUMsS0FBVTtRQUNaLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxFQUFXLEVBQUUsSUFBWTtRQUNuQyxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBTyxFQUFFLEdBQVEsRUFBRSxRQUFhO1FBQzFDLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBQ0QsYUFBYSxDQUFDLEVBQU8sRUFBRSxHQUFRO1FBQzdCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFDRCxNQUFNLENBQUMsRUFBTztRQUNaLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBQ0QsYUFBYSxDQUFDLE9BQVksRUFBRSxHQUFTO1FBQ25DLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELGtCQUFrQjtRQUNoQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Ozs7SUFDRCxrQkFBa0I7UUFDaEIsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDOzs7OztJQUNELGFBQWEsQ0FBQyxJQUFTO1FBQ3JCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFDRCxZQUFZLENBQUMsSUFBUztRQUNwQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Ozs7SUFDRCxpQkFBaUI7UUFDZixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUNELG9CQUFvQixDQUFDLEdBQWEsRUFBRSxNQUFjO1FBQ2hELE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELFVBQVU7UUFDUixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Ozs7SUFDRCxXQUFXO1FBQ1QsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDOzs7OztJQUNELFdBQVcsQ0FBQyxHQUFhO1FBQ3ZCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELGdCQUFnQjtRQUNkLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELFlBQVk7UUFDVixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Ozs7SUFDRCxjQUFjO1FBQ1osTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFDRCxTQUFTLENBQUMsSUFBWTtRQUNwQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtURvbUFkYXB0ZXIgYXMgRG9tQWRhcHRlciwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBUaGlzIGFkYXB0ZXIgaXMgcmVxdWlyZWQgdG8gbG9nIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIE5vdGU6IG90aGVyIG1ldGhvZHMgYWxsIHRocm93IGFzIHRoZSBET00gaXMgbm90IGFjY2Vzc2libGUgZGlyZWN0bHkgaW4gd2ViIHdvcmtlciBjb250ZXh0LlxuICovXG5leHBvcnQgY2xhc3MgV29ya2VyRG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7XG4gICAgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFdvcmtlckRvbUFkYXB0ZXIoKSk7XG4gIH1cblxuICBsb2coZXJyb3I6IGFueSkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IGFueSkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwKSB7XG4gICAgICBjb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge1xuICAgIGlmIChjb25zb2xlLmdyb3VwRW5kKSB7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cblxuICBvbkFuZENhbmNlbChlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBhbnksIGV2dDogYW55KSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgcmVtb3ZlKGVsOiBhbnkpOiBOb2RlIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IGFueSwgZG9jPzogYW55KTogSFRNTEVsZW1lbnQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBhbnkge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdGYWtlIHVzZXIgYWdlbnQnO1xuICB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG59XG4iXX0=