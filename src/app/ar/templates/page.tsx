import CatalogPage from '@/components/CatalogPage';
export const revalidate = 60;
export const metadata = {title:'القوالب الجاهزة'};
export default function Page(){return <CatalogPage kind="templates" arabic/>;}
