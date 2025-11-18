import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { recipeData } from '../recipeData';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  selected: Boolean = true;
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (data) => {
        console.log('Recetas cargadas:', data);
        this.recipes = data;
        this.selected = false;
      },
      (error) => {
        console.error('Error al cargar recetas:', error);
        this.selected = false;
      }
    );
  }

  onSelect(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.selected = true;
  }

  goToDetail(id: number): void {
    this.router.navigate(['/recipe', id]);
  }

  getIngredientCount(recipe: any): number {
  return recipe.ingredients ? recipe.ingredients.length : 0;
}

}
