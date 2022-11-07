import Heading from "../components/heading";
import Description from "../components/description";
function Footer() {
  const supports = [
    {
      type: "default",
      text: "Thông tin",
    },
    {
      type: "default",
      text: "Chính sách bảo mật",
    },
    {
      type: "default",
      text: "Điều khoản dịch vụ",
    },
    {
      type: "default",
      text: "Liên hệ với tôi",
    },
    {
      type: "default",
      text: "Cài đặt cookie",
    },
  ];
  return (
    <section className="footer">
      <section className="container footer-wrapper">
        <section className="footer-item">
          <Heading text="Chủ sở hữu" />
          <Description text="Pham Tan Duong" type="default" />
        </section>
        <section className="footer-item">
          <Heading text="Gmail" />
          <Description text="phamtanduongtk29@gmail.com" type="gmail" />
        </section>
        <section className="footer-item">
          <Heading text="Công ty" />
          <Description
            text="Trường đại học Sư Phạm-Đại học Đà Nẵng"
            type="default"
          />
        </section>
        <section className="footer-item">
          <Heading text="Hỗ trợ" />
          {supports.map((support, index) => (
            <Description
              text={support.text}
              type={support.type}
              key={"support " + index}
            />
          ))}
        </section>
      </section>
    </section>
  );
}

export default Footer;
