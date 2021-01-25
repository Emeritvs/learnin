import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {
  private device : string = "desktop";

  constructor(
    private platform : Platform
  ) { }

  ngOnInit() {
    if (this.platform.is('hybrid')) {
      this.device = "hybrid";
    }
  }

}
