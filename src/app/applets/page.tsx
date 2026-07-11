import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applets | What\'s new',
};

export default function AppletsPage() {
  return (
    <div>
      <h2 className="font-heading text-h2 mb-4">Applets</h2>
      <div className="entry-content space-y-4">
        <p>Here are some mathematical applets and interactive tools:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <a href="#" className="text-tao-teal hover:underline">
              Fourier analysis applet
            </a>
          </li>
          <li>
            <a href="#" className="text-tao-teal hover:underline">
              Prime number distribution visualizer
            </a>
          </li>
          <li>
            <a href="#" className="text-tao-teal hover:underline">
              Random matrix eigenvalue simulator
            </a>
          </li>
        </ul>
        <p className="text-tao-gray italic">
          More applets will be added soon.
        </p>
      </div>
    </div>
  );
}
