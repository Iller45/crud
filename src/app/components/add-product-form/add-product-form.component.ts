import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AddOne, LoadProducts} from '../../store/actions/products';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {Product} from '../../interfaces/product';

@Component({
  selector   : 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls  : ['./add-product-form.component.scss']
})
export class AddProductFormComponent {
  @Input() product: Product;
  addOne      = true;
  public imagePath;
  imgURL: any;
  public message: string;
  productForm = this.fb.group({
    name       : ['', Validators.required],
    cost       : ['', Validators.required],
    description: ['', Validators.required],
    img        : ['']
  });

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {
  }


  preview(files) {
    if (files.length === 0) {
      return null;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader   = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  addProduct = () => {
    const productItem = this.productForm.value;
    productItem.img   = this.imgURL;
    this.store.dispatch(new AddOne(productItem));
  }

  openInput() {
    document.getElementById('product_img').click();
  }


}
