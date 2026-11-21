import { useParams } from "react-router-dom";
import RecipesPage from "./RecipesPage";
import RecipeDetailPage from "./RecipeDetailPage";

// Both ends of the photo transition must be ready in the same render.
export default function RecipePages() {
  return useParams().id ? <RecipeDetailPage /> : <RecipesPage />;
}
