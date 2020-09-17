/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsV0FBVyxJQUFJLFVBQVUsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRW5HOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQUM5QyxNQUFNLENBQUMsV0FBVztRQUNoQixpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVU7UUFDWixzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVyxFQUFFLElBQVk7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxHQUFRLEVBQUUsUUFBYTtRQUMxQyxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsRUFBTyxFQUFFLEdBQVE7UUFDN0IsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQU87UUFDWixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBWSxFQUFFLEdBQVM7UUFDbkMsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBUztRQUNyQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBUztRQUNwQixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxHQUFhLEVBQUUsTUFBYztRQUNoRCxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxVQUFVO1FBQ1IsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsV0FBVztRQUNULE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFhO1FBQ3ZCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELGdCQUFnQjtRQUNkLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELFlBQVk7UUFDVixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRCxjQUFjO1FBQ1osTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVEb21BZGFwdGVyIGFzIERvbUFkYXB0ZXIsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyBhZGFwdGVyIGlzIHJlcXVpcmVkIHRvIGxvZyBlcnJvciBtZXNzYWdlcy5cbiAqXG4gKiBOb3RlOiBvdGhlciBtZXRob2RzIGFsbCB0aHJvdyBhcyB0aGUgRE9NIGlzIG5vdCBhY2Nlc3NpYmxlIGRpcmVjdGx5IGluIHdlYiB3b3JrZXIgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIFdvcmtlckRvbUFkYXB0ZXIgZXh0ZW5kcyBEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkge1xuICAgIHNldFJvb3REb21BZGFwdGVyKG5ldyBXb3JrZXJEb21BZGFwdGVyKCkpO1xuICB9XG5cbiAgbG9nKGVycm9yOiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cCkge1xuICAgICAgY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAoY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG5cbiAgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgZGlzcGF0Y2hFdmVudChlbDogYW55LCBldnQ6IGFueSkge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIHJlbW92ZShlbDogYW55KTogTm9kZSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBhbnksIGRvYz86IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7XG4gIH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4ge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogYW55IHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3Rvcnkge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnRmFrZSB1c2VyIGFnZW50JztcbiAgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIHRocm93ICdub3QgaW1wbGVtZW50ZWQnO1xuICB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB0aHJvdyAnbm90IGltcGxlbWVudGVkJztcbiAgfVxufVxuIl19