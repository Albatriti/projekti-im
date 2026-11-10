// Të gjitha thirrjet drejt Supabase për kategoritë dhe ofruesit.
import { supabase } from '../lib/supabase';

export type Kategoria = {
  id: number;
  name: string;
};

export type Ofruesi = {
  id: number;
  business_name: string;
  category_id: number;
  city: string;
  starting_price: number;
  rating: number;
  categories: { name: string } | null;
};

export type OfruesiIRi = {
  business_name: string;
  category_id: number;
  city: string;
  starting_price: number;
};

export async function merrKategorite(): Promise<Kategoria[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('sort_order');

  if (error) throw error;
  return data;
}

export async function merrOfruesit(): Promise<Ofruesi[]> {
  // `categories(name)` bashkon tabelën categories përmes category_id.
  const { data, error } = await supabase
    .from('providers')
    .select('id, business_name, category_id, city, starting_price, rating, categories(name)')
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as Ofruesi[];
}

export async function shtoOfrues(ofruesi: OfruesiIRi): Promise<void> {
  const { error } = await supabase.from('providers').insert(ofruesi);
  if (error) throw error;
}
