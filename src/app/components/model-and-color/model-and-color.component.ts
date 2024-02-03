import {Component, OnInit} from '@angular/core';
import {Model} from "../../api/model";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ModelService} from "../../services/model.service";
import { Color } from '../../api/color';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ColorComponent} from "./color/color.component";

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

  selectedModel?: Model;
  selectedColor?: Color;

  constructor(private modelService: ModelService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      modelControl: [{}], // Initialize with an empty value
    });
  }

  ngOnInit() {
    this.getModels();
  }

  onModelChange() {
    // No need to do anything here, the child component will automatically update the colors based on the selected model.
    console.log(`Model changed.`);
  }

  private getModels() {
    this.modelService.getModels().subscribe(models => this.models = models);
  }
}
