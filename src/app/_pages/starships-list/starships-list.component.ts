import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
// infinitescrollmodule posteriormente

import { Starship } from '../../_interfaces/starship.interface';
import { StarwarsService } from '../../_services';

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.scss'
})


export class StarshipsListComponent {

  public starships: Starship[] = [];
  private page: number = 1;
  public loadMore: boolean = true;

  constructor(
    private starwarsService: StarwarsService,
    private router: Router) {}

    ngOnInit(): void {
      this.getStarships();
    }

    public getStarships() {
      this.starwarsService.getStarships(this.page)
          .subscribe({
            next: (data) => {
              this.starships = this.starships.concat(data.results);
              this.starships.forEach(ship => {
                ship.id = ship.url.split('/').reverse()[1];
              });
            },
            error: (error) => {
              //should not load more Starships
              if (error.status === 404) this.loadMore = false;
            }
          });

    }




    public loadMoreStarships() {
      if (this.loadMore) {
        this.page++;
        this.getStarships();
      }
    }

    public viewShip(id: string) {
      this.router.navigate(['/starships', id]);
    }

}
