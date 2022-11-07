import Header from "./layouts/header";
import Footer from "./layouts/footer";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <section className="content-wrapper"></section>
      <Footer />
    </>
  );
}

export { DefaultLayout };
