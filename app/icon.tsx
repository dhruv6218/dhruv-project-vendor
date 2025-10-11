// Never use @iconify/react inside this file.
import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div data-editor-id="app/icon.tsx:13:7"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0F172A',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F97316',
        fontSize: 36,
        fontWeight: 600
      }}>
      <span data-editor-id="app/icon.tsx:24:9">R</span>
    </div>,
    {
      ...size
    }
  );
}