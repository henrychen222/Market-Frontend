import {Component, OnInit} from '@angular/core';
import {SubCateHttpService} from '../services/subCate-http.service';
import {SubCategory} from '../models/subCate.model';
import {ProductHttpService} from '../services/product-http.service';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../services/shared.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private cates: string[] = ['Mechanical'];
  private subCates: SubCategory[];
  private selected;
  subCatesForm: FormGroup;

  constructor(private subCateHttpService: SubCateHttpService,
              private productHttpService: ProductHttpService,
              private fb: FormBuilder,
              private sharedService: SharedService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  // added by Wei


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.subCatesForm = this.fb.group({
      subCate: ['', Validators.required]
    });
  }

  showSubCate(cate) {
    this.subCateHttpService.getSubCate(cate).subscribe(
      (resp) => {
        this.subCates = <SubCategory[]> resp;
        // console.log(this.subCates);
      }
    );
  }

  // onSearch() {
  //   let id = this.subCates.find(cate => cate.name === this.selected).id;
  //   console.log(id);
  // }
  onSubmit() {
    if (this.subCatesForm.invalid) {
      return;
    }
    let subCate = this.subCates.find(cate => cate.name === this.subCatesForm.controls.subCate.value);
    let id = subCate.id;
    console.log(typeof id);
    this.sharedService.searchProduct(id);
    this.sharedService.emitSubCateName(subCate.name);
    this.router.navigate([`subCate/${id}/products`]);
  }


}
