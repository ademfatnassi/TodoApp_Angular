import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';
import { UserGuard } from './guards/user.guard';
import { Page404ComponentComponent } from './components/page404-component/page404-component.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'todo-list',
    component: TodoListComponent,
    canActivate: [UserGuard] // L'utlisateur doit être connecté.
  },
  {
    path: 'todo-add',
    component: TodoAddComponent,
    canActivate: [UserGuard] // L'utlisateur doit être connecté.
  },
  {
    path: 'todo-update/:id',
    component: TodoUpdateComponent,
    canActivate: [UserGuard] // L'utlisateur doit être connecté.
  },
  {
    path: 'admin/gestion-users',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: Page404ComponentComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
