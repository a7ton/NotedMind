import RichTextEditor from '../RichTextEditor';

export default function RichTextEditorExample() {
  return (
    <div className="w-full max-w-4xl">
      <RichTextEditor
        placeholder="Start typing your lecture notes..."
        onChange={(content) => console.log('Content changed:', content)}
      />
    </div>
  );
}