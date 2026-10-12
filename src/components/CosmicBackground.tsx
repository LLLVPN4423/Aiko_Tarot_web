export function CosmicBackground() {
  return (
    <div className="cosmic-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cosmic-gradient absolute inset-0" />
      <div className="stars stars-sm absolute inset-0" />
      <div className="stars stars-md absolute inset-0" />
      <div className="stars stars-lg absolute inset-0" />
      <div className="cosmic-dust absolute inset-0" />
    </div>
  );
}
