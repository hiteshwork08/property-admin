import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "property-intake",
    loadComponent: () => import("./features/property-intake/property-intake.component").then((c) => c.PropertyIntakeComponent),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "property-intake",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
