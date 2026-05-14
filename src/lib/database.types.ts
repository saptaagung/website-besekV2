export type ProductRow = {
  id: string;
  name: string;
  collection_name: string | null;
  description: string | null;
  price_starting_from: number | null;
  main_image_url: string | null;
  main_image_fit?: string | null;
  main_image_position?: string | null;
  main_image_sizes?: string | null;
  image_gallery_urls: string[] | null;
  is_signature: boolean | null;
  labels: string[] | null;
  material: string | null;
  dimensions: string | null;
  technique: string | null;
  color: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SiteContentRow = {
  id: string;
  page_name: string;
  section_name: string;
  headline_text: string | null;
  description_text: string | null;
  image_url: string | null;
  image_fit?: string | null;
  image_position?: string | null;
  image_sizes?: string | null;
};

export type ContactInfoRow = {
  id: string;
  address: string | null;
  phone_whatsapp: string | null;
  email: string | null;
  operational_hours: string | null;
  map_location_data: Record<string, unknown> | null;
};

export type GalleryRow = {
  id: string;
  image_url: string;
  alt_text: string | null;
  section_name: string;
  image_fit?: string | null;
  image_position?: string | null;
  image_sizes?: string | null;
};

export type ContactMessageRow = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at?: string;
};
