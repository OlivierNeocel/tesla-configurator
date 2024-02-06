import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

import {
  LocalStorageService,
  SELECTED_COLOR_KEY,
  SELECTED_CONFIG_KEY,
  SELECTED_MODEL_KEY
} from "../../services/local-storage.service";
import {Color} from "../../model/color";
import {Config} from "../../model/config";
import {Model} from "../../model/model";
import {Subject, takeUntil, tap} from "rxjs";


@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [
    RouterLink
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
    this.localStorageService.localStorageChanged$.pipe(
      takeUntil(this.destroySubject),
      tap((event => console.log('Local Storage changed!!! Event: ', event)))
    ).subscribe(
      () => {
        if (this.localStorageService.getItem(SELECTED_MODEL_KEY)) {
          const selectedModel = this.localStorageService.getItem(SELECTED_MODEL_KEY) as string;
          this.selectedModel = JSON.parse(selectedModel) as Model;
        } else {
          this.selectedModel = undefined;
        }

        if (this.localStorageService.getItem(SELECTED_COLOR_KEY)) {
          const selectedColor = this.localStorageService.getItem(SELECTED_COLOR_KEY) as string;
          this.selectedColor = JSON.parse(selectedColor) as Color;
        } else {
          this.selectedColor = undefined;
        }

        if (this.localStorageService.getItem(SELECTED_CONFIG_KEY)) {
          const selectedConfig = this.localStorageService.getItem(SELECTED_CONFIG_KEY) as string;
          this.selectedConfig = JSON.parse(selectedConfig) as Config;
        } else {
          this.selectedConfig = undefined;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
