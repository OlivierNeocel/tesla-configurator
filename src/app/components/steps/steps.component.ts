import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Color} from "../../model/color";
import {Config} from "../../model/config";
import {Model} from "../../model/model";
import {Subject, takeUntil, tap} from "rxjs";
import {LocalStorageService} from 'ngx-webstorage';
import {SELECTED_COLOR_KEY, SELECTED_CONFIG_KEY, SELECTED_MODEL_KEY} from "../../shared/constants/local-storage-keys";


@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent implements OnInit, OnDestroy {

  selectedModel?: Model;
  selectedColor?: Color;
  selectedConfig?: Config;

  private destroySubject: Subject<void> = new Subject();

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.observe(SELECTED_MODEL_KEY)
      .subscribe((value) => {
        if (this.localStorageService.retrieve(SELECTED_MODEL_KEY)) {
          const selectedModel = this.localStorageService.retrieve(SELECTED_MODEL_KEY) as string;
          this.selectedModel = JSON.parse(selectedModel) as Model;
        } else {
          this.selectedModel = undefined;
        }
      });

    this.localStorageService.observe(SELECTED_COLOR_KEY)
      .subscribe((value) => {
        if (this.localStorageService.retrieve(SELECTED_COLOR_KEY)) {
          const selectedColor = this.localStorageService.retrieve(SELECTED_COLOR_KEY) as string;
          this.selectedColor = JSON.parse(selectedColor) as Color;
        } else {
          this.selectedColor = undefined;
        }
      });

    this.localStorageService.observe(SELECTED_CONFIG_KEY)
      .subscribe((value) => {
        if (this.localStorageService.retrieve(SELECTED_CONFIG_KEY)) {
          const selectedConfig = this.localStorageService.retrieve(SELECTED_CONFIG_KEY) as string;
          this.selectedConfig = JSON.parse(selectedConfig) as Config;
        } else {
          this.selectedConfig = undefined;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  private _listener = () => {
    if (this.localStorageService.retrieve(SELECTED_MODEL_KEY)) {
      const selectedModel = this.localStorageService.retrieve(SELECTED_MODEL_KEY) as string;
      this.selectedModel = JSON.parse(selectedModel) as Model;
    } else {
      this.selectedModel = undefined;
    }

    if (this.localStorageService.retrieve(SELECTED_COLOR_KEY)) {
      const selectedColor = this.localStorageService.retrieve(SELECTED_COLOR_KEY) as string;
      this.selectedColor = JSON.parse(selectedColor) as Color;
    } else {
      this.selectedColor = undefined;
    }

    if (this.localStorageService.retrieve(SELECTED_CONFIG_KEY)) {
      const selectedConfig = this.localStorageService.retrieve(SELECTED_CONFIG_KEY) as string;
      this.selectedConfig = JSON.parse(selectedConfig) as Config;
    } else {
      this.selectedConfig = undefined;
    }
  }

}
