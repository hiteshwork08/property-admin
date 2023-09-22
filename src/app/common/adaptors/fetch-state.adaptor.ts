import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AbstractFetchAdaptor } from "@common/fetch/abstract-fetch.adaptor";
import { Observable, Subject, map } from "rxjs";

interface FetchStatesRes {
  states: StatesInfo[];
}

export interface StatesInfo {
  name: string;
  counties: string[];
}

export interface INTAKE_DROPDOWN {
  id: number;
  name: string;
}

@Injectable()
export class FetchStatesAdaptor extends AbstractFetchAdaptor<object, StatesInfo[]> {
  override name = "fetch-states";
  private http = inject(HttpClient);
  data$ = new Subject<StatesInfo[]>();

  override onRequest(): Observable<StatesInfo[]> {
    return this.http.get<FetchStatesRes>(`assets/mocks/states-counties.json`).pipe(map((res) => res.states));
  }

  override onSuccess(props: object, res: StatesInfo[]): void {
    this.data$.next(res);
  }
}
