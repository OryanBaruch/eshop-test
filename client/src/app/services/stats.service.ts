import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(public http: HttpClient) { }
  public stats: any[] = []


  public fetchShopStats = () => {
    return this.http.get(`http://localhost:5000/order/all-orders`).subscribe(
      (res: any) => {
        console.log('2', res.sorted)
        this.stats = res.sorted
        localStorage.setItem('stats', JSON.stringify(this.stats))
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
