// Never use @iconify/react inside this file.
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div data-editor-id="app/apple-icon.tsx:15:7"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0F172A',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F97316',
        fontSize: 90,
        fontWeight: 600
      }}>
      <span data-editor-id="app/apple-icon.tsx:26:9">R</span>
    </div>,
    {
      ...size
    }
  );
}
