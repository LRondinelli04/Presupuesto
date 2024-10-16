import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  private gasto$ = new Subject<any>(); // Subject para los gastos
  private presupuesto$ = new Subject<number>(); // Subject para el presupuesto
  private restante$ = new Subject<number>(); // Subject para el restante

  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
  }

  // Agregar gasto
  agregarGasto(gasto: any) {
    this.restante = this.restante - gasto.cantidad;
    this.gasto$.next(gasto);
    this.restante$.next(this.restante); // Emitir el nuevo valor del restante
  }

  sumarPresupuesto(gasto: any) {
    this.presupuesto += gasto.cantidad;
    this.restante += gasto.cantidad;
    this.presupuesto$.next(this.presupuesto); // Emitir el nuevo valor del presupuesto
    this.restante$.next(this.restante); // Emitir el nuevo valor del restante
    console.log(`Presupuesto actualizado: ${this.presupuesto}`);
  }

  // Obtener gasto
  getGasto(): Observable<any> {
    return this.gasto$.asObservable();
  }

  // Obtener presupuesto
  getPresupuesto(): Observable<number> {
    return this.presupuesto$.asObservable();
  }

  // Obtener restante
  getRestante(): Observable<number> {
    return this.restante$.asObservable();
  }
}