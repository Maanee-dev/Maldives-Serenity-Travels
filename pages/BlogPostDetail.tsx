
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(b => b.slug === slug);

  if (!post) return <div className="p-20 text-center">Article not found. <Link to="/stories" className="text-sky-600 underline">Back to Stories</Link></div>;

  return (
    <article className="bg-white min-h-screen">
      <div className="relative h-[60vh] w-full">
         <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-7xl mx-auto">
            <Link to="/stories" className="text-white/80 font-bold text-xs uppercase tracking-widest mb-4 inline-block hover:text-white transition-colors">← Journal</Link>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-2xl">{post.title}</h1>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100">
           <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-800">
              {post.author.charAt(0)}
           </div>
           <div>
              <p className="text-slate-900 font-bold">Written by {post.author}</p>
              <p className="text-slate-400 text-sm">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
           </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
           <p className="text-2xl font-serif text-slate-700 italic leading-relaxed mb-12 border-l-4 border-sky-400 pl-8">
             {post.excerpt}
           </p>
           
           <div className="text-slate-700 leading-relaxed text-lg space-y-8">
             <p>{post.content}</p>
             <p>The Maldives is more than just luxury; it's a feeling of weightlessness. Whether you're flying in a seaplane or taking a slow local ferry, the views remain iconic. Planning your trip requires attention to detail—especially when it comes to transfers and weather windows.</p>
             
             <h3 className="text-3xl font-serif font-bold text-slate-900 mt-12 mb-6">Key Insights for Your Trip</h3>
             <ul className="list-disc pl-6 space-y-4">
                <li>Best visibility for diving is between January and April.</li>
                <li>Seaplanes only operate during daylight hours.</li>
                <li>Local islands offer high-quality diving at a fraction of resort prices.</li>
             </ul>

             <div className="bg-sky-50 p-10 rounded-[2rem] border border-sky-100 my-16">
                <h4 className="text-2xl font-serif font-bold text-sky-900 mb-4">Want to experience this yourself?</h4>
                <p className="text-sky-800 mb-8 font-medium">We specialize in crafting Maldivian journeys that match your dreams perfectly. No automated booking engines—just real human experts.</p>
                <Link to="/plan" className="bg-sky-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-sky-700 transition-all inline-block shadow-xl">
                   PLAN MY CUSTOM TRIP
                </Link>
             </div>
           </div>
        </div>
        
        {/* Social Share Mock */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-slate-400">
           <span className="text-xs font-bold uppercase tracking-widest">Share this story</span>
           <div className="flex gap-6">
              <span className="cursor-pointer hover:text-sky-600 transition-colors">Twitter</span>
              <span className="cursor-pointer hover:text-sky-600 transition-colors">Facebook</span>
              <span className="cursor-pointer hover:text-sky-600 transition-colors">WhatsApp</span>
           </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;
