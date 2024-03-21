import { redirect } from "react-router-dom";
import { removeRecipe } from "../../api/index.ts";

export async function action({ params }) {
    await removeRecipe(params.id)
    return redirect('/recipes')
}