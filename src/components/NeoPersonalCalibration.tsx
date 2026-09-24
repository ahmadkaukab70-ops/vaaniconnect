import { useMemo, useState } from 'react';
import type { CalibrationLabel, CalibrationProfile } from '../types/personalCalibration';
import { CALIBRATION_LABEL_NAMES, CALIBRATION_LABELS } from '../types/personalCalibration';
import {
  addSample,
  clearProfile,
  loadProfile,
  removeLabel,
  sampleCounts,
  saveProfile,
} from '../services/personalCalibration';

interface NeoPersonalCalibrationProps {
  captureSequence: () => Promise<number[][] | null>;
}

export function NeoPersonalCalibration({
  captureSequence,
}: NeoPersonalCalibrationProps) {
  const [profile, setProfile] = useState<CalibrationProfile>(() => loadProfile());
  const [selected, setSelected] = useState<CalibrationLabel>('hello');
  const [capturing, setCapturing] = useState(false);
  const [status, setStatus] = useState('Record 8 clean examples for each supported sign.');

  const counts = useMemo(() => sampleCounts(profile), [profile]);
  const ready = CALIBRATION_LABELS.filter((label) => counts[label] >= 8).length;

  async function capture() {
    if (capturing) return;
    setCapturing(true);
    setStatus(`Capturing ${CALIBRATION_LABEL_NAMES[selected]}…`);

    try {
      const frames = await captureSequence();
      if (!frames) {
        setStatus('No clean 32-frame sample. Keep your hand fully visible and try again.');
        return;
      }

      const next = addSample(profile, selected, frames);
      setProfile(next);
      saveProfile(next);
      setStatus(`${CALIBRATION_LABEL_NAMES[selected]} sample saved.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Capture failed.');
    } finally {
      setCapturing(false);
    }
  }

  function clearCurrent() {
    const next = removeLabel(profile, selected);
    setProfile(next);
    saveProfile(next);
    setStatus(`${CALIBRATION_LABEL_NAMES[selected]} calibration cleared.`);
  }

  function reset() {
    clearProfile();
    setProfile(loadProfile());
    setStatus('Personal calibration reset.');
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vaaniconnect-personal-calibration.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="neo-personal" aria-labelledby="neo-personal-title">
      <div className="neo-personal__hero">
        <div>
          <span className="neo-personal__eyebrow">PERSONAL ADAPTATION</span>
          <h2 id="neo-personal-title">Teach Vaani your signing style</h2>
          <p>Record your own versions of the six supported signs. Everything stays on this device.</p>
        </div>

        <div className="neo-personal__progress" aria-label={`${ready} of 6 ready`}>
          <strong>{ready}/6</strong>
          <span>ready</span>
        </div>
      </div>

      <div className="neo-personal__classes">
        {CALIBRATION_LABELS.map((label) => (
          <button
            key={label}
            type="button"
            className={label === selected
              ? 'neo-personal__class neo-personal__class--active'
              : 'neo-personal__class'}
            onClick={() => setSelected(label)}
          >
            <span>{CALIBRATION_LABEL_NAMES[label]}</span>
            <strong>{counts[label]}/8</strong>
          </button>
        ))}
      </div>

      <div className="neo-personal__meter" aria-hidden="true">
        <div style={{ width: `${Math.min(100, (counts[selected] / 8) * 100)}%` }} />
      </div>

      <div className="neo-personal__actions">
        <button type="button" onClick={capture} disabled={capturing}>
          {capturing ? 'Capturing…' : `Record ${CALIBRATION_LABEL_NAMES[selected]}`}
        </button>
        <button type="button" className="neo-personal__secondary" onClick={clearCurrent}
          disabled={capturing || counts[selected] === 0}>
          Clear sign
        </button>
        <button type="button" className="neo-personal__secondary" onClick={exportJson}
          disabled={profile.samples.length === 0}>
          Export
        </button>
        <button type="button" className="neo-personal__danger" onClick={reset}
          disabled={capturing || profile.samples.length === 0}>
          Reset
        </button>
      </div>

      <p className="neo-personal__status" role="status">{status}</p>

      <div className="neo-personal__tip">
        <span>TIP</span>
        <p>Use the same camera position, keep the whole hand visible, and sign naturally.</p>
      </div>
    </section>
  );
}
