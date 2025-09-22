import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

let openai: OpenAI | null = null;

// Initialize OpenAI only if API key is available
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Process raw transcription into structured notes
export async function processTranscriptionToNotes(transcription: string): Promise<{
  title: string;
  content: string;
  tags: string[];
  keyPoints: string[];
}> {
  if (!openai) {
    throw new Error("OpenAI not initialized - API key not available");
  }
  
  try {
    const prompt = `Please process the following voice transcription into well-structured lecture/meeting notes. 

Transcription: "${transcription}"

Format the output as JSON with the following structure:
{
  "title": "A concise, descriptive title for the notes",
  "content": "Clean, well-formatted notes with proper paragraphs, bullet points, and structure",
  "tags": ["relevant", "topic", "tags"],
  "keyPoints": ["key point 1", "key point 2", "key point 3"]
}

Make the content professional, organized, and easy to study from. Fix any grammar issues, organize ideas logically, and add structure where needed.`;

    const response = await openai!.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      title: result.title || "Voice Notes",
      content: result.content || transcription,
      tags: Array.isArray(result.tags) ? result.tags : [],
      keyPoints: Array.isArray(result.keyPoints) ? result.keyPoints : []
    };
  } catch (error) {
    console.error("Failed to process transcription:", error);
    throw new Error("Failed to process transcription with AI");
  }
}

// Generate study materials from notes
export async function generateStudyMaterials(noteContent: string): Promise<{
  summary: string;
  flashcards: Array<{ question: string; answer: string }>;
  quiz: Array<{ 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }>;
}> {
  if (!openai) {
    throw new Error("OpenAI not initialized - API key not available");
  }
  
  try {
    const prompt = `Based on the following notes, generate study materials:

Notes: "${noteContent}"

Create comprehensive study materials in JSON format:
{
  "summary": "A concise summary highlighting the main concepts and key takeaways",
  "flashcards": [
    {"question": "Question about key concept", "answer": "Clear, concise answer"},
    ...
  ],
  "quiz": [
    {
      "question": "Multiple choice question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 1,
      "explanation": "Why this answer is correct"
    },
    ...
  ]
}

Generate 4-6 flashcards and 4-5 quiz questions. Make them educational and focused on the key concepts.`;

    const response = await openai!.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      summary: result.summary || "No summary available",
      flashcards: Array.isArray(result.flashcards) ? result.flashcards : [],
      quiz: Array.isArray(result.quiz) ? result.quiz : []
    };
  } catch (error) {
    console.error("Failed to generate study materials:", error);
    throw new Error("Failed to generate study materials");
  }
}