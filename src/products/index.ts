export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';
export { StoreLayout } from './layout/StoreLayout';
export { CompleteListPage } from './pages/CompleteListPage';
export { MensPage } from './pages/MensPage';
export { NewProduct } from './pages/NewProduct';
export { WomensPage } from './pages/WomensPage';
export { ProductById } from './pages/ProductById';
export type { Product } from './interfaces/product';
export { productsApi } from './api/productsApi';

export { useProducts } from './hooks/useProducts';
export { useProduct } from './hooks/useProduct';
export { usePrefetchProduct } from './hooks/usePrefetchProduct';
export { useProductMutation } from './hooks/useProductMutation';

export * as productActions from './services/actions';
