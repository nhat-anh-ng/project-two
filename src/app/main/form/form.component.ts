import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  })

  get f() { return this.recipeForm.controls; }
  constructor() { }

  ngOnInit(): void {
  }

}
