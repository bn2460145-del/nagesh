import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertOctagon, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  ExternalLink,
  Info,
  Stethoscope,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { checkEmergencyPreLLM, generateSafeAssistantResponse, sanitizeAIResponse } from '../../services/safetyEngine';
import { DisclaimerNotice } from '../common/DisclaimerNotice';

interface CompanionChatProps {
  initialPrompt?: string;
  onNavigateToFindCare: () => void;
  onEmergencyClick: () => void;
}

export const CompanionChat: React.FC<CompanionChatProps> = ({
  initialPrompt,
  onNavigateToFindCare,
  onEmergencyClick
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hi! I'm your **CareSaathi AI Companion**. I can help explain medical terms, laboratory values, and health reports in simple language so you are prepared for your doctor consultations.\n\n*Important Safety Guardrail:* I cannot diagnose conditions, prescribe medicines, or change your dosages.`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'What does HbA1c mean?',
        'Explain my latest report',
        'Help me understand my prescription',
        'What questions should I ask my doctor?'
      ]
    }
  ]);

  const [input, setInput] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // 1. Append User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. CRITICAL PRE-LLM DETERMINISTIC EMERGENCY CHECK
    const emergencyCheck = checkEmergencyPreLLM(query);

    if (emergencyCheck.isEmergency && emergencyCheck.emergencyDetails) {
      // Bypasses LLM completely!
      setTimeout(() => {
        setIsTyping(false);
        const emergencyMsg: ChatMessage = {
          id: `emg-${Date.now()}`,
          sender: 'system',
          text: '',
          timestamp: 'Just now',
          isEmergencyAlert: true,
          emergencyDetails: emergencyCheck.emergencyDetails
        };
        setMessages(prev => [...prev, emergencyMsg]);
      }, 400);
      return;
    }

    // 3. NON-EMERGENCY: GENERATE SAFE AI RESPONSE
    setTimeout(() => {
      const rawAiResponse = generateSafeAssistantResponse(query);
      const safeText = sanitizeAIResponse(rawAiResponse.text || '');

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: safeText,
        timestamp: 'Just now',
        citations: rawAiResponse.citations,
        suggestedFollowUps: rawAiResponse.suggestedFollowUps,
        sourceGrounded: true
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: `Hi! I'm your **CareSaathi AI Companion**. I can help explain medical terms, laboratory values, and health reports in simple language so you are prepared for your doctor consultations.\n\n*Important Safety Guardrail:* I cannot diagnose conditions, prescribe medicines, or change your dosages.`,
        timestamp: 'Just now',
        suggestedFollowUps: [
          'What does HbA1c mean?',
          'Explain my latest report',
          'Help me understand my prescription',
          'What questions should I ask my doctor?'
        ]
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      {/* HEADER & PERSISTENT EMERGENCY BUTTON */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-700 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
              CareSaathi AI Companion
            </h1>
            <p className="text-xs text-slate-500">
              Ask questions. Understand your health information. Stay informed.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            title="Reset Conversation"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Persistent Emergency Button */}
          <button
            onClick={onEmergencyClick}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
          >
            <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Emergency Help</span>
          </button>
        </div>
      </div>

      {/* CHAT MESSAGES SCROLL CONTAINER */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {/* If Emergency Interception Alert */}
            {msg.isEmergencyAlert && msg.emergencyDetails ? (
              <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-4 shadow-md animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-rose-900">
                      {msg.emergencyDetails.title}
                    </h3>
                    <p className="text-xs text-rose-700 font-medium">
                      Pre-LLM Safety Bypass Activated • Immediate Clinical Care Advised
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
                  {msg.emergencyDetails.warning}
                </p>

                <div className="bg-white/80 p-3 rounded-xl border border-rose-200 space-y-1.5 text-xs">
                  <span className="font-bold text-rose-900 uppercase text-[11px] block">Immediate Recommendations:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-800">
                    {msg.emergencyDetails.immediateAdvice.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Direct Dials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {msg.emergencyDetails.callNumbers.map((call, idx) => (
                    <a
                      key={idx}
                      href={`tel:${call.number}`}
                      className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-between shadow-xs transition"
                    >
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4" />
                        <span>{call.label}</span>
                      </div>
                      <span className="font-mono text-base font-extrabold">{call.number}</span>
                    </a>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-rose-200 text-xs">
                  <button
                    onClick={onEmergencyClick}
                    className="font-bold text-rose-800 hover:underline flex items-center gap-1"
                  >
                    <span>View Emergency Medical Card & ICE Contacts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onNavigateToFindCare}
                    className="font-bold text-teal-800 hover:underline flex items-center gap-1"
                  >
                    <span>Find Nearest 24x7 ER</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Chat Message */
              <div
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Markdown formatted text rendering */}
                  <div className="space-y-2 whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Grounding Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                      <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                        Medical Knowledge Citations:
                      </span>
                      {msg.citations.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-teal-800 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 flex-shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Follow-Ups */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Suggested Follow-Up Queries:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((fu, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(fu)}
                            className="text-left text-xs bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-lg font-medium transition"
                          >
                            "{fu}"
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 font-medium">Formulating safe explanation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA & ACTION ROW */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex-shrink-0">
        {/* Suggested Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold whitespace-nowrap text-[11px]">Quick Prompts:</span>
          {[
            'What does HbA1c mean?',
            'Explain my latest report',
            'Help me understand my prescription',
            'I have severe chest pain and difficulty breathing'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${
                prompt.includes('chest pain')
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-800'
              }`}
            >
              {prompt.includes('chest pain') ? `🚨 Test Emergency: "${prompt}"` : `"${prompt}"`}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a medical term, test result, or symptom (e.g. What is HbA1c?)..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden transition"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl shadow-sm transition disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Persistent Bottom Safety Bar */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToFindCare}
              className="font-semibold text-teal-700 hover:underline flex items-center gap-1"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Talk to a Doctor</span>
            </button>
            <span>•</span>
            <button
              onClick={onEmergencyClick}
              className="font-semibold text-rose-600 hover:underline flex items-center gap-1"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Emergency Help (112)</span>
            </button>
          </div>
          <span className="hidden sm:inline text-slate-400">
            CareSaathi AI never diagnoses or prescribes medicines.
          </span>
        </div>
      </div>
    </div>
  );
};
