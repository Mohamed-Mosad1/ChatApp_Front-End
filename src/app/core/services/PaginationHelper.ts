import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { PaginatedResult } from "src/app/models/Pagination";

export function getPaginatedResult<T>(url: string, params: HttpParams, _httpClient: HttpClient): Observable<PaginatedResult<T | null>> {
  const paginatedResult: PaginatedResult<T | null> = new PaginatedResult<T>();
  return _httpClient.get<T>(url, { observe: 'response', params })
    .pipe(
      map((response) => {
        paginatedResult.result = response.body;
        let pagination = response.headers.get('Pagination');
        if (pagination !== null) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      }));
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) : HttpParams {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());
  return params;
}
