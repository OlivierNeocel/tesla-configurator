import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {Model} from "../../../api/model";
import {Color} from "../../../api/color";

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
