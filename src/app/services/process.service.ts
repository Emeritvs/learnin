import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(public component: Type<any>, public desc: string) {}
}
