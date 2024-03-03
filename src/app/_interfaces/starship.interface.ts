export interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  imageURL: string;
}

export interface Pilot {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Film  {
  id: string;
  title: string;
  episode: string;
  imageUrl: string;
}
