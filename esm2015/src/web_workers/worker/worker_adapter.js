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
    static makeCurrent() {
        setRootDomAdapter(new WorkerDomAdapter());
    }
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
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
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    getProperty(el, name) {
        throw 'not implemented';
    }
    onAndCancel(el, evt, listener) {
        throw 'not implemented';
    }
    dispatchEvent(el, evt) {
        throw 'not implemented';
    }
    remove(el) {
        throw 'not implemented';
    }
    createElement(tagName, doc) {
        throw 'not implemented';
    }
    createHtmlDocument() {
        throw 'not implemented';
    }
    getDefaultDocument() {
        throw 'not implemented';
    }
    isElementNode(node) {
        throw 'not implemented';
    }
    isShadowRoot(node) {
        throw 'not implemented';
    }
    supportsDOMEvents() {
        throw 'not implemented';
    }
    getGlobalEventTarget(doc, target) {
        throw 'not implemented';
    }
    getHistory() {
        throw 'not implemented';
    }
    getLocation() {
        throw 'not implemented';
    }
    getBaseHref(doc) {
        throw 'not implemented';
    }
    resetBaseElement() {
        throw 'not implemented';
    }
    getUserAgent() {
        return 'Fake user agent';
    }
    performanceNow() {
        throw 'not implemented';
    }
    supportsCookies() {
        return false;
    }
    getCookie(name) {
        throw 'not implemented';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsV0FBVyxJQUFJLFVBQVUsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRW5HOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQUM5QyxNQUFNLENBQUMsV0FBVztRQUNoQixpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVU7UUFDWixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVyxFQUFFLElBQVk7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYTtRQUMxQyxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsRUFBTyxFQUFFLEdBQVE7UUFDN0IsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQU87UUFDWixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBWSxFQUFFLEdBQVM7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBUztRQUNyQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBUztRQUNwQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxHQUFhLEVBQUUsTUFBYztRQUNoRCxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxVQUFVO1FBQ1IsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsV0FBVztRQUNULE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFhO1FBQ3ZCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELGdCQUFnQjtRQUNkLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELFlBQVk7UUFDVixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRCxjQUFjO1FBQ1osTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtXNldFJvb3REb21BZGFwdGVyIGFzIHNldFJvb3REb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciBpcyByZXF1aXJlZCB0byBsb2cgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogTm90ZTogb3RoZXIgbWV0aG9kcyBhbGwgdGhyb3cgYXMgdGhlIERPTSBpcyBub3QgYWNjZXNzaWJsZSBkaXJlY3RseSBpbiB3ZWIgd29ya2VyIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXb3JrZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgV29ya2VyRG9tQWRhcHRlcigpKTtcbiAgfVxuXG4gIGxvZyhlcnJvcjogYW55KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogYW55KSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXApIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoZXJyb3IpO1xuICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7XG4gICAgaWYgKGNvbnNvbGUuZ3JvdXBFbmQpIHtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuXG4gIG9uQW5kQ2FuY2VsKGVsOiBhbnksIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICByZW1vdmUoZWw6IGFueSk6IE5vZGUge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogYW55LCBkb2M/OiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0Zha2UgdXNlciBhZ2VudCc7XG4gIH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbn1cbiJdfQ==