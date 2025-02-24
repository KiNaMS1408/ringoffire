import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {
  @Input() name: any;
  @Input() image = '../../assets/user-circle-svgrepo-com.svg';
  @Input() playerActive: boolean = false;
}
