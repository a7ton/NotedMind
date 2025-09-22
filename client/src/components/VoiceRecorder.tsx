import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Square, Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VoiceRecorderProps {
  onTranscriptionComplete?: (text: string) => void;
  onTranscriptionUpdate?: (text: string) => void;
  isEnabled?: boolean;
}

export default function VoiceRecorder({ 
  onTranscriptionComplete, 
  onTranscriptionUpdate,
  isEnabled = true 
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interim += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => {
            const newText = prev + finalTranscript;
            onTranscriptionUpdate?.(newText);
            return newText;
          });
        }
        
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimTranscript("");
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscriptionUpdate]);

  const startRecording = async () => {
    if (!isEnabled || !isSupported) return;

    try {
      setError(null);
      setTranscript("");
      setInterimTranscript("");
      audioChunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Start audio recording for backup/Whisper transcription
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      console.log('Voice recording started');

    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    try {
      setIsRecording(false);
      setIsProcessing(true);

      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Stop audio recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }

      // Process the final transcript
      if (transcript || interimTranscript) {
        const finalText = transcript + interimTranscript;
        console.log('Transcription completed:', finalText);
        onTranscriptionComplete?.(finalText);
      }

      setIsProcessing(false);
      setInterimTranscript("");

    } catch (err) {
      console.error('Error stopping recording:', err);
      setError('Failed to stop recording');
      setIsProcessing(false);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    console.log('Transcript cleared');
  };

  if (!isSupported) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-4 text-center">
          <MicOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Voice recording is not supported in this browser
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isRecording ? 'border-red-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Voice Notes</span>
            {isRecording && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                Recording
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {(transcript || interimTranscript) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTranscript}
                disabled={isRecording || isProcessing}
                data-testid="button-clear-transcript"
              >
                Clear
              </Button>
            )}
            
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="sm"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!isEnabled || isProcessing}
              data-testid="button-toggle-recording"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isRecording ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              {isProcessing ? 'Processing...' : isRecording ? 'Stop' : 'Record'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {(transcript || interimTranscript) && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Live Transcription:</div>
            <div 
              className="min-h-[60px] p-3 bg-muted/50 rounded-md text-sm"
              data-testid="text-transcript"
            >
              <span className="text-foreground">{transcript}</span>
              <span className="text-muted-foreground italic">{interimTranscript}</span>
              {isRecording && <span className="animate-pulse">|</span>}
            </div>
          </div>
        )}

        {!isRecording && !transcript && !interimTranscript && (
          <div className="text-center py-4">
            <Mic className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click Record to start voice note taking
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}