import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class ExecuteService {

  public data : any;

  constructor(
    private emitter : EventEmitterService
  ) { }

  functionExecute(functionName:string,params:any)
  {
    console.log('execute')
    this.carregarParametros(params);

    const param = {
      function:functionName,
      data:params
    }
    this.emitter.onFirstComponentButtonClick(param); 
  }

  carregarParametros(dados : any){
    this.data = dados;
  }
}
