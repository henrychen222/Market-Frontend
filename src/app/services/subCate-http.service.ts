import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { baseUrl } from './environment';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/subCate.model';
import { map } from 'rxjs/operators';

@Injectable() 
export class SubCateHttpService implements OnInit{
    constructor(private http: HttpClient) {}

    ngOnInit() {}

    getSubCate(cateName: string): Observable<SubCategory[]>{

        return this.http.get<SubCategory[]>('http://localhost:8080/MarketApp' + `/Category/${cateName}/SubCates`)
        // .pipe(map(res => res.map((item) => new SubCategory(
        //     item.SubCategoryName,
        //     item.SubCategoryID,
        //     item.CategoryID
        // ))));
        // .pipe(map(res => res.map(item => new SubCategory(
        //     item.SubCategoryName,
        //      item.SubCategoryID,
        //      item.CategoryID
        // ))));
        .pipe(map(res => res.map(item => new SubCategory(item))));

        
    }
}