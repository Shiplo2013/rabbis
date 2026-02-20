import Link from "next/link";

function Header() {
  return (
    <header>
      <h2>Header</h2>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Header;