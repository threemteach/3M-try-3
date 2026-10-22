import CatalogPage from '@/components/CatalogPage';
export const revalidate = 60;
export const metadata = {title:'Subscription Plans'};
export default function Page(){return <CatalogPage kind="plans"/>;}
