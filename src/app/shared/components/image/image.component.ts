import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {Model} from "../../../model/model";
import {Color} from "../../../model/color";

@Component({
  selector: 'app-image',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() selectedModel?: Model;
  @Input() selectedColor?: Color;
}
