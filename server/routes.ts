import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNoteSchema } from "@shared/schema";
import { processTranscriptionToNotes, generateStudyMaterials } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Notes CRUD routes
  app.get("/api/notes", async (req, res) => {
    try {
      const notes = await storage.getNotes();
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.get("/api/notes/:id", async (req, res) => {
    try {
      const note = await storage.getNote(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error) {
      console.error("Error fetching note:", error);
      res.status(500).json({ error: "Failed to fetch note" });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const validatedData = insertNoteSchema.parse(req.body);
      const note = await storage.createNote(validatedData);
      res.status(201).json(note);
    } catch (error: any) {
      console.error("Error creating note:", error);
      if (error?.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid note data" });
      }
      res.status(500).json({ error: "Failed to create note" });
    }
  });

  app.put("/api/notes/:id", async (req, res) => {
    try {
      const validatedData = insertNoteSchema.partial().parse(req.body);
      const note = await storage.updateNote(req.params.id, validatedData);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error: any) {
      console.error("Error updating note:", error);
      if (error?.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid note data" });
      }
      res.status(500).json({ error: "Failed to update note" });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteNote(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  app.get("/api/notes/search/:query", async (req, res) => {
    try {
      const notes = await storage.searchNotes(req.params.query);
      res.json(notes);
    } catch (error) {
      console.error("Error searching notes:", error);
      res.status(500).json({ error: "Failed to search notes" });
    }
  });

  // Voice transcription processing
  app.post("/api/voice/process", async (req, res) => {
    try {
      const { transcription } = req.body;
      if (!transcription || typeof transcription !== 'string') {
        return res.status(400).json({ error: "Transcription text is required" });
      }

      // Process transcription with AI if API key is available
      if (process.env.OPENAI_API_KEY) {
        try {
          const processedNote = await processTranscriptionToNotes(transcription);
          const note = await storage.createNote({
            title: processedNote.title,
            content: processedNote.content,
            tags: processedNote.tags,
            isVoiceGenerated: true,
            originalTranscript: transcription,
          });
          res.status(201).json({ note, keyPoints: processedNote.keyPoints });
        } catch (aiError) {
          console.error("AI processing failed, falling back to raw transcription:", aiError);
          // Fallback to raw transcription
          const note = await storage.createNote({
            title: "Voice Notes",
            content: transcription,
            tags: ["voice"],
            isVoiceGenerated: true,
            originalTranscript: transcription,
          });
          res.status(201).json({ note, keyPoints: [] });
        }
      } else {
        // No AI processing, just save raw transcription
        const note = await storage.createNote({
          title: "Voice Notes",
          content: transcription,
          tags: ["voice"],
          isVoiceGenerated: true,
          originalTranscript: transcription,
        });
        res.status(201).json({ note, keyPoints: [] });
      }
    } catch (error) {
      console.error("Error processing voice transcription:", error);
      res.status(500).json({ error: "Failed to process voice transcription" });
    }
  });

  // Generate study materials
  app.post("/api/study/generate", async (req, res) => {
    try {
      const { noteContent } = req.body;
      if (!noteContent || typeof noteContent !== 'string') {
        return res.status(400).json({ error: "Note content is required" });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ error: "AI features not available - API key not configured" });
      }

      const materials = await generateStudyMaterials(noteContent);
      res.json(materials);
    } catch (error) {
      console.error("Error generating study materials:", error);
      res.status(500).json({ error: "Failed to generate study materials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
