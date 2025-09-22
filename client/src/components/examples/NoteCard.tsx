import NoteCard from '../NoteCard';

export default function NoteCardExample() {
  const mockNote = {
    id: '1',
    title: 'React Hooks Fundamentals',
    content: 'Today we covered the basics of React Hooks including useState, useEffect, and custom hooks. Key points: useState for state management, useEffect for side effects and lifecycle methods, custom hooks for reusable logic.',
    tags: ['react', 'frontend', 'javascript'],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T14:20:00'),
  };

  return (
    <div className="w-80">
      <NoteCard
        note={mockNote}
        onSelect={(id) => console.log('Note selected:', id)}
        onDelete={(id) => console.log('Note deleted:', id)}
        onEdit={(id) => console.log('Note edited:', id)}
      />
    </div>
  );
}