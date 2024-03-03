import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipFileComponent } from './starship-file.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StarwarsService } from '../../../_services';
import { Starship } from '../../../_interfaces/starship.interface';

describe('StarshipFileComponent', () => {
  let component: StarshipFileComponent;
  let fixture: ComponentFixture<StarshipFileComponent>;
  let starwarsService: jasmine.SpyObj<StarwarsService>;

  beforeEach(async () => {
    const starwarsServiceSpy = jasmine.createSpyObj('StarwarsService', ['getStarship', 'getStarshipPicture']);

    await TestBed.configureTestingModule({
      declarations: [ StarshipFileComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({ get: (key: string) => 'starshipId' }) } } },
        { provide: StarwarsService, useValue: starwarsServiceSpy }
      ]
    })
    .compileComponents();

    starwarsService = TestBed.inject(StarwarsService) as jasmine.SpyObj<StarwarsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load starship details on init', () => {
    const mockStarship: Starship = {
      id: "12",
      name: "Nombre",
      model: "modelo",
      manufacturer: "fabricante",
      cost_in_credits: "120000",
      length: "345",
      max_atmosphering_speed: "345",
      crew: "23",
      passengers: "34",
      consumables: '34567',
      hyperdrive_rating: '45',
      MGLT: '34',
      starship_class: 'clase',
      cargo_capacity: '34567',
      pilots: [],
      films: [],
      created: '',
      edited: '',
      url: '',
      imageURL: ''

       /* Provide mock starship object here */ };
    starwarsService.getStarship.and.returnValue(of(mockStarship));
    starwarsService.getStarshipPicture.and.returnValue(Promise.resolve(''));

    component.ngOnInit();

    expect(starwarsService.getStarship).toHaveBeenCalledWith('starshipId');
    expect(component.starship).toEqual(mockStarship);
    expect(component.pilots).toEqual(mockStarship.pilots);
    expect(component.films).toEqual(mockStarship.films);
    expect(component.filmsLoaded).toBeTrue();
    expect(component.pilotsLoaded).toBeTrue();
  });

  it('should handle error when loading starship details', () => {
    const mockError = 'Failed to load starship';
    starwarsService.getStarship.and.returnValue(of(null));
    starwarsService.getStarshipPicture.and.returnValue(Promise.resolve(''));

    spyOn(console, 'log');

    component.ngOnInit();

    expect(starwarsService.getStarship).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(mockError);
  });

  it('should handle error when loading starship picture', async () => {
    const mockError = 'Failed to load picture';
    starwarsService.getStarship.and.returnValue(of({}));
    starwarsService.getStarshipPicture.and.returnValue(Promise.reject(mockError));

    component.ngOnInit();
    await component.getStarshipPicture('starshipId');

    expect(starwarsService.getStarshipPicture).toHaveBeenCalledWith('starshipId');
    expect(component.starship.imageURL).toEqual('../../../../assets/img/gorku_no_disponible.webp');
  });
});
