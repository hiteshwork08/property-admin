import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule } from "@angular/material/dialog";
import { ReceivedDocsFormComponent } from './features/property-intake/components/received-docs-form/received-docs-form.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    NgxMaskModule.forRoot(options),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
