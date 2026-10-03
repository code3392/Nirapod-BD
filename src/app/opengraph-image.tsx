import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nirapod BD — Bangladesh Community Safety & Emergency Reporting Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0A2540 0%, #0F2F57 50%, #1E3A8A 100%)',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: 200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, rgba(2, 132, 199, 0) 70%)',
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
              color: 'white',
              fontSize: '32px',
            }}
          >
            🛡️
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '36px',
                fontWeight: 900,
                letterSpacing: '-0.5px',
              }}
            >
              Nirapod BD
            </span>
            <span
              style={{
                color: '#93C5FD',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              নিরাপদ বাংলাদেশ • Civic Safety & Emergency Network
            </span>
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: 'fit-content',
            }}
          >
            <span style={{ color: '#60A5FA', fontSize: '15px', fontWeight: 700 }}>
              COMMUNITY-POWERED • AI-ASSISTED • DHAKA LIVE MESH
            </span>
          </div>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '52px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            See a Problem. Report It. <br />
            <span style={{ color: '#38BDF8' }}>Help Your Community Solve It.</span>
          </h1>
          <p
            style={{
              color: '#CBD5E1',
              fontSize: '22px',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Real-time civic problem reporting, verified road hazards, lost & found registry, and emergency 999 integration across Bangladesh.
          </p>
        </div>

        {/* Bottom Bar: Trust Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>
              🚨 Bangladesh Emergency 999
            </span>
            <span style={{ color: '#93C5FD', fontSize: '16px', fontWeight: 600 }}>
              🏥 Shastho Batayon 16263
            </span>
            <span style={{ color: '#93C5FD', fontSize: '16px', fontWeight: 600 }}>
              🏛️ Citizen Helpline 333
            </span>
          </div>
          <span
            style={{
              color: '#38BDF8',
              fontSize: '18px',
              fontWeight: 800,
              fontFamily: 'monospace',
            }}
          >
            nirapod-bd.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
