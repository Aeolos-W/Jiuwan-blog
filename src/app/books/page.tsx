import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books | What\'s new',
};

export default function BooksPage() {
  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">Books</h2>
      <div className="entry-content space-y-4">
        <p>Here is a list of my published books:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Solving Mathematical Problems: A Personal Perspective</strong> (Oxford University Press, 2006)
          </li>
          <li>
            <strong>Nonlinear Dispersive Equations: Local and Global Analysis</strong> (CBMS Regional Conference Series in Mathematics, 2006)
          </li>
          <li>
            <strong>Structure and Randomness: Pages from Year One of a Mathematical Blog</strong> (AMS, 2008)
          </li>
          <li>
            <strong>Poincaré's Legacies: Pages from Year Two of a Mathematical Blog</strong> (AMS, 2009)
          </li>
          <li>
            <strong>An Epsilon of Room, I: Real Analysis</strong> (AMS, 2010)
          </li>
          <li>
            <strong>An Epsilon of Room, II</strong> (AMS, 2010)
          </li>
          <li>
            <strong>Topics in Random Matrix Theory</strong> (AMS, 2012)
          </li>
          <li>
            <strong>Higher Order Fourier Analysis</strong> (AMS, 2012)
          </li>
          <li>
            <strong>Compactness and Contradiction</strong> (AMS, 2013)
          </li>
          <li>
            <strong>Hilbert's Fifth Problem and Related Topics</strong> (AMS, 2014)
          </li>
          <li>
            <strong>Expansion in Finite Simple Groups of Lie Type</strong> (AMS, 2015)
          </li>
        </ul>
      </div>
    </div>
  );
}
