import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | What\'s new',
};

export default function AboutPage() {
  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">About</h2>
      <div className="entry-content space-y-4">
        <p>
          This site is currently hosting
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>updates on my mathematical research;</li>
          <li>
            expository articles (such as my articles for the{' '}
            <a href="https://press.princeton.edu/titles/10093.html" className="text-tao-teal hover:underline" target="_blank" rel="noopener noreferrer">
              Princeton Companion to Mathematics
            </a>
            , or for the{' '}
            <a href="https://tricki.org/" className="text-tao-teal hover:underline" target="_blank" rel="noopener noreferrer">
              tricks wiki
            </a>
            );
          </li>
          <li>discussion of open problems;</li>
          <li>
            talks that I have given or attended (such as the{' '}
            <a href="#" className="text-tao-teal hover:underline">
              Distinguished Lectures Series at UCLA
            </a>
            );
          </li>
          <li>my advice on mathematical careers and mathematical writing;</li>
          <li>information about my books and applets;</li>
          <li>
            my lecture notes on ergodic theory, on the Poincaré conjecture, on random matrices, on graduate real analysis (245A, 245B and 245C) and introductory graduate probability (275A), on Hilbert's fifth problem, on expansion in finite simple groups of Lie type, on higher order Fourier analysis, and on analytic number theory;
          </li>
          <li>and various other topics, usually related to mathematics.</li>
        </ul>
        <p>
          This blog is created and maintained by Terence Tao, a mathematician at UCLA.
        </p>
        <p>
          The design and layout of this blog are inspired by the original{' '}
          <a href="https://terrytao.wordpress.com/" className="text-tao-teal hover:underline" target="_blank" rel="noopener noreferrer">
            What's new
          </a>{' '}
          WordPress blog.
        </p>
      </div>
    </div>
  );
}
