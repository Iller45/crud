import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../interfaces/product';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {AddOne, DeleteOne, UpdateOne} from '../../store/actions/products';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector   : 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls  : ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  onEdit          = false;
  public imagePath;
  imgURL: any;
  public message: string;
  productEditForm = this.fb.group({
    name       : ['', Validators.required],
    cost       : ['', Validators.required],
    description: ['', Validators.required],
    img        : ['']
  });

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.initFormValue();
  }

  initFormValue() {
    this.productEditForm.setValue({
      name       : this.product.name,
      cost       : this.product.cost,
      description: this.product.description,
      img        : ''
    });
    this.imgURL = this.product.img;
  }

  delete(product: Product) {
    this.store.dispatch(new DeleteOne(product));
  }

  edit(product: Product) {
    this.initFormValue();
    this.onEdit = true;
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

  saveChanges() {
    const updatedProduct = this.productEditForm.value;
    updatedProduct.id    = this.product.id;
    updatedProduct.img   = this.imgURL ? this.imgURL : this.product.img;
    this.store.dispatch(new UpdateOne(updatedProduct));
    this.onEdit = false;
  }

  cancelChanges() {
    this.onEdit = false;
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

}
