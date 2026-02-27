export default function HomeSection2(props: { extraClass: string }) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen flex items-center`}
    >
      <h2>Hello From HomeSection2</h2>
    </section>
  );
}
