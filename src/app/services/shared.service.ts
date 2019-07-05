import { Injectable, OnInit } from "@angular/core";


import { Subject, BehaviorSubject } from "rxjs";


@Injectable()
export class SharedService implements OnInit {

  curProductAttribute: any;

  constructor() {}
  ngOnInit() {}

  private subCateSource = new BehaviorSubject<number>(0);
  private subCateNameSource = new BehaviorSubject<string>('');

  subCate$ = this.subCateSource.asObservable();
  subCateName$ = this.subCateNameSource.asObservable();

  //may not be used anymore
  searchProduct(subCateId) {
    this.subCateSource.next(subCateId);
  }

  emitSubCateName(name) {
    this.subCateNameSource.next(name);
  }

  setCurentSubCateTech(attributeDetail: any) {
    this.curProductAttribute = attributeDetail;
  }

  getCurentSubCateTech():any {
    return this.curProductAttribute;
  }
}
