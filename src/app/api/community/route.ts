import { NextResponse } from 'next/server';
import { CommunityMessage } from '@/types';

// Global in-memory message store across server requests
declare global {
  // eslint-disable-next-line no-var
  var __NIRAPOD_COMMUNITY_MESSAGES__: CommunityMessage[] | undefined;
}

if (!globalThis.__NIRAPOD_COMMUNITY_MESSAGES__) {
  globalThis.__NIRAPOD_COMMUNITY_MESSAGES__ = [];
}

export async function GET() {
  const messages = globalThis.__NIRAPOD_COMMUNITY_MESSAGES__ || [];
  return NextResponse.json({
    success: true,
    messages,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const newMsg: CommunityMessage = {
      id: body.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      groupId: body.groupId || 'main-community',
      area: body.area || 'Bangladesh',
      senderId: body.senderId || 'usr-guest',
      senderName: body.senderName || 'Community Citizen',
      senderAvatar: body.senderAvatar || 'https://api.dicebear.com/7.x/initials/svg?seed=Citizen&backgroundColor=0A2540&textColor=ffffff',
      senderBadge: body.senderBadge || 'Citizen',
      content: body.content,
      timestamp: body.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttachment: body.fileAttachment,
    };

    if (!globalThis.__NIRAPOD_COMMUNITY_MESSAGES__) {
      globalThis.__NIRAPOD_COMMUNITY_MESSAGES__ = [];
    }

    // Deduplicate by message ID
    if (!globalThis.__NIRAPOD_COMMUNITY_MESSAGES__.some((m) => m.id === newMsg.id)) {
      globalThis.__NIRAPOD_COMMUNITY_MESSAGES__.push(newMsg);
    }

    // Retain recent 500 messages
    if (globalThis.__NIRAPOD_COMMUNITY_MESSAGES__.length > 500) {
      globalThis.__NIRAPOD_COMMUNITY_MESSAGES__ = globalThis.__NIRAPOD_COMMUNITY_MESSAGES__.slice(-500);
    }

    return NextResponse.json({ success: true, message: newMsg });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
