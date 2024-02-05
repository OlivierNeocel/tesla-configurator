import {Component, OnDestroy, OnInit} from '@angular/core';
import {Config} from "../../api/config";
import {filter, from, Subject, takeUntil} from "rxjs";
import {OptionService} from "../../services/option.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  INCLUDE_TOW_KEY, INCLUDE_YOKE_KEY,
  LocalStorageService,
  SELECTED_COLOR_KEY,
  SELECTED_CONFIG_KEY,
  SELECTED_MODEL_KEY
} from "../../services/local-storage.service";
import {Model} from "../../api/model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Color} from "../../api/color";
import {ImageComponent} from "../image/image.component";

@Component({
  selector: 'app-config-and-options',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    CurrencyPipe,
    ImageComponent
  ],
  templateUrl: './config-and-options.component.html',
  styleUrl: './config-and-options.component.scss'
})
export class ConfigAndOptionsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  configs: Config[] = [];
  selectedConfig?: Config;
  isTowHitchAvailable: boolean = false;
  isYokeAvailable: boolean = false;

  includeTow: boolean = false;
  includeYoke: boolean = false;

  selectedModel?: Model;
  selectedColor?: Color;

  private destroySubject: Subject<void> = new Subject();

  constructor(private optionService: OptionService,
              private localStorageService: LocalStorageService,
              private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      configControl: [''], // Initialize with an empty value
      includeTowControl: false,
      includeYokeControl: false
    });
  }

  ngOnInit() {
    if (this.localStorageService.getItem(SELECTED_MODEL_KEY)) {
      const selectedModel = this.localStorageService.getItem(SELECTED_MODEL_KEY) as string;
      this.selectedModel = JSON.parse(selectedModel) as Model;
      this.getOption(this.selectedModel.code);
    }

    if (this.localStorageService.getItem(SELECTED_COLOR_KEY)) {
      const selectedColor = this.localStorageService.getItem(SELECTED_COLOR_KEY) as string;
      this.selectedColor = JSON.parse(selectedColor) as Color;
    }

    if (this.localStorageService.getItem(SELECTED_CONFIG_KEY)) {
      const selectedConfig = this.localStorageService.getItem(SELECTED_CONFIG_KEY) as string;
      this.selectedConfig = JSON.parse(selectedConfig) as Config;
      this.formGroup.patchValue({configControl: this.selectedConfig.id})
    }

    if(this.localStorageService.getItem(INCLUDE_TOW_KEY)) {
      const includeTow = this.localStorageService.getItem(INCLUDE_TOW_KEY) as string;
      this.includeTow = includeTow === 'true';
      this.formGroup.patchValue({includeTowControl: this.includeTow});
    }

    if(this.localStorageService.getItem(INCLUDE_YOKE_KEY)) {
      const includeYoke = this.localStorageService.getItem(INCLUDE_YOKE_KEY) as string;
      this.includeYoke = includeYoke === 'true';
      this.formGroup.patchValue({includeYokeControl: this.includeYoke});
    }

  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  private getOption(modelCode: string) {
    this.optionService.getOption(modelCode).subscribe(option => {
      this.configs = option.configs;
      this.isTowHitchAvailable = option.towHitch;
      this.isYokeAvailable = option.yoke;
    });
  }

  onConfigSelect($event: Event) {
    const { target } = $event;
    if (target) {
      const configId = Number((target as HTMLSelectElement).value as string);
      if(configId === 0) {
        this.selectedConfig = undefined;
        this.localStorageService.removeItem(SELECTED_CONFIG_KEY);
      } else {
        from(this.configs).pipe(
          takeUntil(this.destroySubject),
          filter(config => config.id === configId)
        ).subscribe(config => {
          this.selectedConfig = config;
          this.localStorageService.setItem(SELECTED_CONFIG_KEY, JSON.stringify(config));
        })
      }
    }
  }

  onIncludeTowChange($event: Event) {
    const { target } = $event;
    if (target) {
      this.includeTow = (target as HTMLInputElement).checked;
      this.localStorageService.setItem(INCLUDE_TOW_KEY, String(this.includeTow));
    }
  }

  onIncludeYokeChange($event: Event) {
    const { target } = $event;
    if (target) {
      this.includeYoke = (target as HTMLInputElement).checked;
      this.localStorageService.setItem(INCLUDE_YOKE_KEY, String(this.includeYoke));
    }
  }
}
