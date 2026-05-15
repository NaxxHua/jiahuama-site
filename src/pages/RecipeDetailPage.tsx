import { useParams } from "react-router-dom";

export default function RecipeDetailPage() {
  const { id } = useParams();
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 text-center">
      <h1 className="font-display text-4xl font-bold text-fg">{id}</h1>
    </section>
  );
}
