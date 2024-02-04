import {Component, OnDestroy, OnInit} from '@angular/core';
import {Model} from "../../api/model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ModelService} from "../../services/model.service";
import { Color } from '../../api/color';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {filter, from, map, Observable, of, Subject, takeUntil, tap} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  models: Model[] = [];
  colors: Color[] = [];

  selectedModel?: Model;
  selectedColor?: Color;

  private destroySubject: Subject<void> = new Subject();

  constructor(private modelService: ModelService,
              private localStorageService: LocalStorageService,
              private formBuilder: FormBuilder) {
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
      takeUntil(this.destroySubject),
      tap(() => {
        this.setSelectedModel();
        this.formGroup.patchValue({colorControl: ''});
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onModelSelect(event: Event){
    const { target } = event;
    if (target) {
      const modelCode = (target as HTMLSelectElement).value;
      from(this.models).pipe(
        takeUntil(this.destroySubject),
        filter(model => model.code === modelCode),
        tap(model => this.localStorageService.setItem('selectedModel', JSON.stringify(model))),
        map(model => model.colors)
      ).subscribe( colors => {
        this.colors = colors;
        this.selectedColor = colors[0];
        this.formGroup.patchValue({colorControl: this.selectedColor.code});
        this.localStorageService.setItem('selectedColor', JSON.stringify(this.selectedColor));
      });
    }
  }

  onColorSelect(event: Event){
    const { target } = event;
    if (target) {
      const colorCode = (target as HTMLSelectElement).value;
      from(this.colors).pipe(
        takeUntil(this.destroySubject),
        filter(color => color.code === colorCode),
      ).subscribe( color => {
        this.selectedColor = color;
        this.localStorageService.setItem('selectedColor', JSON.stringify(this.selectedColor));
      });
    }
  }

  private getModels() {
    this.modelService.getModels().subscribe(models => this.models = models);
  }

  private setSelectedModel() {
    from(this.models).pipe(
      takeUntil(this.destroySubject),
      filter(model => model.code === this.formGroup.get('modelControl')?.value)
    ).subscribe(model => {
      this.selectedModel = model;
    });
  }
}
