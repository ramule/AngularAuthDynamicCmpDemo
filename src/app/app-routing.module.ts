import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './Auth/auth.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component : RecipeComponent},
    {path: 'recipe', component : RecipeComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'shopping-list', component: ShoppingListComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
