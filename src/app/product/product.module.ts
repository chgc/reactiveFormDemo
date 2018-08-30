import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: ListComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ])
  ],
  declarations: [ListComponent, EditComponent]
})
export class ProductModule {}
