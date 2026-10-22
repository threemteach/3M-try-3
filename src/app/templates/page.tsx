import CatalogPage from '@/components/CatalogPage';
export const revalidate = 60;
export const metadata = {title:'Ready-made Templates'};
export default function Page(){return <CatalogPage kind="templates"/>;}
