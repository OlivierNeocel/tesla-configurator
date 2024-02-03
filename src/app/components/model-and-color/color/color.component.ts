import {Component, Input} from '@angular/core';
import {Color} from "../../../api/color";
import {Model} from "../../../api/model";

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
  @Input() selectedModel?: Model;
  colors: Color[] = [];

  constructor() {}

  ngOnChanges() {
    this.colors = this.selectedModel?.colors ?? [];
  }
}
