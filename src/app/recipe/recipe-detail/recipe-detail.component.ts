import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        if (!id) {
          this.loading = false;
          return;
        } else {
        this.recipeService.getRecipeDetail(id).subscribe(
          (data) => {
            this.recipe = data;
            this.loading = false;
          },
          (error) => {
            console.error('Error al cargar detalle de receta:', error);
            this.loading = false;
          }
        );
      }}
    );
  }

  getMaxIngredient(): any {
  if (!this.recipe || !this.recipe.ingredientes || this.recipe.ingredientes.length === 0) {
    return null;
  }
  
  return this.recipe.ingredientes.reduce((max: any, ingredient: any) => {
    const maxQuantity = parseFloat(max.quantity) || 0;
    const currentQuantity = parseFloat(ingredient.quantity) || 0;
    return currentQuantity > maxQuantity ? ingredient : max;
  });
}


  goBack(): void {
    this.router.navigate(['/recipe']);
  }
}
