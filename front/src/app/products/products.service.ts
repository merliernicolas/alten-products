import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    baseUrl: string = 'http://localhost:3000';
    private static productslist: Product[] = null;
    private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/products`);
    }

    create(prod: Product): Observable<Product> {
        return this.http.post(`${this.baseUrl}/products`, prod);
    }

    update(id: number, value: any): Observable<Product>{
        return this.http.put(`${this.baseUrl}/products/${id}`, value);
    }


    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/products/${id}`);
    }
}