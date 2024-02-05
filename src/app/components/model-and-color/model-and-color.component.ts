import {Component, OnDestroy, OnInit} from '@angular/core';
import {Model} from "../../api/model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ModelService} from "../../services/model.service";
import { Color } from '../../api/color';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {filter, from, map, Subject, takeUntil, tap} from "rxjs";
import {
  INCLUDE_TOW_KEY, INCLUDE_YOKE_KEY,
  LocalStorageService,
  SELECTED_COLOR_KEY,
  SELECTED_CONFIG_KEY,
  SELECTED_MODEL_KEY
} from "../../services/local-storage.service";
import {ImageComponent} from "../image/image.component";

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    ImageComponent,
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

    if (this.localStorageService.getItem(SELECTED_MODEL_KEY)) {
      const selectedModel = this.localStorageService.getItem(SELECTED_MODEL_KEY) as string;
      this.selectedModel = JSON.parse(selectedModel) as Model;
      this.colors = this.selectedModel.colors;
      this.formGroup.patchValue({modelControl: this.selectedModel.code});
    }

    if (this.localStorageService.getItem(SELECTED_COLOR_KEY)) {
      const selectedColor = this.localStorageService.getItem(SELECTED_COLOR_KEY) as string;
      this.selectedColor = JSON.parse(selectedColor) as Color;
      this.formGroup.patchValue({colorControl: this.selectedColor.code});
    }

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

  onModelSelect($event: Event){
    const { target } = $event;
    if (target) {
      const modelCode = (target as HTMLSelectElement).value;
      if (modelCode) {
        from(this.models).pipe(
          takeUntil(this.destroySubject),
          filter(model => model.code === modelCode),
          tap(model => this.localStorageService.setItem(SELECTED_MODEL_KEY, JSON.stringify(model))),
          map(model => model.colors)
        ).subscribe( colors => {
          this.colors = colors;
          this.selectedColor = colors[0];
          this.formGroup.patchValue({colorControl: this.selectedColor.code});
          this.localStorageService.setItem(SELECTED_COLOR_KEY, JSON.stringify(this.selectedColor));

          // Clear Step 2 choices
          this.localStorageService.removeItem(SELECTED_CONFIG_KEY);
          this.localStorageService.removeItem(INCLUDE_TOW_KEY);
          this.localStorageService.removeItem(INCLUDE_YOKE_KEY);
        });
      } else {
        this.selectedModel = undefined;
        this.localStorageService.removeItem(SELECTED_MODEL_KEY);
        this.colors = [];
        this.localStorageService.removeItem(SELECTED_COLOR_KEY);

        // Clear Step 2 choices
        this.localStorageService.removeItem(SELECTED_CONFIG_KEY);
        this.localStorageService.removeItem(INCLUDE_TOW_KEY);
        this.localStorageService.removeItem(INCLUDE_YOKE_KEY);
      }

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
        this.localStorageService.setItem(SELECTED_COLOR_KEY, JSON.stringify(this.selectedColor));
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
