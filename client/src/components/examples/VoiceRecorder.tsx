import VoiceRecorder from '../VoiceRecorder';

export default function VoiceRecorderExample() {
  return (
    <div className="w-80">
      <VoiceRecorder
        onTranscriptionComplete={(text) => console.log('Transcription completed:', text)}
        onTranscriptionUpdate={(text) => console.log('Transcription updated:', text)}
        isEnabled={true}
      />
    </div>
  );
}