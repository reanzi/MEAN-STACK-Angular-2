import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'help', 
    component: HelpComponent 
  },
  {
      path: 'blog',
      component: BlogComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  { path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
