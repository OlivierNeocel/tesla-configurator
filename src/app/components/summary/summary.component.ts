import {Component, OnInit} from '@angular/core';
import {Config} from "../../model/config";
import {Model} from "../../model/model";
import {Color} from "../../model/color";
import {CurrencyPipe, NgIf} from "@angular/common";
import {ImageComponent} from "../../shared/components/image/image.component";
import {LocalStorageService} from "ngx-webstorage";
import {
  INCLUDE_TOW_KEY, INCLUDE_YOKE_KEY,
  SELECTED_COLOR_KEY,
  SELECTED_CONFIG_KEY,
  SELECTED_MODEL_KEY
} from "../../shared/constants/local-storage-keys";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    ImageComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  selectedModel?: Model;
  selectedColor?: Color;

  selectedConfig?: Config;
  includeTow: boolean = false;
  includeYoke: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorageService.retrieve(SELECTED_MODEL_KEY)) {
      const selectedModel = this.localStorageService.retrieve(SELECTED_MODEL_KEY) as string;
      this.selectedModel = JSON.parse(selectedModel) as Model;
    }

    if (this.localStorageService.retrieve(SELECTED_COLOR_KEY)) {
      const selectedColor = this.localStorageService.retrieve(SELECTED_COLOR_KEY) as string;
      this.selectedColor = JSON.parse(selectedColor) as Color;
    }

    if (this.localStorageService.retrieve(SELECTED_CONFIG_KEY)) {
      const selectedConfig = this.localStorageService.retrieve(SELECTED_CONFIG_KEY) as string;
      this.selectedConfig = JSON.parse(selectedConfig) as Config;
    }

    if(this.localStorageService.retrieve(INCLUDE_TOW_KEY)) {
      const includeTow = this.localStorageService.retrieve(INCLUDE_TOW_KEY) as string;
      this.includeTow = includeTow === 'true';
    }

    if(this.localStorageService.retrieve(INCLUDE_YOKE_KEY)) {
      const includeYoke = this.localStorageService.retrieve(INCLUDE_YOKE_KEY) as string;
      this.includeYoke = includeYoke === 'true';
    }
  }

  totalCost() {
    const configPrice = this.selectedConfig?.price as number;
    const colorPrice = this.selectedColor?.price as number;
    const towPriceIfIncluded: number = this.includeTow ? 1000 : 0;
    const yokePriceIfIncluded: number = this.includeYoke ? 1000 : 0;
    return configPrice + colorPrice + towPriceIfIncluded + yokePriceIfIncluded;
  }
}
