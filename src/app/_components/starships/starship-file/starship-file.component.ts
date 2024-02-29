import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Proporciona acceso a los parámetros de la ruta activa.

import { Starship } from '../../../_interfaces/starship.interface';
import { StarwarsService } from '../../../_services';

// posteriormente pilots y films
@Component({
  selector: 'app-starship-file',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './starship-file.component.html',
  styleUrl: './starship-file.component.scss'
})
export class StarshipFileComponent {

  public starshipID: string = '';

  public starship: Starship = {
    id: '',
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    consumables: '',
    hyperdrive_rating: '',
    MGLT: '',
    starship_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
    imageURL: ''
  };

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService){}

    // Recupera el ID de la nave espacial del parámetro de ruta
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.starshipID = params.get('id')!;
      });

      this.getStarship(this.starshipID);
    }

    public getStarship(id: string) {
      this.starwarsService.getStarship(id)
          .subscribe({
            next: async (data) => {
              this.starship = data;
              // this.pilots = this.starship.pilots;
              // this.films = this.starship.films;
              await this.getStarshipPicture(id);
              // this.filmsLoaded = true;
              // this.pilotsLoaded = true;
            },
            error: (error) => console.log(error)
          })
    }

    async getStarshipPicture(id: string) {
      try {
        this.starship.imageURL = await this.starwarsService.getStarshipPicture(id);
      } catch (error) {
        this.starship.imageURL = '../../../assets/images/not-found-starship.jpeg';
      }
  }

}
