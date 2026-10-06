import { NextResponse } from 'next/server';
import { DirectMessage } from '@/types';

// Global in-memory direct message store across server requests
declare global {
  // eslint-disable-next-line no-var
  var __NIRAPOD_DIRECT_MESSAGES__: DirectMessage[] | undefined;
}

if (!globalThis.__NIRAPOD_DIRECT_MESSAGES__) {
  globalThis.__NIRAPOD_DIRECT_MESSAGES__ = [];
}

export async function GET() {
  const messages = globalThis.__NIRAPOD_DIRECT_MESSAGES__ || [];
  return NextResponse.json({
    success: true,
    messages,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.content || !body.recipientId) {
      return NextResponse.json({ error: 'Missing required direct message parameters' }, { status: 400 });
    }

    const newDm: DirectMessage = {
      id: body.id || `dm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      conversationId: body.conversationId,
      senderId: body.senderId,
      senderName: body.senderName,
      senderAvatar: body.senderAvatar,
      recipientId: body.recipientId,
      recipientName: body.recipientName,
      content: body.content,
      timestamp: body.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttachment: body.fileAttachment,
    };

    if (!globalThis.__NIRAPOD_DIRECT_MESSAGES__) {
      globalThis.__NIRAPOD_DIRECT_MESSAGES__ = [];
    }

    if (!globalThis.__NIRAPOD_DIRECT_MESSAGES__.some((m) => m.id === newDm.id)) {
      globalThis.__NIRAPOD_DIRECT_MESSAGES__.push(newDm);
    }

    if (globalThis.__NIRAPOD_DIRECT_MESSAGES__.length > 500) {
      globalThis.__NIRAPOD_DIRECT_MESSAGES__ = globalThis.__NIRAPOD_DIRECT_MESSAGES__.slice(-500);
    }

    return NextResponse.json({ success: true, message: newDm });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process direct message' }, { status: 500 });
  }
}
