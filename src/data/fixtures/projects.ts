export const projectCategories = [
  'Institucionais',
  'Reels',
  'Varejo',
  'Inteligencia Artificial',
  'Motions Graphics',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  imageSrc: string;
  imageAlt: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: 'continental',
    title: 'Continental',
    category: 'Institucionais',
    imageSrc: '/continentalImage.png',
    imageAlt: 'Campanha institucional da Continental',
    summary:
      'Narrativa de marca com acabamento cinematografico e foco em produto.',
  },
  {
    slug: 'castrolanda',
    title: 'Castrolanda',
    category: 'Reels',
    imageSrc: '/castolandaLogo.png',
    imageAlt: 'Projeto publicitario da Castolanda',
    summary: 'Peca comercial com ritmo dinamico e direcao de arte limpa.',
  },
  {
    slug: 'lojas-mm',
    title: 'Lojas MM',
    category: 'Institucionais',
    imageSrc: '/lojasmmLogo.png',
    imageAlt: 'Campanha visual para Lojas MM',
    summary:
      'Conteudo orientado a lifestyle com linguagem visual mais editorial.',
  },
  {
    slug: 'copagril',
    title: 'Copagril',
    category: 'Reels',
    imageSrc: '/copagriLogo.png',
    imageAlt: 'Video institucional da Copagril',
    summary:
      'Captacao em campo com discurso de marca claro e proximidade humana.',
  },
];
