import Link from "next/link";

const links = [
  { href: "/categories", label: "Modelos" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/cart", label: "Carrito" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <nav className="flex items-center justify-between px-8 h-14">
        <Link
          href="/"
          className="text-white text-[11px] font-bold tracking-[0.35em] uppercase"
        >
          AutoHaus
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white/55 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
