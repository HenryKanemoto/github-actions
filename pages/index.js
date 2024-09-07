import Link from "next/link";

export default function HomeScreen() {
  return (
    <div>
      <h1>Olá Mundo</h1>
      <Link href={"./sobre"}>
        <a>Ir para sobre</a>
      </Link>
    </div>
  );
}
