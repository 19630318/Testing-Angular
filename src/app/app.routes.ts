import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';

export const routes: Routes = [

    {
        path: 'products',
        component: ProductsComponent

    },
    {
        path: 'pico-preview',
        component: PicoPreviewComponent
    },
    {
        path: 'people',
        component: PeopleComponent
    },
    {
        path: 'others',
        component: OthersComponent
    }

];
