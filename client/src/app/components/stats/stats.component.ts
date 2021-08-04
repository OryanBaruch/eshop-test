import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(
    public OrderService:OrderService,
    public StatsService:StatsService
  ) { }

  public statsOfShop:any=JSON.parse(localStorage.getItem('stats'))

  ngOnInit(): void {
    console.log(this.StatsService.fetchShopStats())
  }

}
