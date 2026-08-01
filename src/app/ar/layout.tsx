export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.documentElement.lang='ar';document.documentElement.dir='rtl';try{localStorage.setItem('3m-language','ar')}catch(e){}",
        }}
      />
      {children}
    </>
  );
}
