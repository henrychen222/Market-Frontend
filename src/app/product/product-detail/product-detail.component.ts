import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../../services/product-http.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Product} from 'src/app/models/product.model';
import {Manufacture} from 'src/app/models/manufacture.model';
import {Sale} from 'src/app/models/sale.model';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // Global Variable
  public manufacturer: Manufacture;
  manufacturer_keys: string[];
  public sale: Sale;
  sale_keys: string[];

  product: Product;
  subCateId: string;
  subCateName: string;
  attributes: any = {};

  tech_spec_title: any[] = [];

  constructor(private productHttpService: ProductHttpService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.sharedService.subCateName$.subscribe(name => this.subCateName = name);
    this.getProduct();
  }

  getProductAttributesData(subCateId: number, productId: number) {
    this.productHttpService.getProductsOfSubCate(String(subCateId))
      .subscribe(
        data => {
          data.forEach(element => {
            if (element.productId === productId) {
              this.attributes = element.attributes;
              console.log(this.attributes);
            }
          });
        }
      );
  }

  getProduct() {
    //  product id
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.productHttpService.getProductById(Number(id))
      .subscribe(
        data => {
          this.product = data;
          console.log(this.product);
          if (data !== null && data !== undefined) {
            // this.manufatureId = data.manufacturerId;
            // this.saleId = String(data.saleId);
            this.subCateId = String(data.subCategoryID);
            this.fetchData(String(data.saleId));
            this.fetchManufacturerData(String(data.manufacturerId));
            this.getTechTitle(this.subCateId);
            // this.sharedService.setCurentSubCateTech(this.product.attributes);
            this.product.detailsArray = data.description.split('/');
            this.getProductAttributesData(this.product.subCategoryID, this.product.productID);
          }
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('Fetching product complete...');
        }
      );
  }

  public getTechTitle(subCateId: string) {
    // const curTechDetail = this.sharedService.getCurentSubCateTech();
    this.productHttpService.getFilterAttributeDetails(subCateId)
      .subscribe(
        data => {
          data.forEach(element => {
            if (element.isRange) {
              this.tech_spec_title.push(element.attributeName);
            }
          });
          console.log(this.tech_spec_title);
        },
        err => {
          console.log('Get Tech Spec err: ' + err);
        },
        () => {
          console.log('GetTechSpec complete...');
        }
      );
  }

  fetchData(saleId: string) {
    console.log(this.product.saleId);
    this.productHttpService.getSales(Number(saleId)).subscribe(response => {
      this.sale = response;
      console.log(this.sale);
      this.sale_keys = Object.keys(response);
      this.product.sale = this.sale;
    });
  }

  fetchManufacturerData(manufacturerId: string) {
    this.productHttpService.getManufacturer(Number(manufacturerId)).subscribe(response => {
      this.manufacturer = response;
      console.log(this.manufacturer);
      this.manufacturer_keys = Object.keys(this.manufacturer);
      this.product.manufacture = this.manufacturer;
    });
  }
}


/********** My Code *************/
// import {Component, OnInit} from '@angular/core';
// import {ProductHttpService} from '../../services/product-http.service';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import { Product } from 'src/app/models/product.model';
// import { SharedService } from 'src/app/services/shared.service';
//
// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css']
// })
// export class ProductDetailComponent implements OnInit {
//
//   // Global Variable
//   public product: any;
//   public manufacturer: any;
//   public sales: any;
//
//   constructor(private productHttpService: ProductHttpService,
//               // private sharedService: SharedService,
//               private route: ActivatedRoute,
//               private location: Location) {
//
//   }
//
//   ngOnInit() {
//
//     this.fetchProductData();
//     this.fetchSalesData();
//     this.fetchManufacturerData();
//   }
//
//   fetchProductData() {
//     const productSummary = this.service.getProductSummary(1);
//     const productSummarysubs = productSummary.subscribe(response => {
//       this.product = response;
//       console.log(this.product);
//       console.log(typeof (this.product));
//       // this.fetchData();
//       this.getProduct();
//     }
//
//     cur_product: Product;
//     manufatureId: string;
//     saleId: string;
//     subCateId: string;
//
//     tech_spec_title: any;
//
//   public getProduct() {
//       const id = +this.route.snapshot.paramMap.get('id');
//       // console.log(id);
//       this.productHttpService.getProductById(Number(id))
//         .subscribe(
//           data => {
//             this.cur_product = data;
//             console.log(this.cur_product);
//             if (data !== null && data !== undefined) {
//               this.manufatureId = data.manufacturerId;
//               this.saleId = String(data.saleId);
//               this.subCateId = String(data.subCategoryID);
//             }
//           },
//           err => {console.log(err)},
//           () => {this.getTechTitle(this.subCateId);}
//         )
//     }
//
//   public getTechTitle(subCateId: string) {
//       // const curTechDetail = this.sharedService.getCurentSubCateTech();
//
//     }
//
//     fetchData() {
//       const productSummary = this.productHttpService.getProductSummary(1);
//       const productSummarysubs =  productSummary.subscribe(response => {
//         this.data = response;
//         console.log(this.data);
//       });
//       console.log(productSummary);
//       console.log(productSummarysubs);
//     }
//
//
//     fetchSalesData() {
//       console.log(this.product.saleId);
//       this.service.getSales(this.product['saleId']).subscribe(response => {
//         this.sales = response;
//         console.log(this.sales);
//       });
//     }
//
//     fetchManufacturerData() {
//       this.service.getManufacturer(this.product.manufacturerId).subscribe(response => {
//         this.manufacturer = response;
//         console.log(this.manufacturer);
//       });
//     }
//   }
