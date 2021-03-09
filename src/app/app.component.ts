import { UtilService } from './util.service';
import { Component, OnInit } from '@angular/core';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{

  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor(
    private util: UtilService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
      this.selectedIndex = 1;
    });

  }

  navigate(path, selectdId) {
    this.selectedIndex = selectdId;
    this.router.navigate([path])
  }

  close() {
    menuController.toggle()
  }

}


