import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AuthService } from "./services/auth/auth.service";

// Metadata for external plant data
interface PlantData {
  key: string;
  value: string;
}

// Returned when searching external plants
export interface ExternalPlant {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  images: {
    thumb: string;
    title: string;
  };
  data: PlantData[];
}

// Payload to add plant to garden
export interface AddPlantRequest {
  id: number; // Permapeople ID
  name: string;
  imageUrl: string;
  waterRequirement: string;
  lightRequirement: string;
}

// Returned from user's garden
export interface UserPlant {
  id: number; // Local DB ID
  permapeopleId: number;
  name: string;
  imageUrl: string;
  lightRequirement: string;
  nextWatering: Date;
  needsWatering: boolean;
}

// Search API response structure
interface PlantSearchResponse {
  plants: ExternalPlant[];
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserPlants(): Observable<UserPlant[]> {
    return this.http.get<UserPlant[]>(`${this.baseUrl}/api/user-plants`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  searchPlants(query: string): Observable<PlantSearchResponse> {
    return this.http.get<PlantSearchResponse>(
      `${this.baseUrl}/api/external/plants/search`,
      {
        params: { query: query.trim() },
        headers: this.authService.getAuthHeaders(),
      }
    );
  }

  getPlantById(id: number): Observable<ExternalPlant> {
    return this.http.get<ExternalPlant>(
      `${this.baseUrl}/api/external/plants/${id}`,
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }

  addPlantToGarden(plant: AddPlantRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user-plants`, plant, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  removePlantFromGarden(plantId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/user-plants/${plantId}`);
  }

  waterPlant(plantId: number): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/api/user-plants/water`,
      { plantId },
      { headers: this.authService.getAuthHeaders() }
    );
  }
}
