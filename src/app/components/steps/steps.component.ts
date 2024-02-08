import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Color} from "../../model/color";
import {Config} from "../../model/config";
import {Model} from "../../model/model";
import {Subject, takeUntil, tap} from "rxjs";
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {SELECTED_COLOR_KEY, SELECTED_CONFIG_KEY, SELECTED_MODEL_KEY} from "../../shared/constants/local-storage-keys";


@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {

  @LocalStorage()
  selectedModel?: Model;
  @LocalStorage()
  selectedColor?: Color;
  @LocalStorage()
  selectedConfig?: Config;

}
