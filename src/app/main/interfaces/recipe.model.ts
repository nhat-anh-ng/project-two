export class Recipe {
    id?: string | undefined | null;
    title?: string | undefined | null;
    ingredients?: string | undefined | null;
    preparation?: string | undefined | null;
    meal?: string| undefined | null;
    img?: string | undefined | null;
    seqNo?: number;
}

export interface Recipes {
  foodapp: Recipe[];
} 

export function sortRecipesBySeqNo(c1: Recipe, c2: Recipe) {
  return c1.seqNo! - c2.seqNo!;
}
