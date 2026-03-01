import { useParams, Navigate } from 'react-router-dom';
import { getProjectsByCategory } from '../data/projects';
import type { Category } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const META: Record<Category, { title: string; sub: string; accent: string; description: string }> = {
  cs: {
    title: 'Computer Science',
    sub: 'Embedded · Firmware · IoT · Software',
    accent: 'blue',
    description:
      'Projects spanning custom USB HID firmware, PCB design, IoT device development, and cloud-connected embedded systems.',
  },
  me: {
    title: 'Mechanical Engineering',
    sub: 'CAD · Surface Modeling · FEA · Manufacturing',
    accent: 'emerald',
    description:
      'Projects in parametric CAD, advanced surface modeling, finite element analysis, and mechanical systems design.',
  },
};

export default function ProjectsOverview() {
  const { category } = useParams<{ category: string }>();

  if (category !== 'cs' && category !== 'me') {
    return <Navigate to="/" replace />;
  }

  const cat = category as Category;
  const meta = META[cat];
  const projects = getProjectsByCategory(cat);

  const accentBorder = cat === 'cs' ? 'border-blue-500' : 'border-emerald-500';
  const accentText = cat === 'cs' ? 'text-blue-400' : 'text-emerald-400';
  const accentBg =
    cat === 'cs'
      ? 'linear-gradient(135deg, #0d1117 0%, #1e3a5f 100%)'
      : 'linear-gradient(135deg, #0d1117 0%, #064e3b 100%)';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div
        className="py-20 px-6"
        style={{ background: accentBg }}
      >
        <div className="max-w-5xl mx-auto">
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] mb-3 ${accentText}`}>
            {meta.sub}
          </p>
          <h1
            className={`text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight border-l-4 pl-4 ${accentBorder}`}
          >
            {meta.title}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <p className="text-sm font-medium text-slate-500 mb-8">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
        {projects.length === 0 ? (
          <p className="text-slate-500 text-base">No projects found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
