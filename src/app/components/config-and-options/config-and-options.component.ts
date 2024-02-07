import {Component, OnDestroy, OnInit} from '@angular/core';
import {Config} from "../../model/config";
import {filter, from, Subject, takeUntil} from "rxjs";
import {OptionService} from "../../shared/services/option.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LocalStorageService} from 'ngx-webstorage';
import {Model} from "../../model/model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Color} from "../../model/color";
import {ImageComponent} from "../../shared/components/image/image.component";
import {
  INCLUDE_TOW_KEY, INCLUDE_YOKE_KEY,
  SELECTED_COLOR_KEY,
  SELECTED_CONFIG_KEY,
  SELECTED_MODEL_KEY
} from "../../shared/constants/local-storage-keys";

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
    if (this.localStorageService.retrieve(SELECTED_MODEL_KEY)) {
      const selectedModel = this.localStorageService.retrieve(SELECTED_MODEL_KEY) as string;
      this.selectedModel = JSON.parse(selectedModel) as Model;
      this.getOption(this.selectedModel.code);
    }

    if (this.localStorageService.retrieve(SELECTED_COLOR_KEY)) {
      const selectedColor = this.localStorageService.retrieve(SELECTED_COLOR_KEY) as string;
      this.selectedColor = JSON.parse(selectedColor) as Color;
    }

    if (this.localStorageService.retrieve(SELECTED_CONFIG_KEY)) {
      const selectedConfig = this.localStorageService.retrieve(SELECTED_CONFIG_KEY) as string;
      this.selectedConfig = JSON.parse(selectedConfig) as Config;
      this.formGroup.patchValue({configControl: this.selectedConfig.id})
    }

    if(this.localStorageService.retrieve(INCLUDE_TOW_KEY)) {
      const includeTow = this.localStorageService.retrieve(INCLUDE_TOW_KEY) as string;
      this.includeTow = includeTow === 'true';
      this.formGroup.patchValue({includeTowControl: this.includeTow});
    }

    if(this.localStorageService.retrieve(INCLUDE_YOKE_KEY)) {
      const includeYoke = this.localStorageService.retrieve(INCLUDE_YOKE_KEY) as string;
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
        this.localStorageService.clear(SELECTED_CONFIG_KEY);
      } else {
        from(this.configs).pipe(
          takeUntil(this.destroySubject),
          filter(config => config.id === configId)
        ).subscribe(config => {
          this.selectedConfig = config;
          this.localStorageService.store(SELECTED_CONFIG_KEY, JSON.stringify(config));
        })
      }
    }
  }

  onIncludeTowChange($event: Event) {
    const { target } = $event;
    if (target) {
      this.includeTow = (target as HTMLInputElement).checked;
      this.localStorageService.store(INCLUDE_TOW_KEY, String(this.includeTow));
    }
  }

  onIncludeYokeChange($event: Event) {
    const { target } = $event;
    if (target) {
      this.includeYoke = (target as HTMLInputElement).checked;
      this.localStorageService.store(INCLUDE_YOKE_KEY, String(this.includeYoke));
    }
  }
}
