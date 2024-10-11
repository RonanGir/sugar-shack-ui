import {Routes} from '@angular/router';
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: 'produits', pathMatch: 'full'},
  {
    path: 'mon-panier',
    title: 'Mon panier',
    component: CartComponent,
  },
  {
    path: 'produits',
    title: 'Nos sirops',
    component: CatalogueComponent,
  }, {
    path: 'produits/:productId',
    title: "Détail d'un sirop",
    component: ProductDetailComponent
  },
  {
    path: '**',
    title: 'Nos sirops',
    component: CatalogueComponent,
  }
];
