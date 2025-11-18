import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private apiUrl = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas';

  constructor(private http: HttpClient) { }

  // Función para obtener la lista de todas las recetas
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipe.json`);
  }

  // Función para obtener el detalle de una receta específica
  getRecipeDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/recipe.json`);
  }
}
