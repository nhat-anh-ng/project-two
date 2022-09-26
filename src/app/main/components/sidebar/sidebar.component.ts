import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() scrollToTopEvent = new EventEmitter<void>();
  windowScrolled = false;

  iconTypes = [
      {icon: "brightness_5"},
      {icon: "brightness_7"},
      {icon: "brightness_4"},
      {icon: "widgets"},
      {icon: "local_drink"},
    ]
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(){
    this.scrollToTopEvent.emit(window.scrollTo(0, 0)) 
  }

}
