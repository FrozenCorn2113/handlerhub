import React, { useState } from 'react'

import { Icons, SAMPLE_HANDLERS } from '../constants'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY })

const AIMatchmaker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setResponse(null)

    try {
      const prompt = `
        You are an expert dog show consultant for HandlerHub. 
        The user is looking for a handler with this request: "${query}".
        
        Here is our current roster of top handlers:
        ${JSON.stringify(SAMPLE_HANDLERS, null, 2)}
        
        Based on the user's query, recommend the best match from the roster. 
        Explain why they are a good fit based on their specialties, location, or experience.
        If no one is a perfect match, suggest the closest one and explain why.
        Keep the tone professional, encouraging, and concise (under 100 words).
        Return the response in Markdown.
      `

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
      })

      setResponse(
        result.text ||
          "I couldn't find a specific recommendation. Please try broadening your search criteria."
      )
    } catch (error) {
      console.error('AI Error:', error)
      setResponse(
        'Our AI scout is currently at a show. Please try again in a moment.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="flex w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl duration-300 animate-in slide-in-from-bottom-4 md:w-96 dark:border-slate-800 dark:bg-slate-900">
          <header className="flex items-center justify-between bg-primary p-4 text-white">
            <div className="flex items-center gap-2">
              <Icons.ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold">AI Matchmaker</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-white/20"
            >
              <Icons.ChevronRight className="h-5 w-5 rotate-90" />
            </button>
          </header>

          <div className="custom-scrollbar flex max-h-[400px] flex-1 flex-col gap-4 overflow-y-auto p-4">
            {!response && !isLoading && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tell me what you're looking for (e.g., "I need a Golden
                Retriever expert in the Northeast for a winter show").
              </p>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs font-medium italic text-slate-400">
                  Scanning our elite roster...
                </span>
              </div>
            )}

            {response && (
              <div className="prose prose-sm text-sm leading-relaxed text-slate-700 dark:prose-invert dark:text-slate-300">
                {response}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask our AI..."
                className="flex-1 rounded-lg border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="rounded-lg bg-primary p-2 text-white hover:brightness-110 disabled:opacity-50"
              >
                <Icons.Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative rounded-full bg-primary p-4 text-white shadow-xl transition-transform hover:scale-105"
        >
          <div className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
          </div>
          <Icons.MessageCircle className="h-6 w-6" />
          <span className="pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
            Find the perfect match with AI
          </span>
        </button>
      )}
    </div>
  )
}

export default AIMatchmaker
