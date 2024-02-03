import {Component, OnInit} from '@angular/core';
import {Model} from "../../api/model";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ModelService} from "../../services/model.service";
import { Color } from '../../api/color';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ColorComponent} from "./color/color.component";
import {filter, from, map, Observable, of, tap} from "rxjs";

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule,
    ColorComponent
  ],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent implements OnInit {
  formGroup: FormGroup;
  models: Model[] = [];
  colors: Color[] = [];

  selectedModel?: Model;
  selectedColor?: Color;

  constructor(private modelService: ModelService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      modelControl: [''], // Initialize with an empty value
      colorControl: ['']
    });
  }

  ngOnInit() {
    this.getModels();

    this.formGroup
      .get('modelControl')
      ?.valueChanges.pipe(
      tap(() => {
        this.formGroup.patchValue({colorControl: ''});
      })
    ).subscribe();
  }

  onSelect(event: Event){
    const { target } = event;
    if (target) {
      const modelCode = (target as HTMLSelectElement).value;
      from(this.models).pipe(
        filter(model => model.code === modelCode),
        map(model => model.colors)
      ).subscribe( colors => this.colors = colors);
    }

  }

  private getModels() {
    this.modelService.getModels().subscribe(models => this.models = models);
  }
}
