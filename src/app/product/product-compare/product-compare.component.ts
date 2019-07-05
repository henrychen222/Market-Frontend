import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductHttpService } from '../../services/product-http.service';
import { Attribute } from 'src/app/models/attribute.model';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit {

  productsToCompare: [] = [];
  descriptions: string[] = ['Manufacturer', 'Series', 'Model'];
  attributes: string[];
  subId = '1';
  subCateName: string;

  constructor(private productService: ProductService,
              private productHttpService: ProductHttpService,
              private sharedService: SharedService,
              private activedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    this.sharedService.subCateName$.subscribe(name => this.subCateName = name);
    this.activedRoute.params.pipe(map(item => item.subCateId))
    .subscribe(id => {this.subId = id; console.log(this.subId)});
    // this.sharedService.subCate$.subscribe(
    //   item => { this.subId = item.toString(); console.log(this.subId);}
    // );
    this.productService.compares$.subscribe(
      item => {
        this.productsToCompare = item;
        console.log(this.productsToCompare);
      }
    );
    console.log("constructor");

    this.productHttpService.getFilterAttributeDetails(this.subId).subscribe(
      data =>{ 
        this.attributes = data.filter(item => item.isRange > 0)
        .map(item => {
          let ret = item.attributeName;
          ret = ret.replace(" ", "");
          return ret;
        });
        console.log(this.attributes);
      }
    )
  }

}
