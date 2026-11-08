// Blog posts and projects live in the backend database in English only.
// Their Arabic/Spanish versions are kept here, keyed by slug, and applied
// on top of the API data at render time (same pattern as servicesData).
import blogAr from './translations/blog.ar.json';
import blogEs from './translations/blog.es.json';
import projectsAr from './translations/projects.ar.json';
import projectsEs from './translations/projects.es.json';

const BLOG = { ar: blogAr, es: blogEs };
const PROJECTS = { ar: projectsAr, es: projectsEs };

export function localizePost(post, locale) {
  if (!post || locale === 'en') return post;
  const tr = BLOG[locale] && BLOG[locale][post.slug];
  if (!tr) return post;
  return {
    ...post,
    title: tr.title || post.title,
    excerpt: tr.excerpt || post.excerpt,
    content: tr.content || post.content,
    category: tr.category || post.category,
    _translated: true,
  };
}

export function localizeProject(project, locale) {
  if (!project || locale === 'en') return project;
  const tr = PROJECTS[locale] && PROJECTS[locale][project.slug];
  if (!tr) return project;
  return {
    ...project,
    title: tr.title || project.title,
    description: tr.description || project.description,
    location: tr.location || project.location,
    duration: tr.duration || project.duration,
    category: tr.category || project.category,
    _translated: true,
  };
}
